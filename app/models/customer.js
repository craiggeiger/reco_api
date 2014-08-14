// customer model

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomerSchema   = new Schema({
	udid: String,
	mdn: String,
	deviceModel: String,
	deviceBrand: String,
	deviceOS: String,
	deviceOSVersion: String,
	WURFLModel: String,
	WURFLMarketingName: String,
	WURFLReleaseDate: String,

	carrier: String,
	minPerMonth: Number, // minutes 30 days
	dataPerMonth: Number, // in MB
	totalDataPerMonth: Number, // in MB
	txtPerMonth: Number, // count 30 days
	lastReboot: Number, // days
	insertDate: Date,

	apps: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Customer', CustomerSchema);