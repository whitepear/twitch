var React = require('react');
var PropTypes = React.PropTypes;
var Loading = require('../components/Loading.js');
var PopularTitle = require('../components/PopularTitle.js');
var Stream = require('../components/Stream.js');
var Channel = require('../components/Channel.js');
var axios = require('axios');

// component mounted within ViewerContainer.
// allows user to search streams and channels.

var SearchContainer = React.createClass({
	getInitialState: function() {
		return {
			loading: true,
			searchInputContent: '',
			lastSubmittedSearch: '',
			currentPage: 0,
			currentContentType: 'topGames',
			twitchContent: [],
			moreResultsAvailable: false
		};
	},
	componentDidMount: function() {
		this.getTopGames();
	},	
	handleInputChange: function(e) {
		// update state with value within search bar

		this.setState({
			searchInputContent: e.target.value
		});
	},
	getTopGames: function() {
		// retrieve top-viewed games from twitch api

		axios.post('/topGames')
		.then(function(res) {

			if (typeof res.data === 'object') {
				// construct JSX from api response data
				var generatedMarkup = res.data.map(function(gameInfo) {
					return <PopularTitle key={gameInfo.game._id} gameInfo={gameInfo} onStreamSearch={this.updatePage} />;
				}.bind(this));
			} else {
				var errorMessage = res.data;
			}			

			this.setState({
				loading: false,
				twitchContent: generatedMarkup || errorMessage
			});
		}.bind(this))
		.catch(function(err) {
			console.log(err);
			this.setState({
				loading: false,
				twitchContent: err.message
			});
		}.bind(this));
	},
	getStreams: function(searchQuery) {
		// retrieve streams from twitch api based on input string
		
		axios.post('/streams', {
			searchQuery: searchQuery,
			page: this.state.currentPage
		})
		.then(function(res) {

			if (typeof res.data.streamData === 'object') {
				// construct JSX from api response data
				var generatedMarkup = res.data.streamData.map(function(streamData) {
					return <Stream key={streamData._id} streamData={streamData} />;	
				}.bind(this));
			} else {
				var errorMessage = res.data.streamData;
			}			

			this.setState({
				loading: false,
				lastSubmittedSearch: searchQuery,
				twitchContent: generatedMarkup || errorMessage,
				moreResultsAvailable: res.data.nextAvailable
			});
		}.bind(this))
		.catch(function(err) {
			this.setState({
				loading: false,
				twitchContent: err.message
			});
		}.bind(this));
	},
	getChannels: function(searchQuery) {
		// retrieve channels from twitch api based on input string
		
		axios.post('/channels', {
			searchQuery: searchQuery,
			page: this.state.currentPage
		})
		.then(function(res) {
			
			if (typeof res.data.channelData === 'object') {
				// construct JSX from api response data
				var generatedMarkup = res.data.channelData.map(function(channelData) {
					return <Channel key={channelData._id} channelData={channelData} />;	
				}.bind(this));
			} else {
				var errorMessage = res.data.channelData;
			}			

			this.setState({
				loading: false,
				lastSubmittedSearch: searchQuery,
				twitchContent: generatedMarkup || errorMessage,
				moreResultsAvailable: res.data.nextAvailable
			});
		}.bind(this))
		.catch(function(err) {
			this.setState({
				loading: false,
				twitchContent: err.message
			});
		}.bind(this));
	},
	updatePage: function(e) {
		// update page state before requesting twitch api data

		// handle streamsBtn click
		if (e.target.id === 'streamsBtn' && (this.state.searchInputContent).trim().length > 0) {
			return this.setState({
				loading: true,
				currentPage: 0,
				currentContentType: 'streams'
			}, function() {
				this.getStreams(this.state.searchInputContent);
			});
		} 
		
		// handle channelsBtn click
		if (e.target.id === 'channelsBtn' && (this.state.searchInputContent).trim().length > 0) {
			return this.setState({
				loading: true,
				currentPage: 0,
				currentContentType: 'channels'
			}, function() {
				this.getChannels(this.state.searchInputContent);
			});
		} 
		
		// handle previous results click
		if (e.target.id === 'prev') {
			return this.setState({
				loading: true,
				currentPage: this.state.currentPage - 1
			}, function() {
				if (this.state.currentContentType === 'streams') {
					this.getStreams(this.state.lastSubmittedSearch);
				} else {
					this.getChannels(this.state.lastSubmittedSearch);
				}
			});
		}
		
		// handle next results click
		if (e.target.id === 'next') {
			return this.setState({
				loading: true,
				currentPage: this.state.currentPage + 1
			}, function() {
				if (this.state.currentContentType === 'streams') {
					this.getStreams(this.state.lastSubmittedSearch);
				} else {
					this.getChannels(this.state.lastSubmittedSearch);
				}
			});
		}

		// handle popular-title-btn click
		if (e.target.classList.contains('popular-title-btn')) {
			var gameTitle = e.target.id;
			return this.setState({
				loading: true,
				currentPage: 0,
				currentContentType: 'streams'
			}, function() {
				this.getStreams(gameTitle);
			});
		}
	},
	render: function() {
		return (
			<div className="search-container">
				<input type="text" className="search-bar" disabled={this.state.loading} onChange={this.handleInputChange} placeholder="Search channels or streams" />
				<div className="search-btn-container">
					<button id="streamsBtn" disabled={this.state.loading} onClick={this.updatePage}>Streams</button>
					<button id="channelsBtn" disabled={this.state.loading} onClick={this.updatePage}>Channels</button>
				</div>
				{ this.state.loading ? <Loading /> : this.state.twitchContent }
				<div className={ ( (this.state.loading || typeof this.state.twitchContent === 'string') ? "invisible " : "" ) + "page-nav" }>
					<div id="prev" className={ (this.state.currentPage > 0) ? "" : "invisible" } onClick={this.updatePage}>&lt;&lt;</div>
					<div className={ this.state.currentContentType !== "topGames" ? "" : "invisible" }>{ this.state.currentPage + 1 }</div>
					<div id="next" className={ (this.state.moreResultsAvailable ) ? "" : "invisible" } onClick={this.updatePage}>&gt;&gt;</div>
				</div>
			</div>
		);
	}
});

module.exports = SearchContainer;