// this function integrates a user's favourited channel
// data with the stream data received from the twitch api

module.exports = function(arr, offset) {
	var streamData = arr[0].data.streams;
	var totalStreams = arr[0].data._total;
	var favouritesData = arr[1];
	
	streamData.forEach(function(stream) {
		// if logo is missing, use placeholder
		if (stream.channel.logo === null) {
	 		stream.channel.logo = "https://placeholdit.imgix.net/~text?txtsize=12&txt=125%C3%97125&w=125&h=125";
	 	}

	 	// check if stream's channel is a user favourite
	 	if (favouritesData.indexOf(stream.channel.name) > -1) {
	 		stream.channel.favourite = true;
	 	} else {
	 		stream.channel.favourite = false;
	 	}
	});

	if ( (offset + 10) >= totalStreams) {
		var nextAvailableBool = false;
	} else {
		nextAvailableBool = true;
	}
	
	return {
		streamData: streamData,
		nextAvailable: nextAvailableBool
	};
}