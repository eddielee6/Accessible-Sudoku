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
            			//Do we need to move up from square 3 or 6? (zero indexed)
            			if(((square == 6) || (square == 3)) && (cell == 0))
            			{
            				square--;
            				cell = 8;
            				sender.viewModel.currentSelection.square--;
            				sender.viewModel.currentSelection.cell = 8;
            			}
            			//Do we need to move up a row?
            			else if((square % 3 == 0) && (cell % 3 == 0))
            			{
            				square+=2;
            				cell--;
            				sender.viewModel.currentSelection.square+=2;
            				sender.viewModel.currentSelection.cell--;
            			}
            			//Do we need to move into the left adjacent box?
            			else if(cell % 3 == 0)
            			{
            				square--;
            				cell+=2;
            				sender.viewModel.currentSelection.square--;
            				sender.viewModel.currentSelection.cell +=2;
            			} 
            			//otherwise, just move the selected cell one cell to the left
            			else 
            			{
            				cell--;
            				sender.viewModel.currentSelection.cell--;
            			}
            			break;
            		case 38: //up
            			
            			break;
            		case 39: //right
            			//Do we need to drop to drop down from squares 2 or 5? (zero indexed)
            			if(((square == 2) || (square == 5)) && (cell == 8))
            			{
            				square++;
            				cell = 0;
            				sender.viewModel.currentSelection.square++;
            				sender.viewModel.currentSelection.cell = 0;
            			}
            			//Do we need to drop down to the next row?
            			else if(((square + 1) % 3 == 0) && (square != 0) && ((cell+1) % 3 == 0))
            			{
            				square-=2;
            				cell++;
            				sender.viewModel.currentSelection.square-=2;
            				sender.viewModel.currentSelection.cell++;
            			}
            			//Do we need to cross into the next square to the right?
            			else if((cell + 1) % 3 == 0 && cell != 0)
            			{
            				square++;
            				cell-=2;
            				sender.viewModel.currentSelection.square++;
            				sender.viewModel.currentSelection.cell -=2;
            			} 
            			//Otherwise, just move the selected cell one cell to the right
            			else 
            			{
            				cell++;
            				sender.viewModel.currentSelection.cell++;		
            			}
            		default: 
            		break;
            	}
            	//Update the viewmodel data
            	sender.viewModel.Squares[square].Cells[cell].IsSelected(true);	
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