// config/auth.js

const CALLBACK_URL 	= 'http://128.12.160.33/auth/clever/callback'//https://bell-schedule-app-maayanyavne.herokuapp.com/auth/clever/callback'
const CLIENT_ID	   	= '94436bc012d738629cec'
const CLIENT_SECRET	= 'fd33dcb16f3af4c7a30e925bb81d82a3be976db9'
const DISTRICT_OAUTH = 'ed35413288c27d424ba726499d197630d80eb753'

// expose our config directly to our application using module.exports
module.exports = {

	'cleverAuthReq'	: {
		'response_type'	: 'code',
		'redirect_uri'	: CALLBACK_URL,
		'client_id' 	: CLIENT_ID,
		'scope'			: 'read:user', 
		'district_id'	: '52c5e88553a943970d001718'
	},
	
	'cleverAPIHeaders'	: {
		'content_type'  : 'application/x-www-form-urlencoded',
        'Authorization'	:  'Basic ' + new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
   	},
	
	'cleverAuthDev' : {
		'clientID' 		: CLIENT_ID,
		'clientSecret' 	: CLIENT_SECRET,
		'callbackURL' 	: CALLBACK_URL,
		'district_id'	: '52c5e88553a943970d001718',
		'districtOAuth'	: DISTRICT_OAUTH

	},
	
	'cleverAPI'		: {
		'cleverOAuthInit'	: 'https://clever.com/oauth/authorize',
		'cleverOAuthToken'	: 'https://clever.com/oauth/token',
		'cleverAPIPath'		: 'https://api.clever.com',
		'cleverMe'			: '/me',
		'grant_type'		: 'authorization_code'
	},
	'cleverTeacherAPI': {
		'teacherAPIPath': '/v1.1/teachers/',
		'teacherSections': '/sections'
	},
	'cleverStudentAPI': {
		'studentAPIPath': '/v1.1/students/',
		'studentSections': '/sections'
	},

};