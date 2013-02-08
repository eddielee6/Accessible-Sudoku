SudokuGameController = function () {
	var sender = this;
	var localStorage = new LocalStorageRepository();
	this.viewModel;
	

	this.StartNewGame = function() {
		console.log("new game");

		var generator = new Generator();

		sender.viewModel.Squares = generator.generateGrid();

		localStorage.SetValueForKey("gameSave", "TEMP");

		bindToView();
	};

	this.LoadSavedGame = function(savedGame) {
		console.log("load game");
		sender.StartNewGame();
	};

	var bindToView = function() {
		console.log(sender.viewModel);
		ko.applyBindings(sender.viewModel);
	};

	var tick = function() {
		//viewModel.elapsed++;
	};

	var init = new function() {
		sender.viewModel = new SudokuViewModel();
		sender.viewModel.version = 1.0;

		var savedGame = localStorage.GetValueForKey("gameSave");
		if(savedGame != null) {
			sender.LoadSavedGame(savedGame);
		} else {
			sender.StartNewGame();
		}
		setInterval(tick, 1000);
	};
};