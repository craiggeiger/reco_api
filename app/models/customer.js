// customer model

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomerSchema   = new Schema({
	mdn: String,
	device: String,
	carrier: String,
	minPerMonth: Number, // minutes
	dataPerMonth: Number, // in GB
	txtPerMonth: Number, // number
	segment: String
});

module.exports = mongoose.model('Customer', CustomerSchema);