var configAuth = require('../../config/auth.js');
var oAuth 	   = require('./oAuth.js');
var schedule   = require('./schedule.js');
var queryString = require('querystring');

var CleverUser       = require('../models/cleverUser.js');

var onSessionSucess = function(req, res, body)
{
	//Authentication was done sucessfully - show main view
	schedule.showSchedule(req, res, body, onSessionFailure, onScheduleSuccess);
	
}

var onSessionFailure = function(req,res, body)
{
	//Authentication was done sucessfully - show main view
	res.render('fail.ejs');
}

var onScheduleSuccess = function(req,res)
{
	//Authentication was done sucessfully - show schedule view
	console.log('Schedule View');
	res.render('schedule.ejs');
}

module.exports = function(app) {

// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('login.ejs', {
			oAuthLink : configureLink()
		});
		
	});

	// Logout =========================
	app.get('/logout', function(req, res) {
		
		//Get id of current user and remove from db
		var id = req.param('id');
		CleverUser.findOne({ "id": id}, function(err, cleverUser){
			cleverUser.remove();
		});
		
			res.redirect('/');
	});


// Clever Callback =========================

		//the callback after clever has authenticated the user
	app.get('/auth/clever/callback', function(req, res){
			oAuth.startOAuth(req,res, onSessionSucess, onSessionFailure);
		});
	}




//Configure callback link for login
function configureLink() {
	authParams = queryString.stringify(configAuth.cleverAuthReq);
	var link = "\"" + configAuth.cleverAPI.cleverOAuthInit + "?" + authParams + "\" ";	
	return link;
}
