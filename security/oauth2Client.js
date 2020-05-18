const { google } = require('googleapis');
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } = require('../environment');

const getOAuthClient = () =>  { return new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL,
)};




module.exports.getOAuthClient = getOAuthClient;