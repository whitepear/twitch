var React = require('react');
var PropTypes = React.PropTypes;
var axios = require('axios');

// component for displaying info about a stream returned by
// getStreams, within SearchContainer.	
		
var Stream = React.createClass({
	propTypes: {
		streamInfo: PropTypes.object.isRequired
	},
	getInitialState: function() {
		// prop passed to favourite is only used as initial seed data
		return {
			favourite: this.props.streamInfo.channel.favourite
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
				<img src={this.props.streamInfo.channel.logo} className="stream-image" alt="Channel image"/>
				<div className="stream-description">
					<div className="stream-name">{this.props.streamInfo.channel.display_name}</div>
					<div className="stream-favourite" id={this.props.streamInfo.channel._id} onClick={this.handleFavourite}>{this.state.favourite ? "" : ""}</div>
					<a href={this.props.streamInfo.channel.url} className="stream-link">View Stream</a>
				</div>
			</div>
		);
	}
});

module.exports = Stream;
