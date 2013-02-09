SudokuBoardController = function() {
	var sender = this;
	var localStorage = new LocalStorageRepository();

      this.StartGame = function(gameData) {
            sender.viewModel.Squares(gameData.Squares());
            sender.viewModel.CurrentSelection = gameData.CurrentSelection;
            sender.viewModel.Squares()[0].Cells()[0].IsSelected(true);
      };

	var initSudokuControls = function() {
		$(window).keydown(function(evt) {
            if($("#gameScreen").is(":visible")) {
            	var cell = sender.viewModel.CurrentSelection.cell;
            	var square = sender.viewModel.CurrentSelection.square;
            	sender.viewModel.Squares()[square].Cells()[cell].IsSelected(false);
            	switch(evt.which)
            	{
            		// a number key was pressed
            		case 96:
            		case 97:
            		case 98:
            		case 99:
            		case 100:
            		case 101:
            		case 102:
            		case 103:
            		case 104:
            		case 105:
            			var key = getKeyPressed(evt.which);
            			if(sender.viewModel.Squares()[square].Cells()[cell].OriginalValue != "")
            			alert("original");
						sender.viewModel.Squares()[square].Cells()[cell].CurrentValue(key);
						sender.viewModel.Squares()[square].Cells()[cell].CurrentValue.valueHasMutated();
            			break;
            		case 40: //down
            			//Wrap back to the first square
            			//(Remove if wrap round not required)
            			if(square == 8 && cell == 8)
            			{
            				square = 0;
            				cell = 0;
            				sender.viewModel.CurrentSelection.square = 0;
            				sender.viewModel.CurrentSelection.cell = 0;
            			}
            			//Do we need to go into the next row of squares
            			else if((square == 6 || square == 7) && (cell == 8))
            			{
            				cell = 0;
            				square -= 5;
            				sender.viewModel.CurrentSelection.square -= 5;
            				sender.viewModel.CurrentSelection.cell = 0;
            			}
            			//Do we need to go back up to the next row? (not requiring a change into the next row of squares)
            			else if((square >= 6 && square <= 8) && (cell == 6 || cell == 7))
            			{
            				square -= 6;
            				cell -= 5;
            				sender.viewModel.CurrentSelection.square -= 6;
            				sender.viewModel.CurrentSelection.cell -= 5;	
            			}
            			//Do we need to go down into the square below?
            		 	else if(cell >= 6 && square <= 6)
            		 	{
            		 		cell -= 6;
            		 		square += 3;
            		 		sender.viewModel.CurrentSelection.square += 3;
            				sender.viewModel.CurrentSelection.cell -= 6;
            		 	}
            		 	//Otherwise, just move to the next cell below
            		 	else
            		 	{
            		 		cell += 3;
            		 		sender.viewModel.CurrentSelection.cell += 3;
            		 	}
            			break;
            		case 37: //left
            			if(square == 0 && cell == 0)
            			{
            				square = 8;
            				cell = 8;
            				sender.viewModel.CurrentSelection.square = 8;
            				sender.viewModel.CurrentSelection.cell = 8;	
            			}
            			//Do we need to move up from square 3 or 6? (zero indexed)
            			else if(((square == 6) || (square == 3)) && (cell == 0))
            			{
            				square--;
            				cell = 8;
            				sender.viewModel.CurrentSelection.square--;
            				sender.viewModel.CurrentSelection.cell = 8;
            			}
            			//Do we need to move up a row?
            			else if((square % 3 == 0) && (cell % 3 == 0))
            			{
            				square+=2;
            				cell--;
            				sender.viewModel.CurrentSelection.square+=2;
            				sender.viewModel.CurrentSelection.cell--;
            			}
            			//Do we need to move into the left adjacent box?
            			else if(cell % 3 == 0)
            			{
            				square--;
            				cell+=2;
            				sender.viewModel.CurrentSelection.square--;
            				sender.viewModel.CurrentSelection.cell +=2;
            			} 
            			//otherwise, just move the selected cell one cell to the left
            			else 
            			{
            				cell--;
            				sender.viewModel.CurrentSelection.cell--;
            			}
            			break;
            		case 38: //up
            			if(cell == 2 && square == 2)
            			{
            				square = 6;
            				cell = 6;
            				sender.viewModel.CurrentSelection.square = 6;
            				sender.viewModel.CurrentSelection.cell = 6;
            			}
            			//Do we need to go into the next row?
            			else if((cell == 0 || cell == 1) && (square >= 0 && square <= 2))
            			{
            				square += 6;
            				cell += 7;
            				sender.viewModel.CurrentSelection.square +=6;
            				sender.viewModel.CurrentSelection.cell += 7;
            			}
            			else if ((cell == 2) && (square == 0 || square == 1))
            			{
            				square += 7;
            				cell = 6;
            				sender.viewModel.CurrentSelection.square += 7;
            				sender.viewModel.CurrentSelection.cell = 6;
            			}
            			//Do we need to go up to the above square?
            			else if(cell <= 2 && square >= 3)
            			{
            				square -= 3;
            				cell += 6;
            				sender.viewModel.CurrentSelection.square -= 3;
            				sender.viewModel.CurrentSelection.cell += 6;
            			}
            			//Otherwise just go up into the above cell
            			else
            			{
            				cell -= 3;
            				sender.viewModel.CurrentSelection.cell -= 3;	
            			}
            			break;
            		case 39: //right
            			//Do we need to wrap back to the first square?
            			//(Remove if wrap round not required)
            			if(square == 8 && cell == 8)
            			{
            				square = 0;
            				cell = 0;
            				sender.viewModel.CurrentSelection.square = 0;
            				sender.viewModel.CurrentSelection.cell = 0;
            			}
            			//Do we need to drop to drop down from squares 2 or 5? (zero indexed)
            			else if(((square == 2) || (square == 5)) && (cell == 8))
            			{
            				square++;
            				cell = 0;
            				sender.viewModel.CurrentSelection.square++;
            				sender.viewModel.CurrentSelection.cell = 0;
            			}
            			//Do we need to drop down to the next row?
            			else if(((square + 1) % 3 == 0) && (square != 0) && ((cell+1) % 3 == 0))
            			{
            				square-=2;
            				cell++;
            				sender.viewModel.CurrentSelection.square-=2;
            				sender.viewModel.CurrentSelection.cell++;
            			}
            			//Do we need to cross into the next square to the right?
            			else if((cell + 1) % 3 == 0 && cell != 0)
            			{
            				square++;
            				cell-=2;
            				sender.viewModel.CurrentSelection.square++;
            				sender.viewModel.CurrentSelection.cell -=2;
            			} 
            			//Otherwise, just move the selected cell one cell to the right
            			else 
            			{
            				cell++;
            				sender.viewModel.CurrentSelection.cell++;		
            			}
            		default: 
            		break;
            	}
            	//Update the viewmodel data
            	sender.viewModel.Squares()[square].Cells()[cell].IsSelected(true);	
            }
        });
	};
	
	this.getCurrentCellValue = function() {
		var square = sender.viewModel.CurrentSelection.square;
		var cell = sender.viewModel.CurrentSelection.cell;
		return sender.viewModel.Squares[square].Cells[cell].currentValue;
	};
	
	

	var init = new function() {
            sender.viewModel = new SudokuViewModel();
            ko.applyBindings(sender.viewModel);
		initSudokuControls();
	};
};

function getKeyPressed(code)
//TODO: Refactor
{
	switch(code)
	{
		case 96:
			return "";
			break;
        case 97:
            return 1;
			break;
        case 98:
            return 2;
			break;
        case 99:
            return 3;
			break;
        case 100:
            return 4;
			break;
        case 101:
            return 5;
			break;
        case 102:
            return 6;
			break;
        case 103:
            return 7;
			break;
        case 104:
            return 8;
			break;
        case 105:
            return 9;
			break;	
	}	
}
