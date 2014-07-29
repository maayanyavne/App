// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: 'your-secret-clientID-here', // your App ID
		'clientSecret' 	: 'your-client-secret-here', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'your-secret-clientID-here',
		'clientSecret' 	: 'your-client-secret-here',
		'callbackURL' 	: 'http://128.12.160.33:8888/auth/google/callback'
	},
	'cleverAuthDev' : {
		'clientID' 		: '87df15e166dd46d2d22d',
		'clientSecret' 	: '15cf49bf34cc44d090054988f6031342f36116da',
		'callbackURL' 	: encodeURIComponent('https://bell-schedule-app-maayanyavne.herokuapp.com/auth/clever/callback'),
		'district_id'	: '52c5e88553a943970d001718',
		'scope'			: encodeURIComponent('read:user'),
		'response_type'	: 'code',
		'token'			: 'ed35413288c27d424ba726499d197630d80eb753'
	},
	'cleverAuthProd' : {
		'clientID' 		: '94436bc012d738629cec',
		'clientSecret' 	: 'fd33dcb16f3af4c7a30e925bb81d82a3be976db9',
		'callbackURL' 	: encodeURIComponent('https://bell-schedule-app-maayanyavne.herokuapp.com/auth/clever/callback'),
		'district_id'	: '52c5e88553a943970d001718',
		'scope'			: encodeURIComponent('read:user'),
		'response_type'	: 'code',
		'token'			: 'ed35413288c27d424ba726499d197630d80eb753'
	},
	'cleverAPI'		: {
		'cleverOAuthInit'	: 'https://clever.com/oauth/authorize',
		'cleverOAuthToken'	: 'https://clever.com/oauth/token',
		'grant_type'		: 'authorization_code'
		
	}
};