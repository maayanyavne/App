/**
 * @author Maayan Yavne
 */
var request = require ('request');
var queryString = require('querystring');
var configAuth = require('./auth.js');



exports.startOAuth = function(req, res) {
	
	//authorization_code
	var authCode = {
		"code": req.param('code'),
 	 	"grant_type": configAuth.cleverAPI.grant_type,
  		"redirect_uri": configAuth.cleverAuthDev.callbackURL
	}
	var authCodeBodyString = queryString.stringify(authCode);
	var authCodeLength = authCodeBodyString.length;
	
	//Create Authorization header
	var authHeaderString = new Buffer(configAuth.cleverAuthDev.clientID + ':' + configAuth.cleverAuthDev.clientSecret).toString('base64');
	console.log(authHeaderString);
	authHeaderString = 'Basic ' + authHeaderString;
	var headers		   = {
		'Content-Length': authCodeLength,
        'Content-Type'	: 'application/x-www-form-urlencoded',
        'Authorization'	:  authHeaderString
	}
	console.log('URI:' + configAuth.cleverAPI.cleverOAuthToken);
	console.log('Headers: ' + queryString.stringify(headers));
	console.log('Body:' + authCodeBodyString);


	request.post({headers:headers, uri:configAuth.cleverAPI.cleverOAuthToken, body:authCodeBodyString}, function(error, response, body){
		console.log(body);
		});
	

	
};


