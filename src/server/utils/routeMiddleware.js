// this file contains middleware functions that santiize client input,
// or check the client's login status

var sanitizeHtml = require('sanitize-html');

function sanitizeUserInput(req, res, next) {
	// escape user input
	var bodyKeys = Object.keys(req.body);
	var paramKeys = Object.keys(req.params);
	var queryKeys = Object.keys(req.query);
	var escapedContent; // loop variable for storing escaped strings

	bodyKeys.forEach(function(key) {
		escapedContent = sanitizeHtml(req.body[key], {
			allowedTags: [],
			allowedAttributes: []
		});
		req.body[key] = escapedContent.replace(/&quot;/g, '"');
	});

	paramKeys.forEach(function(key) {
		escapedContent = sanitizeHtml(req.params[key], {
			allowedTags: [],
			allowedAttributes: []
		});
		req.params[key] = escapedContent.replace(/&quot;/g, '"');
	});

	queryKeys.forEach(function(key) {
		escapedContent = sanitizeHtml(req.query[key], {
			allowedTags: [],
			allowedAttributes: []
		});
		req.query[key] = escapedContent.replace(/&quot;/g, '"');
	});

	next();
}


function loggedOut(req, res, next) {
	// prevent logged in users from accessing a route
  if (req.session && req.session.userId) {
    var err = new Error('You are not authorized to view this page while logged in.');
		err.status = 401; // 'unauthorized'
		next(err);
  } else {  	
  	next();
  }
}


function loggedIn(req, res, next) {
	// prevent unauthenticated users from accessing a route
	if (req.session && req.session.userId) {
		next();
	} else {
		var err = new Error('You are not authorized to view this page.');
		err.status = 401; // 'unauthorized'
		next(err);
	}	
}

module.exports.loggedOut = loggedOut;
module.exports.loggedIn = loggedIn;