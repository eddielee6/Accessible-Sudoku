SudokuGameController = function () {
	var localStorage = new LocalStorageRepository();

	var init = new function() {
		var savedGame = localStorage.GetValueForKey("gameSave");
		if(savedGame != null) {
			this.LoadSavedGame(savedGame);
		} else {
			this.StartNewGame();
		}
	};

	this.StartNewGame = function() {

	};

	this.LoadSavedGame = function(savedGame) {

	};
	
};