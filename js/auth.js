// App Specific
var identityPoolId = 'eu-central-1:6eaecaa6-58f1-420f-9a97-ac544534c9e6';
var userPoolId = 'eu-central-1_VtyYw2NZF';                             //'us-east-1_fgCWraBkF';
var appClientId = '3mivnikddsbgn7pikmuunv8so8';                        //'57lq262n28o7ddt8i36jcjj7qd';
var region = 'eu-central-1';                                           // Frankfurt region

// Constructed Parameters
var loginId = 'cognito-idp.' + region + '.amazonaws.com/' + userPoolId;
var poolData = {
    UserPoolId: userPoolId,
    ClientId: appClientId
};

// Register new user in AWS Cognito User Pool. New user has to provide following information:
//
//  Name,
//  Email (in valid format),
//  User Name,
//  Password (min. One capital letter, number, 8 chars)
//
function registerUser(user) {    // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var attributeList = [];

    var dataEmail = {
        Name: 'email',
        Value: user.email
    };

    var dataName = {
        Name: 'name',
        Value: user.name
    };

    attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
    attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataName));

    userPool.signUp(user.username, user.password, attributeList, null, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('User' + user.username + 'Created');
        window.location = "./page-confirm-registration.html";
    });

}

// Function calls the Confirmation method sending email to registered user with Confirmation code
// In order to finish user profile, this step must be done.
function confirmUser(username, code) {
    // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var userData = {
        Username: username,
        Pool: userPool
    };

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        alert('User ' + username + '  Confirmed');
    });
    window.location = "./index.html";
}

function loginUser(username, password) {
    // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var authenticationData = {
        Username: username,
        Password: password
    };

    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

    var userData = {
        Username: username,
        Pool: userPool
    };

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    $('#loginButton').parent().find('.error').remove();

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            setCredentials(result.getIdToken().getJwtToken());

            // Write to localStorage token for authenticating the JSON objects
            var token = result.getIdToken().getJwtToken();

            localStorage.setItem('sessionToken', token);
            console.log('Success, token is getting written :' + token);

            if (localStorage.getItem("sessionToken") != null) {
                window.location = "./profile.html";
            } else {
                window.location = "./error.html";
            }


            cognitoUser.getUserAttributes(function (err, result) {
                if (err) {
                    alert(err);
                    return;
                }

                for (i = 0; i < result.length; i++) {
                    console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                }
            });
        },
        onFailure: (err) => {
            console.log(err);
            // $('#loginButton').parent().prepend('<span class="error">' + err.message + '</span>');
            $('#loginButton').parent().append('<span class="alert alert-danger">' + err.message + '</span>');
        }
    });
}


function displayToken() {

    var loadToken = localStorage.getItem('sessionToken');
    console.log("CognitoToken >>> " + loadToken);

    return loadToken;
}

function logoutUser() {
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    console.log('Logged out!');
    if (cognitoUser != null) cognitoUser.signOut();
    localStorage.setItem('sessionToken', null);
    window.location = "./index.html";
}


/* Helper Functions */
function setCredentials(token) {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId,
        Logins: {}
    });
    AWS.config.credentials.params.Logins[loginId] = token;
}

function apiVerify(token) {
    var data = null;
    var async = true;
    var url = "https://y3op33lkfd.execute-api.eu-central-1.amazonaws.com/PROD/in";
    var method = "POST";

    var request = new XMLHttpRequest();

    request.withCredentials = true;
    request.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    var data = JSON.stringify({
        "card1": "spock",
        "card2": "spock",
        "card3": "spock",
        "card4": "spock",
        "card5": "spock"
    });


    request.open(method, url);
    request.setRequestHeader("content-type", "application/json");
    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("sectoken", token);
    request.setRequestHeader("cache-control", "no-cache");
    request.send(data);

}

// Verify cards and JSON them
function checkHand() {
    var myCard = '';

    var obj = '';
    var obj_start = '{ ';
    var obj_end = ' }';

    for (var i = 1; i < 6; i++) {
        // console.log('Getting element ' + i);
        myCard = document.getElementById("myCard" + i).getAttribute("src");
        var filename = myCard.replace(/^(.*)[\\\/]/, '');                           // Regexp hell
        var output = filename.substr(0, filename.lastIndexOf('.')) || filename;     // Strip file ext from hellstring

        if (i === 5) {
            obj += '"card' + i + '" : "' + output + '"';
        } else {
            obj += '"card' + i + '" : "' + output + '", ';
        }
        ;
        // console.log(obj);
    }

    obj = obj_start + obj + obj_end;
    var myObject = JSON.stringify(obj);

    // console.log(obj);
    // console.log(myObject);
    submitCards(myObject);           // Submit to transmitter
}


// Submit cards to AWS API endpoint
function submitCards(obj) {
    var idToken = displayToken();
    var cards = obj;
    // console.log('Received token.. ' + idToken + ' and the Card set : ' + cards);

    var data = null;
    var async = true;
    var url = "https://y3op33lkfd.execute-api.eu-central-1.amazonaws.com/PROD/in";
    var method = "POST";

    var request = new XMLHttpRequest();

    request.withCredentials = false;

    request.open(method, url);
    //request.setRequestHeader("Access-Control-Allow-Origin", "*");
    request.setRequestHeader("content-type", "application/json");
    //request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("sectoken", idToken);

    console.log('DEBUG :: ' + cards);

    request.send(cards);
    // registerUser(user);
    event.preventDefault();
}

function getName() {
    var fullPath = document.getElementById("myCard1").src;
    var index = fullPath.lastIndexOf("/");
    var filename = fullPath;
    if (index !== -1) {
        filename = fullPath.substring(index + 1, fullPath.length);
    }
    document.getElementById("myCard1").value = filename;
}

window.fbAsyncInit = function() {
    FB.init({
        appId   : '927138690721496',
        oauth   : true,
        status  : true, // check login status
        cookie  : true, // enable cookies to allow the server to access the session
        xfbml   : true // parse XFBML
    });
};

function fb_login(){
    FB.login(function(response) {

        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me', function(response) {
                user_email = response.email; //get user email
                // you can store this data into your database
            });

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'publish_stream,email'
    });
}
(function() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
}());