VoiceOverManager = function(outputTo) {
	var sender = this;
	var delay = 500; //ms
	var messageBuffer = "";
	var outputElementId = outputTo;

	this.OutputMessage = function(message) {

		$("#"+outputElementId).text(message);

		
		// if(messageBuffer == "") {
		// 	messageBuffer = message;
		// 	setTimeout(function() {
		// 		console.log("VoiceOver: '" + messageBuffer + "'");
		// 		$("#"+outputElementId).text(messageBuffer);
		// 		messageBuffer = "";
		// 	}, delay);
		// } else {
		// 	messageBuffer = messageBuffer + " " + message;
		// }
	};
};