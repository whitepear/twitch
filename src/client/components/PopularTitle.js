var React = require('react');
var PropTypes = React.PropTypes;

// component for displaying info about one of twitch's most-watched titles.
// used by getTopGames method within SearchContainer.

function PopularTitle(props) {
	return (
		<div className="popular-title-container">
			<img src={props.gameInfo.game.box.medium} className="popular-title-image" alt="Title box-art"/>
			<div className="popular-title-description">
				<div className="popular-title-name">{props.gameInfo.game.name}</div>
				<div className="popular-title-viewers">{props.gameInfo.viewers} <span className="eye-symbol">&#xe900;</span></div>
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