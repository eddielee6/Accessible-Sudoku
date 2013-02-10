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
            	sender.viewModel.Squares()[square].Cells()[cell].IsSelected(false);
            	var key;
            	switch(evt.which)
            	{
            		// a number key was pressed
            		case 96:
            			key = "";
            			break;
            		case 97:
            			key = 1;
            			break;
            		case 98:
            			key = 2;
            			break;
            		case 99:
            			key = 3;
            			break;
            		case 100:
            			key = 4;
            			break;
            		case 101:
            			key = 5;
            			break;
            		case 102:
            			key = 6;
            			break;
            		case 103:
            			key = 7;
            			break;
            		case 104:
            			key = 8;
            			break;
            		case 105:
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
            				//sender.viewModel.CurrentSelection.square = sender.viewModel.CurrentSelection.cell = 0;
            			}
            			//Do we need to go into the next row of squares
            			else if((square == 6 || square == 7) && (cell == 8))
            			{
            				cell = 0;
            				square -= 5;
            				//sender.viewModel.CurrentSelection.square -= 5;
            				//sender.viewModel.CurrentSelection.cell = 0;
            			}
            			//Do we need to go back up to the next row? (not requiring a change into the next row of squares)
            			else if((square >= 6 && square <= 8) && (cell == 6 || cell == 7))
            			{
            				square -= 6;
            				cell -= 5;
            				//sender.viewModel.CurrentSelection.square -= 6;
            				//sender.viewModel.CurrentSelection.cell -= 5;	
            			}
            			//Do we need to go down into the square below?
            		 	else if(cell >= 6 && square <= 6)
            		 	{
            		 		cell -= 6;
            		 		square += 3;
            		 		//sender.viewModel.CurrentSelection.square += 3;
            				//sender.viewModel.CurrentSelection.cell -= 6;
            		 	}
            		 	//Otherwise, just move to the next cell below
            		 	else
            		 	{
            		 		cell += 3;
            		 		//sender.viewModel.CurrentSelection.cell += 3;
            		 	}
            			break;
                        case 65:
            		case 37: //left
            			if(square == 0 && cell == 0)
            			{
            				square = 8;
            				cell = 8;
            				//sender.viewModel.CurrentSelection.square = 8;
            				//sender.viewModel.CurrentSelection.cell = 8;	
            			}
            			//Do we need to move up from square 3 or 6? (zero indexed)
            			else if(((square == 6) || (square == 3)) && (cell == 0))
            			{
            				square--;
            				cell = 8;
            				//sender.viewModel.CurrentSelection.square--;
            				//sender.viewModel.CurrentSelection.cell = 8;
            			}
            			//Do we need to move up a row?
            			else if((square % 3 == 0) && (cell % 3 == 0))
            			{
            				square+=2;
            				cell--;
            				//sender.viewModel.CurrentSelection.square+=2;
            				//sender.viewModel.CurrentSelection.cell--;
            			}
            			//Do we need to move into the left adjacent box?
            			else if(cell % 3 == 0)
            			{
            				square--;
            				cell+=2;
            				//sender.viewModel.CurrentSelection.square--;
            				//sender.viewModel.CurrentSelection.cell +=2;
            			} 
            			//otherwise, just move the selected cell one cell to the left
            			else 
            			{
            				cell--;
            				//sender.viewModel.CurrentSelection.cell--;
            			}
            			break;
                        case 87:
            		case 38: //up
            			if(cell == 2 && square == 2)
            			{
            				square = 6;
            				cell = 6;
            				//sender.viewModel.CurrentSelection.square = 6;
            				//sender.viewModel.CurrentSelection.cell = 6;
            			}
            			//Do we need to go into the next row?
            			else if((cell == 0 || cell == 1) && (square >= 0 && square <= 2))
            			{
            				square += 6;
            				cell += 7;
            				//sender.viewModel.CurrentSelection.square +=6;
            				//sender.viewModel.CurrentSelection.cell += 7;
            			}
            			else if ((cell == 2) && (square == 0 || square == 1))
            			{
            				square += 7;
            				cell = 6;
            				//sender.viewModel.CurrentSelection.square += 7;
            				//sender.viewModel.CurrentSelection.cell = 6;
            			}
            			//Do we need to go up to the above square?
            			else if(cell <= 2 && square >= 3)
            			{
            				square -= 3;
            				cell += 6;
            				//sender.viewModel.CurrentSelection.square -= 3;
            				//sender.viewModel.CurrentSelection.cell += 6;
            			}
            			//Otherwise just go up into the above cell
            			else
            			{
            				cell -= 3;
            				//sender.viewModel.CurrentSelection.cell -= 3;	
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
            				//sender.viewModel.CurrentSelection.square = 0;
            				//sender.viewModel.CurrentSelection.cell = 0;
            			}
            			//Do we need to drop to drop down from squares 2 or 5? (zero indexed)
            			else if(((square == 2) || (square == 5)) && (cell == 8))
            			{
            				square++;
            				cell = 0;
            				//sender.viewModel.CurrentSelection.square++;
            				//sender.viewModel.CurrentSelection.cell = 0;
            			}
            			//Do we need to drop down to the next row?
            			else if(((square + 1) % 3 == 0) && (square != 0) && ((cell+1) % 3 == 0))
            			{
            				square-=2;
            				cell++;
            				//sender.viewModel.CurrentSelection.square-=2;
            				//sender.viewModel.CurrentSelection.cell++;
            			}
            			//Do we need to cross into the next square to the right?
            			else if((cell + 1) % 3 == 0 && cell != 0)
            			{
            				square++;
            				cell-=2;
            				//sender.viewModel.CurrentSelection.square++;
            				//sender.viewModel.CurrentSelection.cell -=2;
            			} 
            			//Otherwise, just move the selected cell one cell to the right
            			else 
            			{
            				cell++;
            				//sender.viewModel.CurrentSelection.cell++;		
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
            	sender.viewModel.Squares()[square].Cells()[cell].IsSelected(true);	
            }
        });
	};
	
	var cell = function(square,cell) {
		return sender.viewModel.Squares[square].Cells[cell].CurrentValue;
	};
	
	var getColArray = function() {
		var currentSelection = sender.viewModel.GetCurrentSelection();
            var square = currentSelection.square;
            var cell = currentSelection.cell;
		switch(sender.viewModel.Squares()[square].Cells()[cell].ColIndex())
		{
			case 0:
				return new Array(cell(0,0), cell(0,3), cell(0,6), cell(3,0), cell(3,3), cell(3,6), cell(6,0), cell(6,3), cell(6,6));
				break;	
			case 1:
				return new Array(cell(0,1), cell(0,4), cell(0,7), cell(3,1), cell(3,4), cell(3,7), cell(6,1), cell(6,4), cell(6,7));
				break;
			case 2:
				return new Array(cell(0,2), cell(0,5), cell(0,8), cell(3,2), cell(3,5), cell(3,8), cell(6,2), cell(6,5), cell(6,8));
				break;
			case 3:
				return new Array(cell(1,0), cell(1,3), cell(1,6), cell(4,0), cell(4,3), cell(4,6), cell(7,0), cell(7,3), cell(7,6));
				break;
			case 4:
				return new Array(cell(1,1), cell(1,4), cell(1,7), cell(4,1), cell(4,4), cell(4,7), cell(7,1), cell(7,4), cell(7,7));
				break;
			case 5:
				return new Array(cell(1,2), cell(1,5), cell(1,8), cell(4,2), cell(4,5), cell(4,8), cell(7,2), cell(7,5), cell(7,8));
				break;
			case 6:
				return new Array(cell(2,0), cell(2,3), cell(2,6), cell(5,0), cell(5,3), cell(5,6), cell(8,0), cell(8,3), cell(8,6));
				break;
			case 7:
				return new Array(cell(2,1), cell(2,4), cell(2,7), cell(5,1), cell(5,4), cell(5,7), cell(8,1), cell(8,4), cell(8,7));
				break;
			case 8:
				return new Array(cell(2,2), cell(2,5), cell(2,8), cell(5,2), cell(5,5), cell(5,8), cell(8,2), cell(8,5), cell(8,8));
				break;	
				
		}
	};
	
	var getRowArray = function() {
            var currentSelection = sender.viewModel.GetCurrentSelection();
		var square = currentSelection.square;
		var cell = currentSelection.cell;
		switch(sender.viewModel.Squares()[square].Cells()[cell].RowIndex()) //isnt square always equal to RowIndex()
		{
			case 0:
				return new Array(cell(0,0), cell(0,1), cell(0,2), cell(1,0), cell(1,1), cell(1,2), cell(2,0), cell(2,1), cell(2,2));
				break;
			case 1:
				return new Array(cell(0,3), cell(0,4), cell(0,5), cell(1,3), cell(1,4), cell(1,5), cell(2,3), cell(2,4), cell(2,5));
				break;
			case 2:
				return new Array(cell(0,6), cell(0,7), cell(0,8), cell(1,6), cell(1,7), cell(1,8), cell(2,6), cell(2,7), cell(2,8));
				break;
			case 3:
				return new Array(cell(3,0), cell(3,1), cell(3,2), cell(4,0), cell(4,1), cell(4,2), cell(5,0), cell(5,1), cell(5,2));
				break;
			case 4:
				return new Array(cell(3,3), cell(3,4), cell(3,5), cell(4,3), cell(4,4), cell(4,5), cell(5,3), cell(5,4), cell(5,5));
				break;
			case 5:
				return new Array(cell(3,6), cell(3,7), cell(3,8), cell(4,6), cell(4,7), cell(4,8), cell(5,6), cell(5,7), cell(5,8));
				break;
			case 6:
				return new Array(cell(6,0), cell(6,1), cell(6,2), cell(7,0), cell(7,1), cell(7,2), cell(8,0), cell(8,1), cell(8,2));
				break;
			case 7:
				return new Array(cell(6,3), cell(6,4), cell(6,5), cell(7,3), cell(7,4), cell(7,5), cell(8,3), cell(8,4), cell(8,5));
				break;
			case 8:
				return new Array(cell(6,6), cell(6,7), cell(6,8), cell(7,6), cell(7,7), cell(7,8), cell(8,6), cell(8,7), cell(8,8));
				break;
		}
	};

	var init = new function() {
            sender.viewModel = new SudokuViewModel();
            ko.applyBindings(sender.viewModel);
		initSudokuControls();
	};
};
