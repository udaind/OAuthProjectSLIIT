const express = require('express')
const Routerhome = require('./Routes/home')
const Routerauth = require('./Routes/authroute')
const passportConfig = require('./ConfigFolder/configpassport')
const passport = require('passport')
const cookieSession = require('cookie-session')
const KEYS = require('./ConfigFolder/access_id')
const nunjucks = require('nunjucks')
const fileUpload = require('express-fileupload')

//app init to listen to the server
let app = express()
const port = 3000 || process.env.PORT
app.listen(port, () => console.log(`server is running : ${port}`))

//init the views in the application
nunjucks.configure('Views', {
    autoescape: true,
    express: app
});

//use static and iamge for add css and images to the application
app.use('/static', express.static('stylesheets'))
app.use('/image', express.static('Images'))

//init the sessions in the application
app.use(cookieSession({
    keys: [KEYS.session_key]
}))

//init the passport in the application
app.use(passport.initialize())
app.use(passport.session())

//upload the file
app.use(fileUpload());

//init the routing in the application
app.use('', Routerhome)
app.use('/auth', Routerauth) 