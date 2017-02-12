var React = require('react');
var SearchContainer = require('./SearchContainer.js');
var FavouritesContainer = require('./FavouritesContainer.js');
var axios = require('axios');

var ViewerContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			activeTab: 'Search'
		};
	},
	handleLogOut: function() {
		axios.post('/logOut')
		.then(function() {
			this.context.router.push('/');
		}.bind(this))
		.catch(function(err) {
			console.log('/logOut POST error: ', err);
		});
	},
	handleTabClick: function(e) {
		if (e.target.id === 'searchTab') {
			this.setState({
				activeTab: 'Search'
			});
		} else {
			this.setState({
				activeTab: 'Favourites'
			});
		}
	},
	render: function() {
		return (
			<div className="container">
				<div className="viewer-nav">
					<div className="viewer-twitch-icon">&#xf1e8;</div>
					<div className="viewer-twitch-logo"><span className="viewer-twitch-logo-capital">T</span>witchTV</div>
					<div className="log-out-container">
						<button className="log-out-btn" onClick={this.handleLogOut}>Log Out</button>
					</div>						
				</div>
				<div className="tab-container">
					<div className={ (this.state.activeTab === 'Search' ? 'active-tab ' : '' ) + "tab" } id="searchTab" onClick={this.handleTabClick}>Search</div>
					<div className={ (this.state.activeTab === 'Favourites' ? 'active-tab ' : '' ) + "tab" } id="favouritesTab" onClick={this.handleTabClick}>Favourites</div>
				</div>
				{this.state.activeTab === 'Search' ? <SearchContainer /> : <FavouritesContainer />}
			</div>
		);
	}
});

module.exports = ViewerContainer;