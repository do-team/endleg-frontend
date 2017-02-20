var identityPoolId = 'eu-central-1:6eaecaa6-58f1-420f-9a97-ac544534c9e6';
var userPoolId  = 'eu-central-1_VtyYw2NZF';                                          //'us-east-1_fgCWraBkF';
var appClientId = '3mivnikddsbgn7pikmuunv8so8';                                     //'57lq262n28o7ddt8i36jcjj7qd';
var region      = 'eu-central-1';

var loginId = 'cognito-idp.' + region + '.amazonaws.com/' + userPoolId;
var poolData = {
    UserPoolId: userPoolId,
    ClientId: appClientId
};


function checkHand(token) {
    var myCard = '';

    var obj = '';
    var obj_start = '{ ';
    var obj_end = ' }';

    for(var i = 1; i < 6; i++) {
        console.log('Getting element ' + i);
        myCard = document.getElementById("myCard" + i).getAttribute("src");
        var filename = myCard.replace(/^(.*)[\\\/]/, '');                           // Regexp hell
        var output = filename.substr(0, filename.lastIndexOf('.')) || filename;     // Strip file ext from hellstring

        if (i === 5) {
            obj += '"card'+ i +'" : "' + output + '"';
        } else {
            obj += '"card'+ i +'" : "' + output + '", ';
        };
        console.log(obj);
    }

    myObject = JSON.stringify(obj);
    obj = obj_start + obj + obj_end;
    console.log(obj);
    console.log(myObject);
    submitCards(obj);           // Submit to transmitter
};


function getName() {
    var fullPath = document.getElementById("myCard1").src;
    var index = fullPath.lastIndexOf("/");
    var filename = fullPath;
    if(index !== -1) {
        filename = fullPath.substring(index+1,fullPath.length);
    }
    document.getElementById("myCard1").value = filename;
}
