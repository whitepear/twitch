var React = require('react');
var Register = require('../components/Register.js');
var registrationValidation = require('../utils/clientValidation.js').registrationValidation;
var axios = require('axios');

var RegisterContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {			
			registerEmail: '',
			registerUsername: '',
			registerPassword: '',
			registerPasswordRepeat: '',
			validationMessage: '',
			validationPassed: false
		};
	},
	handleFieldChange: function(e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	},
	handleRegisterSubmit: function(e) {
		e.preventDefault();
		var validationResult = registrationValidation(this.state);

		if (validationResult.validationPassed) {
			// passed client-side validation, call handleServerSubmission to send
			// to server for further validation and registration

			// disable registration submit button while server-side 
			// validation takes place
			this.setState({
				validationPassed: true
			}, this.handleServerSubmission);
		} else {
			// failed client-side validation
			this.setState({
				validationMessage: validationResult.validationMessage
			});
		}
	},
	handleServerSubmission: function() {
		// pass form-data to server for validation and potential registration
		axios.post('/register', this.state)
		.then(function(serverRes) {
			if (res.data.serverValidationPassed) {
				// validation passed, user registered
				// redirect user				
				this.setState({
					validationMessage: res.data.serverValidationMessage
				}, function() {
					setTimeout(function() {
						this.context.router.push('/');						
					}.bind(this), 1500);
				});
			} else {
				// failed server validation
				this.setState({
					validationMessage: res.data.serverValidationMessage,
					validationPassed: false					
				});
			}
		}.bind(this))
		.catch(function(err) {
			console.log(err);
			this.setState({
				validationMessage: 'A server error occurred while processing your request. Please try again later.',
				validationPassed: false
			});
		}.bind(this));
	},
	render: function() {
		return <Register 
							onFieldChange={this.handleFieldChange} 
							onRegisterSubmit={this.handleRegisterSubmit}
							validationMessage={this.state.validationMessage}
							validationPassed={this.state.validationPassed} />
	}
});

module.exports = RegisterContainer;