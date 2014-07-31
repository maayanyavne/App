/**
 * @author Maayan Yavne
 */
var request = require ('request');
var queryString = require('querystring');
var configAuth = require('../../config/auth.js');
var clever = require('clever');

// load up the user model
var CleverUser       = require('../models/cleverUser.js');



exports.showSchedule = function(req, res, body, onSessionFailure) {
	 
	 // Find access token in response 
	 var access_token = JSON.parse(body).access_token; 

	// Find user with which this session is associated
	CleverUser.findOne({ "sessionData.access_token": access_token}, function(err, cleverUser) {
		// Check to see if session is valid
		if (err) {
             console.log('Invalid session');
             onSessionFailure(req, res);
         }
         
        if (cleverUser) {
        	// Session is valid - use access token to iniiate API calls
        	var headers = configAuth.cleverAPIHeaders;
        	headers.Authorization = 'Bearer ' + cleverUser.sessionData.access_token;
  			
  			// Get inital data about user from Clever
  			var options = {
  							url: configAuth.cleverAPI.cleverAPIPath + configAuth.cleverAPI.cleverMe, 
  							headers: headers
  					}
  			// Get user info
			request( options, function (error, response, body) {
  							if (!error && response.statusCode == 200)
  							{
  								var info = JSON.parse(body);
       							var data = info.data;
       							cleverUser.id =  data.id;
       							cleverUser.type = data.type;
       							cleverUser.district = data.district;
       							cleverUser.save( function (error){
       								if (error)
       									console.log('Could not save user')
       								else {
       									// initial url API
       									var url = configAuth.cleverAPI.cleverAPIPath;

       									// Check to see if teacher or student
       									switch (cleverUser.type){
       										case "student": {
       											  url = url + configAuth.cleverStudentAPI.studentAPIPath + cleverUser.id  + configAuth.cleverStudentAPI.studentSections;
       											  console.log("Student URL: " + url);
       											  break;
       											}
       										case "teacher": {
       											  url = url + configAuth.cleverTeacherAPI.teacherAPIPath + cleverUser.id + configAuth.cleverTeacherAPI.teacherSections;
												  console.log("Student URL: " + url);
       											  break;									
       											}		
       									}
       									// Send request for data
       									
       									options.url = url;
       									headers = configAuth.cleverAPIHeaders;
        								headers.Authorization = 'Bearer ' + configAuth.cleverAPIHeaders.districtOAuth;
       									request( options, function (error, response, body) {
       										if (!error && response.statusCode == 200) {
       											//Array of courses
       											var data = JSON.parse(body).data;
       											for (var prop in data){
       												var course = {
																	'name' :  data[prop].data.name,
 	 																'period' : data[prop].data.period
																	}
       												cleverUser.courses.push(course);
       												cleverUser.save(function(error)
       												{
       													if (error){
       														onSessionFailure(req,res,body);	
       													}
       													else{
       														res.render('schedule.ejs'); 
       													}

       												});
       											}
       										}
       									});
       									
       								}
       							});
       							
  							}
  						});

        	}     
	});
	
	
};

function extractData(cleverUser){
	
}



