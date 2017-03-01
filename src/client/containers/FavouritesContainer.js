var React = require('react');
var Loading = require('../components/Loading.js');
var Favourite = require('../components/Favourite.js');
var axios = require('axios');

// component mounted within ViewerContainer.
// allows user to view channels they have favourited.

var FavouritesContainer = React.createClass({
	getInitialState: function() {
		return {
			userFavourites: [],
			loading: true
		};
	},
	componentDidMount: function() {
		// retrieve user's favourite channels
		axios.post('/favourites')
		.then(function(res) {			
			if (typeof res.data === 'object') {
				var generatedMarkup = res.data.map(function(twitchChannel) {
					return <Favourite 
										key={twitchChannel.channelName} 
										twitchChannel={twitchChannel} 
										onRemoveFavourite={this.handleRemoveFavourite} />
				}.bind(this));

				if (generatedMarkup.length === 0) {
					generatedMarkup = 'You currently do not have any favourite channels.';
				}
			} else {
				var errorMessage = res.data;
			}

			this.setState({
				userFavourites: generatedMarkup || errorMessage,
				loading: false
			});
		}.bind(this))
		.catch(function(err) {
			console.log(err);
			this.setState({
				userFavourites: 'An error occurred while fetching your favourites.\nPlease try again later.',
				loading: false
			});
		}.bind(this));
	},
	handleRemoveFavourite: function(e) {
		// remove a user-favourited channel from the database
		var channelId = e.target.id
		axios.post('/removeChannel', {
			channelId: channelId
		})
		.then(function() {
			// copy userFavourites array
			var updatedFavourites = this.state.userFavourites.slice();
			// remove deleted channel from array
			updatedFavourites.forEach(function(favourite, index) {
				if (favourite.key === channelId) {
					updatedFavourites.splice(index, 1);
				}
			});
			// set copied, updated array as state array
			this.setState({
				userFavourites: updatedFavourites
			});
		}.bind(this))
		.catch(function(err) {
			console.log(err);
		});
	},
	render: function() {
		return (
			<div className="favourites-container">
				{this.state.loading ? <Loading /> : this.state.userFavourites}
			</div>
		);
	}
});

module.exports = FavouritesContainer;