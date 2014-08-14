// plans model

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PlanSchema   = new Schema({
	name: String,
	description: String,
	date: Date,
	carrier: String,
	contractTerm: Number, // yrs
	baseMonthlyFee: Number,
	smartphoneFee: Number,
	minPerMonth: Number, // minutes -1 = unlimited
	dataPerMonth: Number, // in GB -1 = unlimited
	txtPerMonth: Number, // number -1 = unlimited
	speed: String,
	numRequiredDevices: Number
});

module.exports = mongoose.model('Plan', PlanSchema);