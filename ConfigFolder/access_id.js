
//First create the project 
//Using OAuth 2.0 to Access Google APIs enable the API key to access google drive
//Create the clientID and clientSecretId using credentials
const APIKEYS = {
    'googleOauth': {
        'clientID': "1019005868734-h21ksgphpupj1744d968p6iph22qm8ah.apps.googleusercontent.com",
        'clientSecret': "ROESQPgTPNZMta2-DvDs8ZQ7",
        'callback': '/auth/google/redirect'
    },
    "session_key": "secret1234"
}

module.exports = APIKEYS