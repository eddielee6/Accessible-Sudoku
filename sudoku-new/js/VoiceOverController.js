VoiceOverController = function(outputElement) {
	var sender = this;

	this.OutputMessage = function(message) {
		$(sender._outputElement).text(message);
	};

	var init = new function(outputElement) {
		sender._outputElement = outputElement;
	};
};