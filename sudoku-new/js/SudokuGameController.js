SudokuGameController = function () {
	var sender = this;
	var localStorage = new LocalStorageRepository();
	var viewModel = new SudokuViewModel();
	var generater = new Generator();

	this.StartNewGame = function() {
		localStorage.SetValueForKey("gameSave", "TEMP");
		this.BindToView();
		console.log("new game");
	
		// Get stuff from generate.
		viewModel.board = generater.generateGrid();
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