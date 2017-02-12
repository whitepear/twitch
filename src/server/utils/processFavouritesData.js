// this function repairs missing logos within a favourited user channel returned by the
// twitch api. it also extracts the channel name from a link object located on the api
// res object.

module.exports = function(apiRes) {
	// if logo is missing, set placeholder
	if (apiRes.data.stream && apiRes.data.stream.channel.logo === null) {
		apiRes.data.stream.channel.logo = "https://placeholdit.imgix.net/~text?txtsize=12&txt=125%C3%97125&w=125&h=125";
	}
	
	// extract channel name from channel link
	var channelLink = apiRes.data._links.channel;			
	var channelName = channelLink.slice(channelLink.lastIndexOf('/') + 1);

	return {
		channelProperties: apiRes.data,
		channelName: channelName
	};
}