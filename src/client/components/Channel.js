var React = require('react');
var PropTypes = React.PropTypes;
var axios = require('axios');

// component for displaying info about a channel returned by
// getChannels, within SearchContainer.	

var Channel = React.createClass({
	propTypes: {
		channelData: PropTypes.object.isRequired
	},
	getInitialState: function() {		
		// prop passed to favourite is only used as initial seed data
		return {
			favourite: this.props.channelData.favourite
		};		
	},
	handleFavourite: function(e) {
		if (this.state.favourite) {
			// remove from user's favourites within database
			var serverRoute = '/removeChannel';
		} else {
			// add to user's favourites within database
			serverRoute = '/addChannel';
		}

		axios.post(serverRoute, {
			channelId: e.target.id
		})
		.then(function(res) {
			if (res.data === 'Success') {
				this.setState({
					favourite: !this.state.favourite
				});
			}
		}.bind(this))
		.catch(function(err) {
			console.log('handleFavourite error: ', err);
		});
	},
	render: function() {
		return (
			<div className="channel-container">
				<img src={this.props.channelData.logo} className="channel-image" alt="Channel logo."/>
				<div className="channel-description">
					<div className="channel-name">{this.props.channelData.display_name}</div>
					<div className="channel-favourite" id={this.props.channelData._id} onClick={this.handleFavourite}>{this.state.favourite ? "" : ""}</div>
					<a href={this.props.channelData.url} className="channel-link">View Channel</a>
				</div>
			</div>
		);
	}
});

module.exports = Channel;
