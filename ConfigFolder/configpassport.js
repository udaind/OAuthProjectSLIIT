const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const KEYS = require('./access_id')


// based on the user details set cookies
passport.serializeUser((gdriveuser, done) => {

    let User = {
        _id: gdriveuser.googleID,
        accessToken: gdriveuser.accesstoken,
        name: gdriveuser.name,
        pic_url: gdriveuser.pic_url,
        email: gdriveuser.email
    }

    done(null, User)
})

// get cookie and session data to access request.user
passport.deserializeUser((user, done) => {

    done(null, user) 
})

// save google drive user data in session 
passport.use(
   
    new GoogleStrategy(
        // google keys
        {
            clientID: KEYS.googleOauth.clientID,
            clientSecret: KEYS.googleOauth.clientSecret,
            callbackURL: KEYS.googleOauth.callback,
            passReqToCallback: true

        }, (request, accessToken, refreshToken, profile, done) => {

           
            gdriveuser = {
                "accesstoken": accessToken,
                'googleID': profile.id,
                'name': profile.displayName,
                'pic_url': profile._json.picture,
                'email': profile._json.email
            }

            done(null, gdriveuser)
        }
    )
)