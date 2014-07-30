/**
 * @author Maayan Yavne
 */
var request = require ('request');
var queryString = require('querystring');
var configAuth = require('./auth.js');




exports.startOAuth = function(req, res) {
	
	//Extract authorization code and create body for Post request
	var authCode = {
		'code': req.param('code'),
 	 	'grant_type': configAuth.cleverAPI.grant_type,
  		'redirect_uri': configAuth.cleverAuthDev.callbackURL
	}
	var authCodeBodyString = queryString.stringify(authCode);

	//Send POST request to get Acess Code
	var headers = configAuth.cleverAPIHeaders;
	console.log(headers);
	request.post({
 					 headers: headers,
  					 url:     configAuth.cleverAPI.cleverOAuthToken,
  					 body:   authCodeBodyString
				}, function(error, response, body){
					if (!error && response.statusCode == 200)
					{
						// Parse body and extract acess Code
  						var info = JSON.parse(body);
  						var acessCode = info.access_token;
  						headers.Authorization = 'Bearer ' + acessCode;
  						console.log(headers);
  						var options = {
  							url: configAuth.cleverAPI.cleverMe, 
  							headers: headers
  						}
  						request( options, function (error, response, body) {
  							if (!error && response.statusCode == 200)
  							{
  								var info = JSON.parse(body);
       							var data = info.data;
       							var id = data.id;
       							var type = data.type;
       							console.log ('-------- ID=' + id + 'type =' + type + '---------');
  							}
  						});
					}
  						
				});

	
}


