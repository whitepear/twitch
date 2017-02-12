// this function integrates a user's favourited channel
// data with the channel data received from the twitch api

module.exports = function(arr, offset) {
	var channelData = arr[0].data.channels;
	var totalChannels = arr[0].data._total;
	var favouritesData = arr[1];

	channelData.forEach(function(channel) {
		// if logo is missing, use placeholder
		if (channel.logo === null) {
			channel.logo = "https://placeholdit.imgix.net/~text?txtsize=12&txt=125%C3%97125&w=125&h=125";
		}

		// check if channel is a user favourite
		if (favouritesData.indexOf(channel._id) > -1) {
			channel.favourite = true;
		} else {
			channel.favourite = false;
		}
	});

	if ( (offset + 10) >= totalChannels) {
		var nextAvailableBool = false;
	} else {
		nextAvailableBool = true;
	}
	
	return {
		channelData: channelData,
		nextAvailable: nextAvailableBool
	};
}