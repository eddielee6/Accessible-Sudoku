SudokuGameController = function () {
	var sender = this;
	var localStorage = new LocalStorageRepository();
	this.viewModel;

	var initSudokuControls = function() {
		sender.viewModel.Squares[0].Cells[0].IsSelected(true);
		
		$(window).keydown(function(evt) {
            if($("#gameScreen").is(":visible")) {
            	var cell = sender.viewModel.currentSelection.cell;
            	var square = sender.viewModel.currentSelection.square;
            	sender.viewModel.Squares[square].Cells[cell].IsSelected(false);
            	
            	switch(evt.which)
            	{
            		case 40: //down
            		 	
            			break;
            		case 37: //left
            			if((square % 3 == 0) && (cell % 3 == 0))
            			{
            				square+=2;
            				cell--;
            				sender.viewModel.currentSelection.square+=2;
            				sender.viewModel.currentSelection.cell--;
            				sender.viewModel.Squares[square].Cells[cell].IsSelected(true);
            			}
            			else if(cell % 3 == 0)
            			{
            				square--;
            				cell+=2;
            				sender.viewModel.currentSelection.square--;
            				sender.viewModel.currentSelection.cell +=2;
            				sender.viewModel.Squares[square].Cells[cell].IsSelected(true);
            			} else {
            				cell--;
            				sender.viewModel.currentSelection.cell--;
            				sender.viewModel.Squares[square].Cells[cell].IsSelected(true);
            			}
            			break;
            		case 38: //up
            			
            			break;
            		case 39: //right
            			if(((square + 1) % 3 == 0) && (square != 0) && ((cell+1) % 3 == 0))
            			{
            				square-=2;
            				cell++;
            				sender.viewModel.currentSelection.square-=2;
            				sender.viewModel.currentSelection.cell++;
            				sender.viewModel.Squares[square].Cells[cell].IsSelected(true);
            			}
            			else if((cell + 1) % 3 == 0 && cell != 0)
            			{
            				//sender.viewModel.Squares[square].Cells[cell].IsSelected(false);
            				square++;
            				cell-=2;
            				sender.viewModel.currentSelection.square++;
            				sender.viewModel.currentSelection.cell -=2;
            				sender.viewModel.Squares[square].Cells[cell].IsSelected(true);
            			} else
            			{
            				//var cell = sender.viewModel.currentSelection.cell;
            				//var square = sender.viewModel.currentSelection.square;
            				//sender.viewModel.Squares[square].Cells[cell].IsSelected(false);
            				cell++;
            				sender.viewModel.currentSelection.cell++;
            				sender.viewModel.Squares[square].Cells[cell].IsSelected(true);
            				
            			}
            		default: 
            	}
            }
        });
	};

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
		initSudokuControls();
	};
};