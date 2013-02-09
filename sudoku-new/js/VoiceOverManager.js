VoiceOverManager = function(outputElement) {
	var sender = this;
	var delay = 500; //ms
	var messageBuffer = "";

	this.OutputMessage = function(message) {
		if(messageBuffer == "") {
			messageBuffer = message;
			setTimeout(function() {
				console.log(messageBuffer);
				messageBuffer = "";
				//$(sender._outputElement).text(messageBuffer);
			}, delay);
		} else {
			messageBuffer = messageBuffer + " " + message;
		}
	};

	var init = new function(outputElement) {
		sender._outputElement = outputElement;
	};
};