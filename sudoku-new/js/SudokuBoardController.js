SudokuBoardController = function(_voiceOverManager) {
	var sender = this;
	var localStorage = new LocalStorageRepository();
	var gameGenerator = new Generator();
	var voiceOverManager = _voiceOverManager;
	this.viewModel;

	var initSudokuControls = function() {
            var waitTimeout;
            var fadeTimeout;
            var showBoardValidation = function() {
                  boardIsValid();
                  clearTimeout(waitTimeout);
                  clearTimeout(fadeTimeout);
                  $(".valid, .invalid, .fadeOut").removeClass("valid, invalid fadeOut");
                  $(".gameGrid .markAsInvalid").addClass("invalid");
                  $(".gameGrid .markAsValid").addClass("valid");
                  waitTimeout = setTimeout(function() {
                        $(".gameGrid .invalid").addClass("fadeOut");
                        $(".gameGrid .valid").addClass("fadeOut");
                        fadeTimeout = setTimeout(function() {
                              $(".gameGrid .invalid").removeClass("invalid fadeOut");
                              $(".gameGrid .valid").removeClass("valid fadeOut");
                        }, 1000);
                  }, 4000);
            };

            var getHint = function() {
                  if(sender.viewModel.AvailableHints() > 0) {
                        sender.viewModel.AvailableHints(sender.viewModel.AvailableHints() - 1);
                        boardIsValid();
                        var cellsChecked = 0;
                        while(cellsChecked < 81) {
                              var randomCell = sender.viewModel.Squares()[Math.floor(Math.random() * 9)].Cells()[Math.floor(Math.random() * 9)];
                              if(!randomCell.IsValid() && randomCell.IsEditable()) {
                                    randomCell.CurrentValue(randomCell.SolutionValue());
                                    randomCell.OriginalValue(randomCell.SolutionValue());
                                    sender.viewModel.NeedsSave(true);
                                    return true;
                              }
                              cellsChecked++;
                        }
                  }
            };

            //Menu bar
            $(".controls .button").click(function() {
                  if ($("#gameScreen").is(":visible")) {
                        switch($(this).attr("data-action")) {
                              case "validate":
                                    if(sender.viewModel.IsComplete()) return;
                                    showBoardValidation();
                                    break;
                              case "hint":
                                    if(sender.viewModel.IsComplete()) return;
                                    getHint();
                                    break;
                              case "newGame":
                                    sender.StartGame({
                                          existingGame: null,
                                          difficulty: $("html").attr("data-difficulty")
                                    });
                                    break;
                        }
                  }
            });

            //InputDigitPad Reset
            $(window).click(function(evt) {
                  sender.viewModel.HideInputPad();
            });

            //Keyboard input
		$(window).keydown(function(evt) {
			if ($("#gameScreen").is(":visible")) {
				var currentSelection = sender.viewModel.GetSelectedCell();
				var square = currentSelection.square;
				var cell = currentSelection.cell;

				var validationTimeout;
				var hintTimeOut;
				var newGameTimeOut;

				var handled = true;
				switch(keyCodeToAction(evt.which)) {
					//Validation
					case "v":
						if(sender.viewModel.IsComplete()) return;
                                    showBoardValidation();
                                    $(".validateButton").addClass("pressed");
                                    validationTimeout = setTimeout(function() {
                                    	$(".validateButton").removeClass("pressed");
                                    }, 150);
						break;

					case "h":
						if(sender.viewModel.IsComplete()) return;
                                    if(getHint()) {
	                                    $(".hintButton").addClass("pressed");
	                                    hintTimeOut = setTimeout(function() {
	                                    	$(".hintButton").removeClass("pressed");
	                                    }, 150);
	                              }
						break;

					case "n":
                                    sender.StartGame({
                                          existingGame: null,
                                          difficulty: $("html").attr("data-difficulty")
                                    });
                                    $(".newGameButton").addClass("pressed");
                                    newGameTimeOut = setTimeout(function() {
                                    	$(".newGameButton").removeClass("pressed");
                                    }, 150);
						break;

                              //Digit input
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7":
					case "8":
					case "9":
						if(sender.viewModel.IsComplete()) return;
						sender.viewModel.SetCellValue(square, cell, keyCodeToAction(evt.which));
						break;

                              case "delete":
                              	if(sender.viewModel.IsComplete()) return;
                                    sender.viewModel.SetCellValue(square, cell, "");
                                    break;

					//MOVEMENT LOGIC
					case "down":
						if(sender.viewModel.IsComplete()) return;
						//Wrap back to the first square
						//(Remove if wrap round not required)
						if (square == 8 && cell == 8) {
							square = cell = 0;
						}
						//Do we need to go into the next row of squares
						else if ((square == 6 || square == 7) && (cell == 8)) {
							cell = 0;
							square -= 5;
						}
						//Do we need to go back up to the next row? (not requiring a change into the next row of squares)
						else if ((square >= 6 && square <= 8) && (cell == 6 || cell == 7)) {
							square -= 6;
							cell -= 5;
						}
						//Do we need to go down into the square below?
						else if (cell >= 6 && square <= 6) {
							cell -= 6;
							square += 3;
						}
						//Otherwise, just move to the next cell below
						else {
							cell += 3;
						}
						break;
					case "left":
						if(sender.viewModel.IsComplete()) return;
						if (square == 0 && cell == 0) {
							square = 8;
							cell = 8;
						}
						//Do we need to move up from square 3 or 6? (zero indexed)
						else if (((square == 6) || (square == 3)) && (cell == 0)) {
							square--;
							cell = 8;
						}
						//Do we need to move up a row?
						else if ((square % 3 == 0) && (cell % 3 == 0)) {
							square += 2;
							cell--;
						}
						//Do we need to move into the left adjacent box?
						else if (cell % 3 == 0) {
							square--;
							cell += 2;
						}
						//otherwise, just move the selected cell one cell to the left
						else {
							cell--;
						}
						break;
					case "up":
						if(sender.viewModel.IsComplete()) return;
						if (cell == 2 && square == 2) {
							square = 6;
							cell = 6;
						}
						//Do we need to go into the next row?
						else if ((cell == 0 || cell == 1) && (square >= 0 && square <= 2)) {
							square += 6;
							cell += 7;
						} else if ((cell == 2) && (square == 0 || square == 1)) {
							square += 7;
							cell = 6;
						}
						//Do we need to go up to the above square?
						else if (cell <= 2 && square >= 3) {
							square -= 3;
							cell += 6;
						}
						//Otherwise just go up into the above cell
						else {
							cell -= 3;
						}
						break;
					case "right":
						if(sender.viewModel.IsComplete()) return;
						//Do we need to wrap back to the first square?
						//(Remove if wrap round not required)
						if (square == 8 && cell == 8) {
							square = 0;
							cell = 0;
						}
						//Do we need to drop to drop down from squares 2 or 5? (zero indexed)
						else if (((square == 2) || (square == 5)) && (cell == 8)) {
							square++;
							cell = 0;
						}
						//Do we need to drop down to the next row?
						else if (((square + 1) % 3 == 0) && (square != 0) && ((cell + 1) % 3 == 0)) {
							square -= 2;
							cell++;
						}
						//Do we need to cross into the next square to the right?
						else if ((cell + 1) % 3 == 0 && cell != 0) {
							square++;
							cell -= 2;
						}
						//Otherwise, just move the selected cell one cell to the right
						else {
							cell++;
						}
					default:
						if(sender.viewModel.IsComplete()) return;
						handled = false;
						break;
				}

				sender.viewModel.SetSelectedCell(square, cell);

				if (handled) {
					evt.preventDefault();
				}
			}
		});
	};

	var getCell = function(square, cell) {
		return sender.viewModel.Squares()[square].Cells()[cell].CurrentValue();
	};

	var boardIsValid = function() {
		var rows = validateRows();
		var cols = validateCols();
		var squares = validateSquares();
		if (rows == true && cols == true && squares == true)
			return true;
		else
			return false;
	};
	
	var getSquareFromRowIndex = function(rowIndex, colIndex) {
		if(colIndex <= 2)
		{
			if(rowIndex <= 2)
				 return 0;	
			if(rowIndex >= 3 && rowIndex <=5)
				return 3;	
			if(rowIndex >= 6)
				return 6;	
		}
		if(colIndex >=3 && colIndex <=5)
		{
			if(rowIndex <= 2)
				 return 1;	
			if(rowIndex >= 3 && rowIndex <=5)
				return 4;	
			if(rowIndex >= 6)
				return 7;	
		}
		if(colIndex >=6)
		{
			if(rowIndex <= 2)
				 return 2;	
			if(rowIndex >= 3 && rowIndex <=5)
				return 5;	
			if(rowIndex >= 6)
				return 8;	
		}	
	};
	
	var getCellFromRowIndex = function(rowIndex, colIndex)
	{
		if(rowIndex == 0 || rowIndex == 3 || rowIndex == 6)
		{
			if(colIndex == 0 || colIndex == 3 || colIndex == 6)
				return 0;
			if(colIndex == 1 || colIndex == 4 || colIndex == 7)
				return 1;
			if(colIndex == 2 || colIndex == 5 || colIndex == 8)
				return 2;
		}
		if(rowIndex == 1 || rowIndex == 4 || rowIndex == 7)
		{
			if(colIndex == 0 || colIndex == 3 || colIndex == 6)
				return 3;
			if(colIndex == 1 || colIndex == 4 || colIndex == 7)
				return 4;
			if(colIndex == 2 || colIndex == 5 || colIndex == 8)
				return 5;
		}
		if(rowIndex == 2 || rowIndex == 5 || rowIndex == 8)
		{
			if(colIndex == 0 || colIndex == 3 || colIndex == 6)
				return 6;
			if(colIndex == 1 || colIndex == 4 || colIndex == 7)
				return 7;
			if(colIndex == 2 || colIndex == 5 || colIndex == 8)
				return 8;
		}
	};

	var validateCols = function() {
		var colsValid = true;
		for (var i = 0; i < 9; i++) {
			var col = getColArray(i);
			var available = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
			for (var j = 0; j < 9; j++) {
				if (col[j] != "") {
					var check = available.indexOf(col[j]);
					if (check == -1)//value already used
					{
						//Make sure we highlight the duplicate that the user entered
						//and not one that was already there
						var square = getSquareFromRowIndex(j,i);
						var cell = getCellFromRowIndex(j,i);
						if (sender.viewModel.Squares()[square].Cells()[cell].IsEditable()) {
							//The duplicate was entered by the user...go ahead and mark it as invalid
							sender.viewModel.Squares()[square].Cells()[cell].IsValid(false);
							colsValid = false;
						} else {
							//This was an original value...so need to find where the user entered duplicate is
							var index = col.indexOf(col[j]); //will refer to the row
							var square = getSquareFromRowIndex(index,i);
							var cell = getCellFromRowIndex(index,i);
							sender.viewModel.Squares()[square].Cells()[cell].IsValid(false);
							colsValid = false;
						}
					} else {
						//Cell appears to be valid...so remove it from the remaining values for this column
						available.splice(check, 1);
					}
				} else {
					//Cell is empty so implicitly invalid
					var square = getSquareFromRowIndex(j,i);
					var cell = getCellFromRowIndex(j,i);
					sender.viewModel.Squares()[square].Cells()[cell].IsValid(false);
					colsValid = false;
				}
			}
		}
		return colsValid;
	};
	
	var getSquareCellIndex = function(square, value) {
		for(var i=0; i<9; i++)
		{
			if(sender.viewModel.Squares()[square].Cells()[i].CurrentValue() == value)	
				return i;
		}
		return -1;
	};
	
	var validateSquares = function() {
		var squaresValid = true;
		var invalidValues = new Array();
		for(var i=0; i<9; i++)
		{
			var valid = true;
			var available = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
			for(var j=0; j<9; j++)
			{
				if(sender.viewModel.Squares()[i].Cells()[j].CurrentValue() != "")
				{
					var check = available.indexOf(sender.viewModel.Squares()[i].Cells()[j].CurrentValue());
					if(check == -1)
					{
						var value = sender.viewModel.Squares()[i].Cells()[j].CurrentValue();
						valid = squaresValid = false;
						invalidValues.push(value);
						
						if(sender.viewModel.Squares()[i].Cells()[j].IsEditable())
						{
							sender.viewModel.Squares()[i].Cells()[j].IsValid(false);							
						}
						else
						{
							var index = getSquareCellIndex(i, value);
							sender.viewModel.Squares()[i].Cells()[index].IsValid(false);
						}
					}
					else 
					{
						//Cell appears to be valid...so remove it from the remaining values for this row
						available.splice(check, 1);
					}
				}
			}
			if(!valid)
			{
				//Ensure all cells containing invalid values are treated as invalid
				for(var k=0; k<invalidValues.length; k++)
				{
					for(var m=0; m<9; m++)
					{
						if(sender.viewModel.Squares()[i].Cells()[m].CurrentValue() == invalidValues[k])
							sender.viewModel.Squares()[i].Cells()[m].IsValid(false);
					}	
				}
			}
		}
		return squaresValid;
	};

	var validateRows = function() {
		var rowsValid = true;
		for (var i = 0; i < 9; i++) {
			var row = getRowArray(i);
			var available = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9");
			for (var j = 0; j < 9; j++) {
				if (row[j] != "") {
					var check = available.indexOf(row[j]);
					if (check == -1)//value already used
					{
						//Make sure we highlight the duplicate that the user entered
						//and not one that was already there
						var square = getSquareFromRowIndex(i, j);
						var cell = getCellFromRowIndex(i, j);
						if (sender.viewModel.Squares()[square].Cells()[cell].IsEditable()) {
							//The duplicate was entered by the user...go ahead and mark it as invalid
							sender.viewModel.Squares()[square].Cells()[cell].IsValid(false);
							rowsValid = false;
						} else {
							//This was an original value...so need to find where the user entered duplicate is
							var index = row.indexOf(row[j]); //Wil refer to the column
							var square = getSquareFromRowIndex(i, index);
							var cell = getCellFromRowIndex(i, index);
							sender.viewModel.Squares()[square].Cells()[cell].IsValid(false);
							rowsValid = false;
						}
					} else {
						//Cell appears to be valid...so remove it from the remaining values for this row
						available.splice(check, 1);
					}
				} else {
					//Cell is empty so implicitly invalid
					var square = getSquareFromRowIndex(i, j);
					var cell = getCellFromRowIndex(i, j);
					sender.viewModel.Squares()[square].Cells()[cell].IsValid(false);
					rowsValid = false;
				}
			}
		}
		return rowsValid;
	};

	var getColArray = function(requiredIndex) {
		//If requiredIndex is supplied, then return the required column.
		//Otherwise, return the currently selected column
		var currentSelection = sender.viewModel.GetSelectedCell();
		var index = requiredIndex != undefined ? requiredIndex : sender.viewModel.Squares()[currentSelection.square].Cells()[currentSelection.cell].ColIndex();
		switch(index) {
			case 0:
				return new Array(getCell(0, 0), getCell(0, 3), getCell(0, 6), getCell(3, 0), getCell(3, 3), getCell(3, 6), getCell(6, 0), getCell(6, 3), getCell(6, 6));
				break;
			case 1:
				return new Array(getCell(0, 1), getCell(0, 4), getCell(0, 7), getCell(3, 1), getCell(3, 4), getCell(3, 7), getCell(6, 1), getCell(6, 4), getCell(6, 7));
				break;
			case 2:
				return new Array(getCell(0, 2), getCell(0, 5), getCell(0, 8), getCell(3, 2), getCell(3, 5), getCell(3, 8), getCell(6, 2), getCell(6, 5), getCell(6, 8));
				break;
			case 3:
				return new Array(getCell(1, 0), getCell(1, 3), getCell(1, 6), getCell(4, 0), getCell(4, 3), getCell(4, 6), getCell(7, 0), getCell(7, 3), getCell(7, 6));
				break;
			case 4:
				return new Array(getCell(1, 1), getCell(1, 4), getCell(1, 7), getCell(4, 1), getCell(4, 4), getCell(4, 7), getCell(7, 1), getCell(7, 4), getCell(7, 7));
				break;
			case 5:
				return new Array(getCell(1, 2), getCell(1, 5), getCell(1, 8), getCell(4, 2), getCell(4, 5), getCell(4, 8), getCell(7, 2), getCell(7, 5), getCell(7, 8));
				break;
			case 6:
				return new Array(getCell(2, 0), getCell(2, 3), getCell(2, 6), getCell(5, 0), getCell(5, 3), getCell(5, 6), getCell(8, 0), getCell(8, 3), getCell(8, 6));
				break;
			case 7:
				return new Array(getCell(2, 1), getCell(2, 4), getCell(2, 7), getCell(5, 1), getCell(5, 4), getCell(5, 7), getCell(8, 1), getCell(8, 4), getCell(8, 7));
				break;
			case 8:
				return new Array(getCell(2, 2), getCell(2, 5), getCell(2, 8), getCell(5, 2), getCell(5, 5), getCell(5, 8), getCell(8, 2), getCell(8, 5), getCell(8, 8));
				break;
		}
	};

	var getRowArray = function(requiredIndex) {
		//If requiredIndex is supplied, then return the required row.
		//Otherwise, return the currently selected row
		var currentSelection = sender.viewModel.GetSelectedCell();
		var index = requiredIndex != undefined ? requiredIndex : sender.viewModel.Squares()[currentSelection.square].Cells()[currentSelection.cell].RowIndex();
		switch(index) {
			case 0:
				return new Array(getCell(0, 0), getCell(0, 1), getCell(0, 2), getCell(1, 0), getCell(1, 1), getCell(1, 2), getCell(2, 0), getCell(2, 1), getCell(2, 2));
				break;
			case 1:
				return new Array(getCell(0, 3), getCell(0, 4), getCell(0, 5), getCell(1, 3), getCell(1, 4), getCell(1, 5), getCell(2, 3), getCell(2, 4), getCell(2, 5));
				break;
			case 2:
				return new Array(getCell(0, 6), getCell(0, 7), getCell(0, 8), getCell(1, 6), getCell(1, 7), getCell(1, 8), getCell(2, 6), getCell(2, 7), getCell(2, 8));
				break;
			case 3:
				return new Array(getCell(3, 0), getCell(3, 1), getCell(3, 2), getCell(4, 0), getCell(4, 1), getCell(4, 2), getCell(5, 0), getCell(5, 1), getCell(5, 2));
				break;
			case 4:
				return new Array(getCell(3, 3), getCell(3, 4), getCell(3, 5), getCell(4, 3), getCell(4, 4), getCell(4, 5), getCell(5, 3), getCell(5, 4), getCell(5, 5));
				break;
			case 5:
				return new Array(getCell(3, 6), getCell(3, 7), getCell(3, 8), getCell(4, 6), getCell(4, 7), getCell(4, 8), getCell(5, 6), getCell(5, 7), getCell(5, 8));
				break;
			case 6:
				return new Array(getCell(6, 0), getCell(6, 1), getCell(6, 2), getCell(7, 0), getCell(7, 1), getCell(7, 2), getCell(8, 0), getCell(8, 1), getCell(8, 2));
				break;
			case 7:
				return new Array(getCell(6, 3), getCell(6, 4), getCell(6, 5), getCell(7, 3), getCell(7, 4), getCell(7, 5), getCell(8, 3), getCell(8, 4), getCell(8, 5));
				break;
			case 8:
				return new Array(getCell(6, 6), getCell(6, 7), getCell(6, 8), getCell(7, 6), getCell(7, 7), getCell(7, 8), getCell(8, 6), getCell(8, 7), getCell(8, 8));
				break;
		}
	};

	var gameDataToJson = function(gameData) {
		return ko.mapping.toJSON(gameData);
	};

	this.StartGame = function(options) {
		if (options.existingGame) {
			var loadedGame = ko.mapping.fromJSON(options.existingGame, {
				'' : {
					create : function(options) {
						var sudokuViewModel = new SudokuViewModel();
                                    sudokuViewModel.AvailableHints(options.data.AvailableHints);
						sudokuViewModel.Difficulty(options.data.Difficulty);
						for (var squareIndex = 0; squareIndex < options.data.Squares.length; squareIndex++) {
							var squareViewModel = new SquareViewModel();
							for (var cellIndex = 0; cellIndex < options.data.Squares[squareIndex].Cells.length; cellIndex++) {
								var cellViewModel = new CellViewModel();
								cellViewModel.SolutionValue(options.data.Squares[squareIndex].Cells[cellIndex].SolutionValue);
								cellViewModel.OriginalValue(options.data.Squares[squareIndex].Cells[cellIndex].OriginalValue);
								cellViewModel.RowIndex(options.data.Squares[squareIndex].Cells[cellIndex].RowIndex);
								cellViewModel.ColIndex(options.data.Squares[squareIndex].Cells[cellIndex].ColIndex);
								cellViewModel.CurrentValue(options.data.Squares[squareIndex].Cells[cellIndex].CurrentValue);
								squareViewModel.Cells.push(cellViewModel);
							};
							sudokuViewModel.Squares.push(squareViewModel);
						};
						return sudokuViewModel;
					}
				}
			});
			sender.viewModel.Squares(loadedGame.Squares());
                  sender.viewModel.AvailableHints(loadedGame.AvailableHints());
                  sender.viewModel.Difficulty(loadedGame.Difficulty());
                  sender.viewModel.IsComplete(boardIsValid());
		} else {
			sender.viewModel.Squares(gameGenerator.GenerateNewGame(options.difficulty).Squares());
                  sender.viewModel.IsComplete(false);
                  sender.viewModel.AvailableHints(sender.viewModel.InitialHints);
                  sender.viewModel.Difficulty(options.difficulty);
			localStorage.SetValueForKey("gameSave", gameDataToJson(sender.viewModel));

			voiceOverManager.OutputMessage("New " + options.difficulty + " game");
		}
		sender.viewModel.SetSelectedCell(0, 0);

            sender.viewModel.NeedsSave.subscribe(function (needsSave) {
                  if(needsSave) {
                        localStorage.SetValueForKey("gameSave", gameDataToJson(sender.viewModel));
                        sender.viewModel.NeedsSave(false);

                        if(boardIsValid()) {
                              sender.viewModel.IsComplete(true);
                        }
                  }
            });
	};

	var init = new function() {
      	sender.viewModel = new SudokuViewModel();
      	ko.applyBindings(sender.viewModel);

      	initSudokuControls();
	};
};