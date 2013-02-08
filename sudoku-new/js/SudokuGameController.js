SudokuGameController = function () {
	var sender = this;
	var localStorage = new LocalStorageRepository();
	var viewModel = new SudokuViewModel();

	this.StartNewGame = function() {
		localStorage.SetValueForKey("gameSave", "TEMP");
		this.BindToView();
		console.log("new game");
	};

	this.LoadSavedGame = function(savedGame) {
		this.BindToView();
		console.log("load game");
	};

	this.BindToView = function() {
		ko.applyBindings(null);
	};

	var init = new function() {
		var savedGame = localStorage.GetValueForKey("gameSave");
		if(savedGame != null) {
			sender.LoadSavedGame(savedGame);
		} else {
			sender.StartNewGame();
		}
	};
	
};