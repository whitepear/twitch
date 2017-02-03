var bcrypt = require('bcryptjs');

function registerUser(userInfo, req) {
	return new Promise(function(resolve, reject) {
		var errMessage = 'A server error occurred while attempting to register your information.\nPlease try again later.';
		
		// generate hashed & salted pass
		bcrypt.hash(req.pool.escape(userInfo.password), 12, function(err, hash) {
			if (err) {
				console.log('Hashing error: ', err);
				return reject(errMessage);
			}

			userInfo.password = hash;
			req.pool.getConnection(function(connectionErr, connection) {
				if (connectionErr) {
					return reject(errMessage);
				}
				
				var sqlQuery = 'INSERT INTO user (user_username, user_email, user_password) VALUES (' + connection.escape(userInfo.username) + ', ' + connection.escape(userInfo.email) + ', \'' + userInfo.password +'\')';
				connection.query(sqlQuery, function(queryErr, results, fields) {
					connection.release();

					if (queryErr) {
						return reject(errMessage);
		    	}
					
					// initialize user session
					req.session.userId = userInfo.username;
										
		    	return resolve();
				}); // end connection query
			}); // end getConnection
		}); // end hash
	}); // end new Promise		
}

module.exports = registerUser;