var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('*', function(req, res) {
	// serve react-client
	res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

module.exports = router;
