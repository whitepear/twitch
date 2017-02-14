var React = require('react');
var PropTypes = React.PropTypes;
var axios = require('axios');

// component for displaying info about a stream returned by
// getStreams, within SearchContainer.	
		
var Stream = React.createClass({
	propTypes: {
		streamData: PropTypes.object.isRequired
	},
	getInitialState: function() {
		// prop passed to favourite is only used as initial seed data
		return {
			favourite: this.props.streamData.channel.favourite
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
			<div className="stream-container">
				<img src={this.props.streamData.channel.logo} className="stream-image" alt="Channel logo."/>
				<div className="stream-description">
					<div className="stream-name">{this.props.streamData.channel.display_name}</div>
					<div className="stream-favourite" id={this.props.streamData.channel.name} onClick={this.handleFavourite}>{this.state.favourite ? "" : ""}</div>
					<div className="stream-viewers"><span className="eye-symbol">&#xe900;</span> {this.props.streamData.viewers}</div>
					<a href={this.props.streamData.channel.url} className="stream-link">View Stream</a>
				</div>
			</div>
		);
	}
});

module.exports = Stream;
