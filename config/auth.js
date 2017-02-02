/**
 * Provide clientID and clientSecret from Project Console
 * Modify callbackURL according to <domain>:<port>
 * ---
 * Facebook : https://developers.facebook.com
 * Google   : https://console.developers.google.com/apis
 */

module.exports = {
    facebookAuth: {
        clientID: '927138690721496',
        clientSecret: '78283188f13dbab07841b52bb5014ea2',
        callbackURL: 'http://localhost:3030/auth/facebook/callback',
    },
    googleAuth: {
        clientID: '456985365997-vrb9vc9v7c79pfhrvkotbdpp7kfd2b2f.apps.googleusercontent.com',
        clientSecret: 'IELoTk9yBWp6_E1K3OrCWxBz',
        callbackURL: 'http://localhost:3030/auth/google/callback',
    },
};