// retrieve user's favourite channels from database, return as array

module.exports = function(userId, dbPool) {
	return new Promise(function(resolve, reject) {
		dbPool.getConnection(function(connectionErr, connection) {
			if (connectionErr) {
				console.log('Connection error in getFavourites.', connectionErr);
				return reject();
			}

			var sqlQuery = 'SELECT c.channel_channel_id FROM channel c WHERE c.channel_user_username = ' + connection.escape(userId);
			connection.query(sqlQuery, function(queryErr, results, fields) {
				connection.release();

				if (queryErr) {
					console.log('Query error in getFavourites.', queryErr);
					return reject();
				}

				var processedResults = results.map(function(result) {
					return result.channel_channel_id;
				});

				return resolve(processedResults);
			}); // end connection
		}); // end getConnection
	}); // end Promise
}