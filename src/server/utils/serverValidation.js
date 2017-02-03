// Validate registration form data

module.exports.registrationValidation = function(userInfo, dbPool) {

	var email = userInfo.email;
	var username = userInfo.username;
	var password = userInfo.password;
	var passwordRepeat = userInfo.passwordRepeat;
	
	if (!email ||
			!username ||		  
		  !password ||
		  !passwordRepeat) {
		return Promise.reject('All form fields must be completed.');
	}

	if (username.length > 30) {
		return Promise.reject('Username is too long. 30 characters maximum.');
	}

	if ( !/@/.test(email) ) {
		return Promise.reject('Email address provided is not valid.');
	}

	if (password.length < 8) {
		return Promise.reject('Password provided must be at least 8 characters in length.');
	}

	if (!/[a-zA-Z]/.test(password) ||
	    !/[0-9]/.test(password)) {
		return Promise.reject('Password must contain at least one letter and one number.');
	}

	if (/[^a-zA-Z0-9]/.test(password)) {
		return Promise.reject('Passwords may only contain letters and numbers.');
	}

	if (password !== passwordRepeat) {
		return Promise.reject('Passwords do not match.');
	}	

	// check that username and email address are not already registered
	dbPool.getConnection(function(connectionErr, connection) {
		if (connectionErr) {
			return Promise.reject('A server error occurred while attempting to validate your information.\nPlease try again later.');
		}

		var sqlQuery = 'SELECT u.user_email, u.user_username FROM user u WHERE u.user_email = ' + connection.escape(email) + ' OR u.user_username = ' + connection.escape(username);
		connection.query(sqlQuery, function (queryErr, results, fields) {
	    connection.release();
	    
	    if (queryErr) {
				return Promise.reject('A server error occurred while attempting to validate your information.\nPlease try again later.');
	    }

	    if (results[0].user_email === email) {
	    	return Promise.reject('The email address provided has already been registered.');
	    }

	    if (results[0].user_username === username) {
	    	return Promise.reject('The username provided has already been registered.');
	    }

			return Promise.resolve();
	  });
	});
}