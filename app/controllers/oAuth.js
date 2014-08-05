/**
 * @author Maayan Yavne
 */
var request = require ('request');
var queryString = require('querystring');
var configAuth = require('../../config/auth.js');



exports.startOAuth = function(req, res, onSessionSucess, onSessionFailure) {
	//create body for Post request
	var authCode = {
		'code': req.param('code'),
 	 	'grant_type': configAuth.cleverAPI.grant_type,
  		'redirect_uri': configAuth.cleverAuthDev.callbackURL
	};
	var authCodeBodyString = queryString.stringify(authCode);

	//Send POST request to get Acess Code
	var headers = {
	 				'content-type' : configAuth.cleverAPIHeaders.content_type,
	 				'Authorization': configAuth.cleverAPIHeaders.Authorization
	 };
	request.post({
 					 headers: headers,
  					 url:     configAuth.cleverAPI.cleverOAuthToken,
  					 body:   authCodeBodyString
				}, function(error, response, body)
				{
					if (!error && response.statusCode == 200)
					{
						onSessionSucess(req, res, body);
											
					}else
					{
						console.log('Failed to recieve code' + body);
						onSessionFailure(req,res, body);

					}
  						
				});

	
}


