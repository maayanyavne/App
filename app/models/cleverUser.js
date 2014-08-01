/**
 * @author Maayan Yavne
 */

var mongoose = require('mongoose');

// define the schema for our session model
var cleverUserSchema = mongoose.Schema({
	id			: String,
	district	: String,
	type		: String,
	courses	: [{
		name	: String,
		period	: String		
	}]				
});

// create the model for users and expose it to our app
module.exports = mongoose.model('cleverUser', cleverUserSchema);
