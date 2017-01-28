var React = require('react');
var Link = require('react-router').Link;
var PropTypes = React.PropTypes;

function Register(props) {
	return (
		<div className="container">
			<div className="register-banner">
				<div className="register-banner-text">Register</div>
			</div>
			<div className="register-form-container">
				<form action="/register" method="POST" onSubmit={props.onRegisterSubmit} className="register-form">
					<label htmlFor="registerEmail">Email:</label>
					<input type="text" id="registerEmail" onChange={props.onFieldChange} required />
					<label htmlFor="registerUsername">Username:</label>
					<input type="text" id="registerUsername" onChange={props.onFieldChange} required />
					<label htmlFor="registerPassword">Password:</label>
					<input type="password" id="registerPassword" placeholder="8 characters minimum." onChange={props.onFieldChange} required />
					<label htmlFor="registerPasswordRepeat">Repeat Password:</label>
					<input type="password" id="registerPasswordRepeat" placeholder="Letters & numbers only." onChange={props.onFieldChange} required />
					<div id="registerFormMessage">
						{props.validationMessage}
					</div>
					<button type="submit" className="btn" disabled={props.validationPassed}>Register</button>
					<Link to="/" className="register-cancel">Cancel</Link>
				</form>
			</div>
		</div>
	)
}

Register.propTypes = {
	onFieldChange: PropTypes.func.isRequired,
	onRegisterSubmit: PropTypes.func.isRequired,
	validationMessage: PropTypes.string.isRequired,
	validationPassed: PropTypes.bool.isRequired
}

module.exports = Register;