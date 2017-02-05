var express = require('express');
var path = require('path');
var router = express.Router();
var mid = require('../utils/routeMiddleware.js');
var serverValidation = require('../utils/serverValidation.js');
var registrationValidation = serverValidation.registrationValidation;
var loginValidation = serverValidation.loginValidation;
var registerUser = require('../utils/registerUser.js');

// serve react-client
router.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});


// register user
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

// login user
router.post('/login', mid.loggedOut, mid.sanitizeUserInput, function(req, res, next) {
	var userInfo = {	
		username: req.body.loginUsername.trim(),
		password: req.body.loginPassword
	};

	loginValidation(userInfo, req.pool)
	.then(function(username) {
		// validation passed, login user
		req.session.userId = username;
		res.json('Success');
	})
	.catch(function(err) {
		// validation failed, or program error
		if (typeof err !== 'string') {
			err = 'An error occurred while attempting to log you in.\nPlease try again later.';
		}

		res.json(err);
	});
});

// logout user
router.post('/logOut', function(req, res, next) {
	if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
			if (err) {
        return next(err);
      }
    });
	}
});

// check user's login status
router.post('/checkLoginStatus', function(req, res, next) {
	if (req.session && req.session.userId) {
		res.send(true);
	} else {
		res.send(false);
	}
});

module.exports = router;
