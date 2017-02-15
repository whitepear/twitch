var React = require('react');
var PropTypes = React.PropTypes;

// component for displaying info about one of twitch's most-watched titles.
// used by getTopGames method within SearchContainer.

function PopularTitle(props) {
	// get appropriately-sized image based on screen-width
	if (window.innerWidth < 768) {
		var gameBoxImg = props.gameInfo.game.box.medium;
	} else if (window.innerWidth < 992) {
		gameBoxImg = props.gameInfo.game.box.large;
	} else if (window.innerWidth < 1200) {
		gameBoxImg = 'https://static-cdn.jtvnw.net/ttv-boxart/Counter-Strike:%20Global%20Offensive-{width}x{height}.jpg';
	} else {
		gameBoxImg = 'https://static-cdn.jtvnw.net/ttv-boxart/Counter-Strike:%20Global%20Offensive-{width}x{height}.jpg';
	}
	
	return (
		<div className="popular-title-container">
			<img src={gameBoxImg} className="popular-title-image" alt="Title box-art"/>
			<div className="popular-title-description">
				<div className="popular-title-name">{props.gameInfo.game.name}</div>
				<div className="popular-title-viewers"><span className="eye-symbol">&#xe900;</span> {props.gameInfo.viewers}</div>
				<button className="popular-title-btn" id={props.gameInfo.game.name} onClick={props.onStreamSearch}>Find Streams</button>
			</div>
		</div>
	);
}

PopularTitle.propTypes = {
	gameInfo: PropTypes.object.isRequired,
	onStreamSearch: PropTypes.func.isRequired
};

module.exports = PopularTitle;