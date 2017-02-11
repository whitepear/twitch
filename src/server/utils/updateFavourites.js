// update user's favourites by adding or removing a channel,
// based on the string passed in operationType ('add' or 'remove')

module.exports = function(operationType, channelId, userId, dbPool) {
	return new Promise(function(resolve, reject) {
		dbPool.getConnection(function(connectionErr, connection) {
			if (connectionErr) {
				console.log('Connection error in updateFavourites: ', connectionErr);
				return reject();
			}
			
			if (operationType === 'add') {
				var sqlQuery = 'INSERT INTO channel (channel_user_username, channel_channel_id) VALUES (' + connection.escape(userId) + ', ' + connection.escape(channelId) +')';
			} else if (operationType === 'remove') {
				sqlQuery = 'DELETE FROM channel WHERE channel_channel_id = ' + connection.escape(channelId);
			}
			connection.query(sqlQuery, function(queryErr, results, fields) {
				connection.release();

				if (queryErr) {
					console.log('Query error in updateFavourites: ', queryErr);
					return reject();
				}

				return resolve();
			}); // end connection
		}); // end getConnection
	}); // end Promise
}