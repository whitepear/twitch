var express = require('express');
require('dotenv').config();
var path = require('path');
var router = express.Router();
var axios = require('axios');
var mid = require('../utils/routeMiddleware.js');
var serverValidation = require('../utils/serverValidation.js');
var registrationValidation = serverValidation.registrationValidation;
var loginValidation = serverValidation.loginValidation;
var registerUser = require('../utils/registerUser.js');
var getFavourites = require('../utils/getFavourites.js');
var processStreamData = require('../utils/processStreamData.js');
var updateFavourites = require('../utils/updateFavourites.js');

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
router.post('/logOut', mid.loggedIn, function(req, res, next) {
	if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
			if (err) {
        return next(err);
      }
      res.send('Logged Out!');
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

// retrieve games with highest viewer numbers from twitch api
router.post('/topGames', mid.loggedIn, function(req, res, next) {
	axios.get('https://api.twitch.tv/kraken/games/top?client_id=' + process.env.TWITCH_ID)
	.then(function(apiRes) {
		res.json(apiRes.data.top);
	})
	.catch(function(err) {
		console.log(err);
		res.json('An error occurred while fetching TwitchTV data. \nPlease try again later.');
	});
});

// retrieve streams based on provided search input
router.post('/streams', function(req, res, next) {
	var searchQuery = req.body.searchQuery;
	var offset = req.body.page * 10;

	var streamsPromise = axios.get('https://api.twitch.tv/kraken/search/streams?query=' + searchQuery + '&offset=' + offset + '&client_id=' + process.env.TWITCH_ID);
	var favouritesPromise = getFavourites(req.session.userId, req.pool);
	Promise.all([streamsPromise, favouritesPromise])
	.then(function(valueArr) {
		res.json(processStreamData(valueArr));
	})
	.catch(function(err) {
		console.log(err);
		res.json('An error occurred while fetching TwitchTV data. \nPlease try again later.');
	});
});

// retrieve channels based on provided search input 
router.post('/channels', function(req, res, next) {
	var searchQuery = req.body.searchQuery;
	var offset = req.body.page * 10;

	axios.get('https://api.twitch.tv/kraken/search/channels?query=' + searchQuery + '&offset=' + offset + '&client_id=' + process.env.TWITCH_ID)
	.then(function(apiRes) {
		res.json(apiRes.data);
	})
	.catch(function(err) {
		console.log(err);
		res.json('An error occurred while fetching TwitchTV data. \nPlease try again later.');
	});
});

// add channel to user's favourites
router.post('/addChannel', mid.loggedIn, function(req, res, next) {
	updateFavourites('add', req.body.channelId, req.session.userId, req.pool)
	.then(function() {
		res.json('Success');
	})
	.catch(function(err) {
		res.json('An error occurred while adding channel to user\'s favourites. \nPlease try again later.');
	});
});

// remove channel from user's favourites
router.post('/removeChannel', mid.loggedIn, function(req, res, next) {
	updateFavourites('remove', req.body.channelId, req.session.userId, req.pool)
	.then(function() {
		res.json('Success');
	})
	.catch(function(err) {
		res.json('An error occurred while removing channel from user\'s favourites. \nPlease try again later.');
	});
});

module.exports = router;
