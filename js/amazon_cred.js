
AWS.config.region = 'eu-central-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-central-1:6eaecaa6-58f1-420f-9a97-ac544534c9e6' // your identity pool id here
});

AWSCognito.config.region = 'eu-central-1';
AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-central-1:6eaecaa6-58f1-420f-9a97-ac544534c9e6' // your identity pool id here
});

