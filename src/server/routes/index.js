var express = require('express');
var path = require('path');
var router = express.Router();
var mid = require('../utils/routeMiddleware.js');
var registrationValidation = require('../utils/serverValidation.js').registrationValidation;
var registerUser = require('../utils/registerUser.js');

// serve react-client
router.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});


// register users
router.post('/register', mid.loggedOut, mid.sanitizeUserInput, function(req, res, next) {
	// trim fields, except passwords
	var userInfo = {
		email: req.body.registerEmail.trim(),
		username: req.body.registerUsername.trim(),
		password: req.body.registerPassword,
		passwordRepeat: req.body.registerPasswordRepeat
	};
	
	// validate user registration info
	registrationValidation(userInfo, req.pool)
	.then(function() {
		// user-info validated, register user
		return registerUser(userInfo, req);
	})
	.then(function() {
		// user registered successfully
		res.json('Success');
	})
	.catch(function(err) {
		// validation failed, or program error
		if (typeof err !== 'string') {
			err = 'An error occurred during registration.\nPlease try again later.';
		}
		res.json(err);
	});
});

module.exports = router;
