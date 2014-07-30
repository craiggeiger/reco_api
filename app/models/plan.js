// plans model

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PlanSchema   = new Schema({
	name: String,
	description: String,
	carrier: String,
	price: String,
	minPerMonth: Number, // minutes
	dataPerMonth: Number, // in GB
	txtPerMonth: Number // number
});

module.exports = mongoose.model('Plan', PlanSchema);