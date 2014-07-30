// phones model

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PhoneSchema   = new Schema({
	manufacturer: String,
	model: String,
	carrier: String,
	price: String,
	memory: String
});

module.exports = mongoose.model('Phone', PhoneSchema);