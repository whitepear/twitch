var React = require('react');
var Home = require('../components/Home.js');
var loginValidation = require('../utils/clientValidation.js').loginValidation;
var axios = require('axios');

var HomeContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			loginUsername: '',
			loginPassword: '',
			validationMessage: '',
			validationPassed: false
		};
	},
	handleFieldChange: function(e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	},
	handleLoginSubmit: function(e) {
		e.preventDefault();
		var validationResult = loginValidation(this.state);

		if (validationResult.validationPassed) {
			// passed client-side validation, call handleServerSubmission to send
			// login credentials to server for further validation and login

			// disable login submit button while server-side 
			// validation takes place
			this.setState({
				validationPassed: true
			}, this.handleServerSubmission);
		} else {
			// validation failed
			this.setState({
				validationMessage: validationResult.validationMessage
			});
		}
	},
	handleServerSubmission: function() {
		// pass form-data to server for validation and potential login
		axios.post('/login', this.state)
		.then(function(serverRes) {
			if (serverRes.data === 'Success') {
				// validation passed, user logged in
				// redirect user
				this.context.push('/');
			} else {
				// failed server validation
				this.setState({
					validationMessage: serverRes.data,
					validationPassed: false
				});
			}			
		}.bind(this))
		.catch(function(err) {
			console.log(err);
			this.setState({
				validationMessage: 'A server error occurred while processing your request.\nPlease try again later.',
				validationPassed: false
			});
		}.bind(this))
	},
	render: function() {
		return <Home 
							onFieldChange={this.handleFieldChange}
							onLoginSubmit={this.handleLoginSubmit} 
							validationMessage={this.state.validationMessage}
							validationPassed={this.state.validationPassed} />
	}
});

module.exports = HomeContainer;