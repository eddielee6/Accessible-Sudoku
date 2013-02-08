SudokuGameController = function () {
	var sender = this;
	var localStorage = new LocalStorageRepository();
	var viewModel = new SudokuViewModel();

	this.StartNewGame = function() {

	};

	this.LoadSavedGame = function(savedGame) {

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