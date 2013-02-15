VoiceOverManager = function(outputTo) {
	var outputElementId = outputTo;

	this.OutputMessage = function(message) {
		$("#"+outputElementId).text(message);
	};
};