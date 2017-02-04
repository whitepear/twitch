var bcrypt = require('bcryptjs');

// Validate registration form data
module.exports.registrationValidation = function(userInfo, dbPool) {
	return new Promise(function(resolve, reject) {
		var email = userInfo.email;
		var username = userInfo.username;
		var password = userInfo.password;
		var passwordRepeat = userInfo.passwordRepeat;
		
		if (!email ||
				!username ||		  
			  !password ||
			  !passwordRepeat) {
			return reject('All form fields must be completed.');
		}

		if (username.length > 30) {
			return reject('Username is too long. 30 characters maximum.');
		}

		if ( !/@/.test(email) ) {
			return reject('Email address provided is not valid.');
		}

		if (password.length < 8) {
			return reject('Password provided must be at least 8 characters in length.');
		}

		if (!/[a-zA-Z]/.test(password) ||
		    !/[0-9]/.test(password)) {
			return reject('Password must contain at least one letter and one number.');
		}

		if (/[^a-zA-Z0-9]/.test(password)) {
			return reject('Passwords may only contain letters and numbers.');
		}

		if (password !== passwordRepeat) {
			return reject('Passwords do not match.');
		}	

		// check that username and email address are not already registered
		dbPool.getConnection(function(connectionErr, connection) {
			if (connectionErr) {
				return reject('A server error occurred while attempting to validate your information.\nPlease try again later.');
			}

			var sqlQuery = 'SELECT u.user_email, u.user_username FROM user u WHERE u.user_email = ' + connection.escape(email) + ' OR u.user_username = ' + connection.escape(username);
			connection.query(sqlQuery, function(queryErr, results, fields) {
		    connection.release();
		    
		    if (queryErr) {
					return reject('A server error occurred while attempting to validate your information.\nPlease try again later.');
		    }

		    if (results.length > 0 && results[0].user_email === email) {
		    	return reject('The email address provided has already been registered.');
		    }

		    if (results.length > 0 && results[0].user_username === username) {
		    	return reject('The username provided has already been registered.');
		    }

				return resolve();
		  }); // end connection query
		}); // end getConnection
	}); // end return promise	
} // end function


// validate login form data
module.exports.loginValidation = function(userInfo, dbPool) {
	return new Promise(function(resolve, reject) {
		var username = userInfo.username;
		var password = userInfo.password;

		if (!username || !password) {
			return reject('Please fill out all fields before attempting to log in.');
		}

		// check if username provided has been registered
		dbPool.getConnection(function(connectionErr, connection) {
			if (connectionErr) {
				return reject('A server error occurred while attempting to log you in.\nPlease try again later.');
			}

			var sqlQuery = 'SELECT u.user_username, u.user_password FROM user u WHERE u.user_username = ' + connection.escape(username);
			connection.query(sqlQuery, function(queryErr, results, fields) {
				connection.release();

				if (queryErr) {
					return reject('A server error occurred while attempting to log you in.\nPlease try again later.');
				}

				if (results.length === 0) {
					return reject('The username provided has not been registered.');
				}

				// check password matches
				bcrypt.compare(dbPool.escape(password), results[0].user_password, function(compareErr, compareResult) {
					if (compareErr) {
						return reject('A server error occurred while attempting to log you in.\nPlease try again later.');
					}

					if (compareResult) {
						return resolve(username);
					} else {
						return reject('The password you have provided is incorrect.');
					}
				}); // end compare
			}); // end query
		}); // end getConnection
	}); // end new Promise
} // end function