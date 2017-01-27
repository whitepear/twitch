var React = require('react');
var Link = require('react-router').Link;

var Home = React.createClass({
	render: function() {
		return (
			<div className="container">
				<div className="hidden-xs seats">
					{ /*This div is used to display an image on sm+ screens*/ }
				</div>
				<div className="home-header-container">
					<div className="home-header twitch-header-one"><span className="twitch-header-one-capital">T</span>witchTV</div>
					<div className="home-header twitch-header-two"><span className="twitch-header-two-capital">V</span>iewer</div>
					<h2 className="twitch-icon">&#xf1e8;</h2>
				</div>
				<div className="home-login-container">
					<div className="hidden-xs home-login-header">Login</div>
					<form action="/login" method="POST" className="login-form">
						<input type="text" name="loginUsername" placeholder="Username" required />
						<input type="password" name="loginPassword" placeholder="Password" required />
						<button type="submit" className="btn">Login</button>
					</form>
					<div id="loginMessage"></div>
				</div>
				<div className="home-register-container">
					<div className="home-register-message">Don't have an account?</div>
					<Link to="/register">
						<button type="button" className="btn home-register-btn">Register</button>
					</Link>
				</div>
			</div>
		)
	}
});

module.exports = Home;