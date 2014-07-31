/**
 * @author Maayan Yavne
 */

var mongoose = require('mongoose');

// define the schema for our session model
var sessionSchema = mongoose.Schema({
	session_id		   : String,
	authorization_code : String,
	access_token		   : String				
});

// create the model for users and expose it to our app
module.exports = mongoose.model('session', sessionSchema);
