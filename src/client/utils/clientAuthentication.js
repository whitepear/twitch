var browserHistory = require('react-router').browserHistory;
var axios = require('axios');

// these functions check if client is logged in and redirect if appropriate


module.exports.logOutCheck = function() {
	axios.post('/checkLoginStatus')
	.then(function(res) {
		var loggedIn = res.data;
		if (loggedIn) {
			browserHistory.push('/viewer');	
		}
	})
	.catch(function(err) {
		console.log(err);
	});
};

module.exports.logInCheck = function() {
	axios.post('/checkLoginStatus')
	.then(function(res) {
		var loggedIn = res.data;
		if (!loggedIn) {
			browserHistory.push('/');	
		}
	})
	.catch(function(err) {
		console.log(err);
	});
};