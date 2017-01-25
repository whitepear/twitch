var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;
var MainContainer = require('../containers/MainContainer.js');
var HomeContainer = require('../containers/HomeContainer.js');

var NotFound = require('../components/NotFound.js');

var routes = (
	<Router history={browserHistory}>
		<Route path='/' component={MainContainer}>
			<IndexRoute component={HomeContainer} />
			<Route path="*" component={NotFound} />
		</Route>
	</Router>
);

module.exports = routes;