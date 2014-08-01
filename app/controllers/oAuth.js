/**
 * @author Maayan Yavne
 */
var request = require ('request');
var queryString = require('querystring');
var configAuth = require('../../config/auth.js');

// load up the user model
var CleverUser       = require('../models/cleverUser.js');


exports.startOAuth = function(req, res, onSessionSucess, onSessionFailure) {
	
	 var newCleverUser            = new CleverUser();
	
	//Extract authorization code and save in db
	newCleverUser.sessionData.authorization_code = req.param('code');
		
	//create body for Post request
	var authCode = {
		'code': newCleverUser.sessionData.authorization_code,
 	 	'grant_type': configAuth.cleverAPI.grant_type,
  		'redirect_uri': configAuth.cleverAuthDev.callbackURL
	}
	var authCodeBodyString = queryString.stringify(authCode);

	//Send POST request to get Acess Code
	var headers = configAuth.cleverAPIHeaders;
	request.post({
 					 headers: headers,
  					 url:     configAuth.cleverAPI.cleverOAuthToken,
  					 body:   authCodeBodyString
				}, function(error, response, body)
				{
					if (!error && response.statusCode == 200)
					{
						// Parse body and extract acess Code
  						var info = JSON.parse(body);
  						var access_token = info.access_token; 
  						console.log("Access Token" + access_token);
  						newCleverUser.sessionData.access_token = access_token;
  						newCleverUser.save(function(error)
  						{
  							if (error)
  								console.log('Error on Saving Session');
  							console.log('User Saved');	
  							onSessionSucess(req, res, body);
  						});						
					}else
					{
						onSessionFailure(req,res, body);

					}
  						
				});

	
}


