var React = require('react');
var PropTypes = React.PropTypes;

function Favourite(props) {
	if (props.twitchChannel.channelProperties.stream === null) {
		// channel is offline
		return (
			<div className="favourite-container">
				<div className="favourite-offline-image">Offline</div>
				<div className="favourite-description">
					<div className="favourite-name">{props.twitchChannel.channelName}</div>
					<div className="favourite-remove" id={props.twitchChannel.channelName} onClick={props.onRemoveFavourite}>&#xf00d;</div>
					<a href={"https://www.twitch.tv/" + props.twitchChannel.channelName} className="favourite-link">View Channel</a>
				</div>
			</div>
		);
	} else {
		// channel is online

		// trim stream status
		var channelStatus = props.twitchChannel.channelProperties.stream.channel.status;
		if (channelStatus.length > 82) {
			channelStatus = channelStatus.slice(0, 79) + '...';
		}

		return (
			<div className="favourite-container">
				<img src={props.twitchChannel.channelProperties.stream.channel.logo} className="favourite-image" alt="Channel logo."/>
				<div className="favourite-description">
					<div className="favourite-name">{props.twitchChannel.channelProperties.stream.channel.display_name} <span className="favourite-viewers hidden-xs"><span className="eye-symbol">&#xe900;</span> {props.twitchChannel.channelProperties.stream.viewers}</span></div>
					<div className="favourite-status hidden-xs">{channelStatus}</div>
					<div className="favourite-remove" id={props.twitchChannel.channelName} onClick={props.onRemoveFavourite}>&#xf00d;</div>
					<div className="favourite-viewers-mobile"><span className="eye-symbol">&#xe900;</span> {props.twitchChannel.channelProperties.stream.viewers}</div>
					<a href={props.twitchChannel.channelProperties.stream.channel.url} className="favourite-link">View Stream</a>
				</div>
			</div>
		);
	}	
}

Favourite.propTypes = {
	twitchChannel: PropTypes.object.isRequired,
	onRemoveFavourite: PropTypes.func.isRequired
};

module.exports = Favourite;