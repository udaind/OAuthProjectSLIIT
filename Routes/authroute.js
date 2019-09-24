const { Router } = require('express')
const passport = require('passport')

// init the router for auth the user
let router = Router()

//If the auth done correctly redirect to the page dashboard 
//If the auth not done redirect to the google login page
router.get('/login', function (req, res) {

    if (req.user) res.redirect('/dashboard') 
    else res.redirect('/auth/login/google') 

})

router.get('/login/google', passport.authenticate("google", {
    scope: ['profile', "https://www.googleapis.com/auth/drive.file", "email"]
}))

//after the auth request send callback from google oauth with token
router.get('/google/redirect', passport.authenticate('google'), function (req, res) {

    res.redirect('/dashboard')
})


router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/')
})

module.exports = router