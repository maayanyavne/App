/**
 * @author Maayan Yavne
 */
var request = require ('request');
var queryString = require('querystring');
var configAuth = require('./auth.js');




exports.startOAuth = function(req, res) {
	
	//authorization_code
	var authCode = {
		'code': req.param('code'),
 	 	'grant_type': configAuth.cleverAPI.grant_type,
  		'redirect_uri': "https:bell-schedule-app-maayanyavne.herokuapp.com/auth/clever/callback"
	}
	var authCodeBodyString = queryString.stringify(authCode);
	var authCodeLength = authCodeBodyString.length;
	
	//Create Authorization header
	var authHeaderString = new Buffer(configAuth.cleverAuthDev.clientID + ':' + configAuth.cleverAuthDev.clientSecret).toString('base64');
	authHeaderString = 'Basic ' + authHeaderString;
	var headers		   = {
        'Authorization'	:  authHeaderString,
        'content-type' : 'application/x-www-form-urlencoded'
	}
	console.log("Stringify: " + authCodeBodyString);
	console.log("HardCode: " + "code=" + req.param('code') + "&grant_type=authorization_code&redirect_uri=https://bell-schedule-app-maayanyavne.herokuapp.com/auth/clever/callback");
	request.post({
 					 headers: headers,
  					 url:     configAuth.cleverAPI.cleverOAuthToken,
  					 body:    "code=" + req.param('code') + "&grant_type=authorization_code&redirect_uri=https://bell-schedule-app-maayanyavne.herokuapp.com/auth/clever/callback"
}, function(error, response, body){
  console.log(body);
});
	// request.post({headers:headers, uri:configAuth.cleverAPI.cleverOAuthToken, form:authCode}, function(error, response, body)
	// {
			// if(error)
			// {
				// console.log('-----ERROR' + error);
			// }
		 	// console.log("body: %j", body);
       	 	// var acessCode = body.access_token;
       	 	// console.log('---ACESS CODE--' + acessCode);
       	 	// headers.Authorization = 'Bearer' + acessCode;
         	// request(
         			// {
         				// uri:'https://api.clever.com/me', headers:headers
         			// },
         			// function(error, response, body)
       				// {
       					// var info = JSON.parse(body);
       					// var data = info.data;
       					// var id = data.id;
       					// var type = data.type;
       					// console.log ('-------- ID=' + id + 'type =' + type + '---------');
       				// }
       				// );
// 		 
	// });
	

	
}


