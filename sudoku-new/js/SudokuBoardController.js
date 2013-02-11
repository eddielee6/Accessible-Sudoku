SudokuBoardController = function() {
	var sender = this;
	var localStorage = new LocalStorageRepository();

      this.StartGame = function(gameData) {
            sender.viewModel.Squares(gameData.Squares());
            sender.viewModel.Squares()[0].Cells()[0].IsSelected(true);
      };

	var initSudokuControls = function() {
		$(window).keydown(function(evt) {
            if($("#gameScreen").is(":visible")) {
                var currentSelection = sender.viewModel.GetCurrentSelection();
            	var cell = currentSelection.cell;
            	var square = currentSelection.square;
            	var originallySelectedCell = cell;
            	var originallySelectedSquare = square;
            	var key;
            	switch(evt.which)
            	{
            		//V was pressed (validation - RG using for debug)
            		case 86:
            			if(boardIsValid())
            				alert("Board is valid!");
            			else
            				alert("Board is not valid!");
            			break;
            		// a number key was pressed
            		case 96:
            		case 48:
            			key = "";
            			break;
            		case 97:
            		case 49:
            			key = 1;
            			break;
            		case 98:
            		case 50:
            			key = 2;
            			break;
            		case 99:
            		case 51:
            			key = 3;
            			break;
            		case 100:
            		case 52:
            			key = 4;
            			break;
            		case 101:
            		case 53:
            			key = 5;
            			break;
            		case 102:
            		case 54:
            			key = 6;
            			break;
            		case 103:
            		case 55:
            			key = 7;
            			break;
            		case 104:
            		case 56:
            			key = 8;
            			break;
            		case 105:
            		case 57:
            			key = 9;
            			break;
            		/*
            		 * MOVEMENT LOGIC
            		 */
                        case 83:
            		case 40: //down
            			//Wrap back to the first square
            			//(Remove if wrap round not required)
            			if(square == 8 && cell == 8)
            			{
            				square = cell = 0;
            			}
            			//Do we need to go into the next row of squares
            			else if((square == 6 || square == 7) && (cell == 8))
            			{
            				cell = 0;
            				square -= 5;
            			}
            			//Do we need to go back up to the next row? (not requiring a change into the next row of squares)
            			else if((square >= 6 && square <= 8) && (cell == 6 || cell == 7))
            			{
            				square -= 6;
            				cell -= 5;
            			}
            			//Do we need to go down into the square below?
            		 	else if(cell >= 6 && square <= 6)
            		 	{
            		 		cell -= 6;
            		 		square += 3;
            		 	}
            		 	//Otherwise, just move to the next cell below
            		 	else
            		 	{
            		 		cell += 3;
            		 	}
            			break;
                        case 65:
            		case 37: //left
            			if(square == 0 && cell == 0)
            			{
            				square = 8;
            				cell = 8;	
            			}
            			//Do we need to move up from square 3 or 6? (zero indexed)
            			else if(((square == 6) || (square == 3)) && (cell == 0))
            			{
            				square--;
            				cell = 8;
            			}
            			//Do we need to move up a row?
            			else if((square % 3 == 0) && (cell % 3 == 0))
            			{
            				square+=2;
            				cell--;
            			}
            			//Do we need to move into the left adjacent box?
            			else if(cell % 3 == 0)
            			{
            				square--;
            				cell+=2;
            			} 
            			//otherwise, just move the selected cell one cell to the left
            			else 
            			{
            				cell--;
            			}
            			break;
                        case 87:
            		case 38: //up
            			if(cell == 2 && square == 2)
            			{
            				square = 6;
            				cell = 6;
            			}
            			//Do we need to go into the next row?
            			else if((cell == 0 || cell == 1) && (square >= 0 && square <= 2))
            			{
            				square += 6;
            				cell += 7;
            			}
            			else if ((cell == 2) && (square == 0 || square == 1))
            			{
            				square += 7;
            				cell = 6;
            			}
            			//Do we need to go up to the above square?
            			else if(cell <= 2 && square >= 3)
            			{
            				square -= 3;
            				cell += 6;
            			}
            			//Otherwise just go up into the above cell
            			else
            			{
            				cell -= 3;
            			}
            			break;
                        case 68:
            		case 39: //right
            			//Do we need to wrap back to the first square?
            			//(Remove if wrap round not required)
            			if(square == 8 && cell == 8)
            			{
            				square = 0;
            				cell = 0;
            			}
            			//Do we need to drop to drop down from squares 2 or 5? (zero indexed)
            			else if(((square == 2) || (square == 5)) && (cell == 8))
            			{
            				square++;
            				cell = 0;
            			}
            			//Do we need to drop down to the next row?
            			else if(((square + 1) % 3 == 0) && (square != 0) && ((cell+1) % 3 == 0))
            			{
            				square-=2;
            				cell++;
            			}
            			//Do we need to cross into the next square to the right?
            			else if((cell + 1) % 3 == 0 && cell != 0)
            			{
            				square++;
            				cell-=2;
            			} 
            			//Otherwise, just move the selected cell one cell to the right
            			else 
            			{
            				cell++;	
            			}
            		default: 
            		break;
            	}
            	//Update the viewmodel data
            	if(key != undefined) // A number key was pressed so update the board if necessary
            	{
            		if(sender.viewModel.Squares()[square].Cells()[cell].IsEditable())
            		{
            			sender.viewModel.Squares()[square].Cells()[cell].CurrentValue(key);
						sender.viewModel.Squares()[square].Cells()[cell].CurrentValue.valueHasMutated();
            		}
            	}
            	sender.viewModel.Squares()[originallySelectedSquare].Cells()[originallySelectedCell].IsSelected(false);
            	sender.viewModel.Squares()[square].Cells()[cell].IsSelected(true);	
            }
        });
	};
	
	var getCell = function(square,cell) { 
		return sender.viewModel.Squares()[square].Cells()[cell].CurrentValue();
	};
	
	var boardIsValid = function() {
		return (validateRows() && validateCols());	
	};
	
	var validateCols = function() {
		var colsValid = true;
		for(var i=0; i<9; i++)
		{
			var col = getColArray(i);		
			var available = new Array(1,2,3,4,5,6,7,8,9);
			for(var j=0; j<9; j++)
			{
				if(col[j] != "")
				{
					var check = available.indexOf(col[j]);
					if(check == -1) //value already used
					{		
						//Make sure we highlight the duplicate that the user entered
						//and not one that was already there
						if(sender.viewModel.Squares()[i].Cells()[j].IsEditable())
						{
							//The duplicate was entered by the user...go ahead and mark it as invalid
							sender.viewModel.Squares()[i].Cells()[j].IsValid(false);
							colsValid = false;
						} else {
							//This was an original value...so need to find where the user entered duplicate is
							var index = col.indexOf(col[j]);
							sender.viewModel.Squares()[i].Cells()[index].IsValid(false);
							colsValid = false;
						}	
					} else 
					{
						//Cell appears to be valid...so remove it from the remaining values for this column
						available.splice(check, 1);	
					}
				} else {
					//Cell is empty so implicitly invalid
					sender.viewModel.Squares()[i].Cells()[j].IsValid(false);
					colsValid = false;
				}
			}
		}
		return colsValid;
	};
	
	var validateRows = function() {
		var rowsValid = true;
		for(var i=0; i<9; i++)
		{
			var row = getRowArray(i);		
			var available = new Array(1,2,3,4,5,6,7,8,9);
			for(var j=0; j<9; j++)
			{
				if(row[j] != "")
				{
					var check = available.indexOf(row[j]);
					if(check == -1) //value already used
					{		
						//Make sure we highlight the duplicate that the user entered
						//and not one that was already there
						if(sender.viewModel.Squares()[i].Cells()[j].IsEditable())
						{
							//The duplicate was entered by the user...go ahead and mark it as invalid
							sender.viewModel.Squares()[i].Cells()[j].IsValid(false);
							rowsValid = false;
						} else {
							//This was an original value...so need to find where the user entered duplicate is
							var index = row.indexOf(row[j]);
							sender.viewModel.Squares()[i].Cells()[index].IsValid(false);
							rowsValid = false;
						}	
					} else 
					{
						//Cell appears to be valid...so remove it from the remaining values for this row
						available.splice(check, 1);	
					}
				} else {
					//Cell is empty so implicitly invalid
					sender.viewModel.Squares()[i].Cells()[j].IsValid(false);
					rowsValid = false;
				}
			}	
		}
		return rowsValid;
	};
	
	var getColArray = function(requiredIndex) {
		//If requiredIndex is supplied, then return the required column.
		//Otherwise, return the currently selected column
		var currentSelection = sender.viewModel.GetCurrentSelection();
		var index = requiredIndex != undefined ? requiredIndex : sender.viewModel.Squares()[currentSelection.square].Cells()[currentSelection.cell].ColIndex();
		switch(index)
		{
			case 0:
				return new Array(getCell(0,0), getCell(0,3), getCell(0,6), getCell(3,0), getCell(3,3), getCell(3,6), getCell(6,0), getCell(6,3), getCell(6,6));
				break;	
			case 1:
				return new Array(getCell(0,1), getCell(0,4), getCell(0,7), getCell(3,1), getCell(3,4), getCell(3,7), getCell(6,1), getCell(6,4), getCell(6,7));
				break;
			case 2:
				return new Array(getCell(0,2), getCell(0,5), getCell(0,8), getCell(3,2), getCell(3,5), getCell(3,8), getCell(6,2), getCell(6,5), getCell(6,8));
				break;
			case 3:
				return new Array(getCell(1,0), getCell(1,3), getCell(1,6), getCell(4,0), getCell(4,3), getCell(4,6), getCell(7,0), getCell(7,3), getCell(7,6));
				break;
			case 4:
				return new Array(getCell(1,1), getCell(1,4), getCell(1,7), getCell(4,1), getCell(4,4), getCell(4,7), getCell(7,1), getCell(7,4), getCell(7,7));
				break;
			case 5:
				return new Array(getCell(1,2), getCell(1,5), getCell(1,8), getCell(4,2), getCell(4,5), getCell(4,8), getCell(7,2), getCell(7,5), getCell(7,8));
				break;
			case 6:
				return new Array(getCell(2,0), getCell(2,3), getCell(2,6), getCell(5,0), getCell(5,3), getCell(5,6), getCell(8,0), getCell(8,3), getCell(8,6));
				break;
			case 7:
				return new Array(getCell(2,1), getCell(2,4), getCell(2,7), getCell(5,1), getCell(5,4), getCell(5,7), getCell(8,1), getCell(8,4), getCell(8,7));
				break;
			case 8:
				return new Array(getCell(2,2), getCell(2,5), getCell(2,8), getCell(5,2), getCell(5,5), getCell(5,8), getCell(8,2), getCell(8,5), getCell(8,8));
				break;		
		}
	};
	
	var getRowArray = function(requiredIndex) {
		//If requiredIndex is supplied, then return the required row.
		//Otherwise, return the currently selected row
        var currentSelection = sender.viewModel.GetCurrentSelection();
        var index = requiredIndex != undefined ? requiredIndex : sender.viewModel.Squares()[currentSelection.square].Cells()[currentSelection.cell].RowIndex();
		switch(index)
		{
			case 0:
				return new Array(getCell(0,0), getCell(0,1), getCell(0,2), getCell(1,0), getCell(1,1), getCell(1,2), getCell(2,0), getCell(2,1), getCell(2,2));
				break;
			case 1:
				return new Array(getCell(0,3), getCell(0,4), getCell(0,5), getCell(1,3), getCell(1,4), getCell(1,5), getCell(2,3), getCell(2,4), getCell(2,5));
				break;
			case 2:
				return new Array(getCell(0,6), getCell(0,7), getCell(0,8), getCell(1,6), getCell(1,7), getCell(1,8), getCell(2,6), getCell(2,7), getCell(2,8));
				break;
			case 3:
				return new Array(getCell(3,0), getCell(3,1), getCell(3,2), getCell(4,0), getCell(4,1), getCell(4,2), getCell(5,0), getCell(5,1), getCell(5,2));
				break;
			case 4:
				return new Array(getCell(3,3), getCell(3,4), getCell(3,5), getCell(4,3), getCell(4,4), getCell(4,5), getCell(5,3), getCell(5,4), getCell(5,5));
				break;
			case 5:
				return new Array(getCell(3,6), getCell(3,7), getCell(3,8), getCell(4,6), getCell(4,7), getCell(4,8), getCell(5,6), getCell(5,7), getCell(5,8));
				break;
			case 6:
				return new Array(getCell(6,0), getCell(6,1), getCell(6,2), getCell(7,0), getCell(7,1), getCell(7,2), getCell(8,0), getCell(8,1), getCell(8,2));
				break;
			case 7:
				return new Array(getCell(6,3), getCell(6,4), getCell(6,5), getCell(7,3), getCell(7,4), getCell(7,5), getCell(8,3), getCell(8,4), getCell(8,5));
				break;
			case 8:
				return new Array(getCell(6,6), getCell(6,7), getCell(6,8), getCell(7,6), getCell(7,7), getCell(7,8), getCell(8,6), getCell(8,7), getCell(8,8));
				break;
		}
	};

	var init = new function() {
        sender.viewModel = new SudokuViewModel();
        ko.applyBindings(sender.viewModel);
		initSudokuControls();
	};
};
