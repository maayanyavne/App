/**
 * @author Maayan Yavne
 */
var request = require ('request');
var queryString = require('querystring');
var configAuth = require('../../config/auth.js');

// load up the user model
var CleverUser       = require('../models/cleverUser.js');



exports.showSchedule = function(req, res, body, onSessionFailure, onScheduleSuccess) {
	 
	 // Find access token in response 
	 var access_token = JSON.parse(body).access_token;
	 
	 //Create clever user instance
	 var cleverUser = new CleverUser(); 
	 
	 // Configure url/headers for User Request and send it
	 var options = {
	 	'url' : "",
	 	'headers': ""
	 };
	 options = configureUserRequest(options, access_token);
  	 request( options, function (error, response, body) {
  	 	if (!error && response.statusCode == 200) {
  	 		// Update data model with user data
			updateCleverUser(body, cleverUser, "userData");
			cleverUser.save( function (error) {
				if (error)
					console.log('Could not save user');
       			else {
       				
       				// Configure url/headers for Sections Request and send it
       				options = configureSectionRequest(options, cleverUser);
       				request( options, function (error, response, body) {
       					if (!error && response.statusCode == 200) {
       						// update the data model with course data
       						updateCleverUser(body, cleverUser, "courseData");
       						cleverUser.save(function(error) {
       							if (error) {
       								// Failed to log in
       								console.log('Was not able to save user' + JSON.parse(body));
       								onSessionFailure(req, res, body);	
       							}
       							else {
       									res.render('schedule.ejs',{courses : cleverUser.courses, id : cleverUser.id});
       								 }
       						});	
       					}
       				});
       				}
       				});
       		}
       	});
};

// Configure me request to get user id
function configureUserRequest(options, access_token) {
	var userUrl = configAuth.cleverAPI.cleverAPIPath + configAuth.cleverAPI.cleverMe;
	options.url = userUrl;
      
    // Reconfigure header with district oAuth key
    var userHeaders = {
	 				'content-type' : configAuth.cleverAPIHeaders.content_type,
	 				'Authorization': 'Bearer ' + access_token
	 };
   
    options.headers = userHeaders;

    return options;
}

// Configure section request data
function configureSectionRequest(options, cleverUser){
	var sectionUrl = configAuth.cleverAPI.cleverAPIPath;
	
	// Check to see if teacher or student
	switch (cleverUser.type){
    case "student": {
    		sectionUrl = sectionUrl + configAuth.cleverStudentAPI.studentAPIPath + cleverUser.id  + configAuth.cleverStudentAPI.studentSections;
    		break;
   			}
     case "teacher": {
     		sectionUrl = sectionUrl + configAuth.cleverTeacherAPI.teacherAPIPath + cleverUser.id + configAuth.cleverTeacherAPI.teacherSections;
       		break;									
       		}		
      }
      options.url = sectionUrl;
      
      // Reconfigure header with district oAuth key
      var sectionHeaders = {
	 				'content-type' : configAuth.cleverAPIHeaders.content_type,
	 				'Authorization': 'Bearer ' + configAuth.cleverAuthDev.districtOAuth
	 };
     
      options.headers = sectionHeaders;
      return options;
}


// Sorts the courses by period
function sortCourses(cleverUser){
	//Sort by periods
	cleverUser.courses.sort(function(course1, course2){
	period1Num = parseInt(course1.period,10);
	period2Num = parseInt(course2.period,10);
	return period1Num - period2Num;
	});
	
}

// Updates the model with course data (course_name, id)
function updateCleverUser(body, cleverUser, data){
	var bodyData = JSON.parse(body).data;
	switch (data){
		case "userData": {
       		cleverUser.id =  bodyData.id;
       		cleverUser.type = bodyData.type;
       		cleverUser.district = bodyData.district;
       		break;
		}
		case "courseData":{
			//Array of courses
    		var courseArray = [];
   			 for (var prop in bodyData){
      			var course = {
					'name' :  bodyData[prop].data.name,
 	 				'period' : bodyData[prop].data.period
			 	}
       		courseArray.push(course);
      		  }
    		//update the user
   			cleverUser.courses = courseArray;
    		sortCourses(cleverUser);
    		break;		
		}

	}
	
	
}



