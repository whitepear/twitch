var React = require('react');
var PropTypes = React.PropTypes;

function Favourite(props) {
	if (props.twitchChannel.channelProperties.stream === null) {
		// channel is offline
		return (
			<div className="favourite-container">
				<img src="https://placeholdit.imgix.net/~text?txtsize=12&txt=125%C3%97125&w=125&h=125" className="favourite-image" alt="Channel logo."/>
				<div className="favourite-description">
					<div className="favourite-name">{props.twitchChannel.channelName}</div>
					<div className="favourite-remove" id={props.twitchChannel.channelName} onClick={props.onRemoveFavourite}>&#xf00d; <span>Remove</span></div>
					<a href={"https://www.twitch.tv/" + props.twitchChannel.channelName} className="favourite-link">View Channel</a>
				</div>
			</div>
		);
	} else {
		// channel is online
		return (
			<div className="favourite-container">
				<img src={props.twitchChannel.channelProperties.stream.channel.logo} className="favourite-image" alt="Channel logo."/>
				<div className="favourite-description">
					<div className="favourite-name">{props.twitchChannel.channelProperties.stream.channel.display_name}</div>
					<div className="favourite-remove" id={props.twitchChannel.channelName} onClick={props.onRemoveFavourite}>&#xf00d; <span>Remove</span></div>
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