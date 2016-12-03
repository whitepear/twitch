var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./routes/routes.js');
require('./styles/client.scss');

ReactDOM.render(
	routes,
	document.getElementById('app')	
);