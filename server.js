// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/recommender'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

var port = process.env.PORT || 8080; 		// set our port

// Models
var Phone     = require('./app/models/phone');
var Customer  = require('./app/models/customer');
var Plan  = require('./app/models/plan');

// WURFL Cloud API Info
var WURFL_API_KEY = "244574:rOSzDk3yEwn6lV9KN5x74Q0CvcdpjGZ1";
var wurfl_cloud_client = require("./NodeWurflCloudClient/WurflCloudClient");
var config = require("./NodeWurflCloudClient/Config");







// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Request');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'welcome to our api!' });	
});



/*
=============================================================

Route: PHONES

=============================================================
*/



router.route('/phones')

	// create a phone (accessed at POST http://localhost:8080/api/phones)
	.post(function(req, res) {
		
		var phone = new Phone(); 		// create a new instance of the Phone model
		phone.manufacturer = req.body.manufacturer;
		phone.model = req.body.model;
		phone.carrier = req.body.carrier;
		phone.price = req.body.price;
		phone.memory = req.body.memory;

		// save the phone and check for errors
		phone.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Phone created!' });
		});
		
	})

	// get all the phones (accessed at GET http://localhost:8080/api/phones)
	.get(function(req, res) {
		Phone.find(function(err, phones) {
			if (err)
				res.send(err);

			res.json(phones);
		});
	});



/*
=============================================================

Route: CUSTOMERS

=============================================================
*/


router.route('/customers')

	// create a customer (accessed at POST http://localhost:8080/api/customers)
	.post(function(req, res) {
		
		var customer = new Customer(); 		// create a new instance of the Customer model
		customer.mdn = req.body.mdn;
		customer.device = req.body.device;
		customer.carrier = req.body.carrier;
		customer.minPerMonth = req.body.minPerMonth;
		customer.dataPerMonth = req.body.dataPerMonth; // GB
		customer.txtPerMonth = req.body.txtPerMonth;
		customer.segment = req.body.segment;

		// save the phone and check for errors
		customer.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Customer created!' });
		});
		
	})

	// get all the customers (accessed at GET http://localhost:8080/api/customers)
	.get(function(req, res) {
		Customer.find(function(err, customers) {
			if (err)
				res.send(err);

			res.json(customers);
		});
	});


// on routes that end in /customers/:MDN
// ----------------------------------------------------
router.route('/customers/:mdn')

	// get the bear with that id (accessed at GET http://localhost:8080/api/cutomers/:mdn)
	.get(function(req, res) {
		Customer.findOne({"mdn":req.params.mdn}, function(err, customer) {
			if (err)
				res.send(err);
			res.json(customer);
		});
	});





/*
=============================================================

Route: PLANS

=============================================================
*/




router.route('/plans')

	// create a plan (accessed at POST http://localhost:8080/api/plans)
	.post(function(req, res) {
		
		var plan = new Plan(); 		// create a new instance of the Plan model
		plan.name = req.body.name;
		plan.description = req.body.description;
		plan.carrier = req.body.carrier;
		plan.price = req.body.price;
		plan.minPerMonth = req.body.minPerMonth;
		plan.dataPerMonth = req.body.dataPerMonth; // GB
		plan.txtPerMonth = req.body.txtPerMonth;
		

		// save the phone and check for errors
		plan.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Plan created!' });
		});
		
	})

	// get all the plans (accessed at GET http://localhost:8080/api/plans)
	.get(function(req, res) {
		Plan.find(function(err, plans) {
			if (err)
				res.send(err);

			res.json(plans);
		});
	});


/*
=============================================================

Route: WURFL

=============================================================
*/


// WURFL Device Detection
router.route('/wurfl/')


	// get the bear with that id (accessed at GET http://localhost:8080/api/wurfl/)
	.get(function(req, res) {
		var configuration = new config.WurflCloudConfig(WURFL_API_KEY);
		var brand;
		var result_capabilities = {};
		var WURFLCloudClientObject = new wurfl_cloud_client.WurflCloudClient(configuration, req, res);
	    WURFLCloudClientObject.detectDevice(req, null, function(err, result_capabilities){
		    //console.log("All capabilities available:" + JSON.stringify(result_capabilities));
		    WURFLCloudClientObject.getDeviceCapability('brand_name', function(error, brand){
		        if(error!=null){
		            res.json('Error' + error);
		        }else{
		            var resultData = {
		            	'brand' : result_capabilities['brand_name'],
		            	'model' : result_capabilities['model_name'],
		            	'marketing_name' : result_capabilities['marketing_name'],
		            	'is_wireless' : result_capabilities['is_wireless_device'],
		            	"release_date": result_capabilities['release_date'],
		            	"id": result_capabilities['id'],
		            	"product_name" : result_capabilities['brand_name'] + " " +((result_capabilities['marketing_name'] != "") ? result_capabilities['marketing_name'] : result_capabilities['model_name'])
		            }
		            res.json(resultData);
		        }
		    });
		});

	});


/*
=============================================================

Route: 404

=============================================================

app.get('*', function(req, res){
  res.send("Ummm, we can't render that page (404).", 404);
});
*/



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);











// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port + '/api/');