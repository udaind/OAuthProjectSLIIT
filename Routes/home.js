const { Router } = require('express')
const passport = require('passport')
const { google } = require('googleapis')
const KEYS = require('../ConfigFolder/access_id')
const router = Router()

router.get('/', function (request, response) {
    response.render('home.html', { 'title': 'Home page' })
})

router.get('/dashboard', function (request, response) {

    // if the user has't valid account 
    if (typeof request.user == "undefined") response.redirect('/auth/login/google')

    //if the user has valid account get the user details to the variable called Data
    else {

        let Data = {
            title: 'Upload file',
            googleid: request.user._id,
            name: request.user.name,
            avatar: request.user.pic_url,
            email: request.user.email
        }

        // if redirect with google drive response successfully
        if (request.query.file !== undefined) {

            // successfully upload the file
            if (request.query.file == "upload") Data.file = "uploaded"
            else if (request.query.file == "notupload") Data.file = "notuploaded"
        }

        response.render('dashboard.html', Data)
    }
})

router.post('/upload', function (request, response) {

    // if the user is not auth 
    if (!request.user) response.redirect('/auth/login/google')

    //if the user is auth config the google drive with a recevied client token
    else {
        const oauth2Client = new google.auth.OAuth2()
        oauth2Client.setCredentials({
            'access_token': request.user.accessToken
        });

        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client
        });

        
        //if the token is received upload the file or image to the google  drive
        let { name: filename, mimetype, data } = request.files.file_upload

        const googledriveResponse = drive.files.create({
            requestBody: {
                name: filename,
                mimeType: mimetype
            },
            media: {
                mimeType: mimetype,
                body: Buffer.from(data).toString()
            }
        });

        googledriveResponse.then(data => {

            //if successfully uploaded
            if (data.status == 200) response.redirect('/dashboard?file=upload') 

            //if not successfully uplaoed
            else response.redirect('/dashboard?file=notupload')

        }).catch(err => { throw new Error(err) })
    }
})



module.exports = router
