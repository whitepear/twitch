var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;
var clientAuthentication = require('../utils/clientAuthentication.js');
var logInCheck = clientAuthentication.logInCheck;
var logOutCheck = clientAuthentication.logOutCheck;
var MainContainer = require('../containers/MainContainer.js');
var HomeContainer = require('../containers/HomeContainer.js');
var RegisterContainer = require('../containers/RegisterContainer.js');
var ViewerContainer = require('../containers/ViewerContainer.js');
var NotFound = require('../components/NotFound.js');

var routes = (
	<Router history={browserHistory}>
		<Route path='/' component={MainContainer}>
			<IndexRoute component={HomeContainer} onEnter={logOutCheck} />
			<Route path="register" component={RegisterContainer} onEnter={logOutCheck} />
			<Route path="viewer" component={ViewerContainer} onEnter={logInCheck} />
			<Route path="*" component={NotFound} />
		</Route>
	</Router>
);

module.exports = routes;