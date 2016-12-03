var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var MainContainer = require('../containers/MainContainer.js');
var HomeContainer = require('../containers/HomeContainer.js');
// var Login = require('../containers/LoginContainer.js');
// var Register = require('../containers/RegisterContainer.js');

var routes = (
	<Router history={hashHistory}>
		<Route path='/' component={MainContainer}>
			<IndexRoute component={HomeContainer} />
			<Route path='login' component={Login} />	
			<Route path='register' component={Register} />	
		</Route>
	</Router>
);

module.exports = routes;