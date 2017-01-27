var React = require('react');
var Link = require('react-router').Link;

function Register(props) {
	return (
		<div className="container">
			<div className="register-banner">
				<div className="register-banner-text">Register</div>
			</div>
			<div className="register-form-container">
				<form action="/register" method="POST" className="register-form">
					<label htmlFor="registerEmail">Email:</label>
					<input type="text" id="registerEmail" required />
					<label htmlFor="registerUsername">Username:</label>
					<input type="text" id="registerUsername" required />
					<label htmlFor="registerPassword">Password:</label>
					<input type="password" id="registerPassword" placeholder="8 characters minimum." required />
					<label htmlFor="registerPasswordRepeat">Repeat Password:</label>
					<input type="password" id="registerPasswordRepeat" placeholder="Letters & numbers only." required />
					<button type="submit" className="btn">Register</button>
					<Link to="/" className="register-cancel">Cancel</Link>
				</form>
			</div>
		</div>
	)
}

module.exports = Register;