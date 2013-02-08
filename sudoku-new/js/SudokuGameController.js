SudokuGameController = function () {
	var sender = this;
	var localStorage = new LocalStorageRepository();
	var viewModel = null;
	var generator = new Generator();

	this.StartNewGame = function() {
		console.log("new game");

		sender.viewModel.elapsed = 0;
		sender.viewModel.Squares = null; //bind here

		localStorage.SetValueForKey("gameSave", "TEMP");

		sender.BindToView();

	};

	this.LoadSavedGame = function(savedGame) {
		console.log("load game");
		sender.BindToView();
	};

	this.BindToView = function() {
		ko.applyBindings(this.viewModel);
	};

	var tick = function() {
		viewModel.elapsed++;
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