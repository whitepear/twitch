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