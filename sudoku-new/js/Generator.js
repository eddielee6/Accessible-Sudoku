Generator = function() {
	
	var getAcrossFromNumber = function(n) {
		var k = n % 9;
		if (k==0)
			return 9;
		else return k;
	}
	
	var getDownFromNumber = function(n) {
		var k;
		if(getAcrossFromNumber(n) == 9)
			k = n / 9;
		else
			k = n / 9 + 1;
		
		k = (k * 10) / 10; //Rounding hack
		return k;
	}
	
	var getRegionFromNumber = function(n) {
		var k;
    	var a = getAcrossFromNumber(n);
    	var d = getDownFromNumber(n);

    	if (1 <= a && a < 4 && 1 <= d && d < 4)
     		k = 1;
		else if (4 <= a && a < 7 && 1 <= d && d < 4)
        	k = 2;
    	else if (7 <= a && a < 10 && 1 <= d && d < 4)
        	k = 3;
    	else if (1 <= a && a < 4 && 4 <= d && d < 7)
        	k = 4;
    	else if (4 <= a && a < 7 && 4 <= d && d < 7)
        	k = 5;
    	else if (7 <= a && a < 10 && 4 <= d && d < 7)
        	k = 6;
    	else if (1 <= a && a < 4 && 7 <= d && d < 10)
        	k = 7;
   		else if (4 <= a && a < 7 && 7 <= d && d < 10)
        	k = 8;
    	else if (7 <= a && a < 10 && 7 <= d && d < 10)
        	k = 9;
    	return k;
	}
	
	var item = function(n, v) {
		var square = new Square();
		square.row = Math.floor(n / 9);
		square.col = n % 9;
		n += 1;
		square.across = Math.floor(getAcrossFromNumber(n));
		square.down = Math.floor(getDownFromNumber(n));
		square.region = Math.floor(getRegionFromNumber(n));
		square.value = v;
		square.index = n - 1;	
		return square;	
	}
	
	var checkForConflicts = function(squares, test) {
		for(var i=0; i<squares.length; i++)
		{	
			if( (squares[i].across != undefined && squares[i].across == test.across) 
			|| (squares[i].down != undefined && squares[i].down == test.down) 
			|| (squares[i].region != undefined && squares[i].region == test.region) )
			{
				if(squares[i].value == test.value)
				{
					return true;	
				}	
			}
		}
		return false;	
	}

	var Square = function(across, down, region, value, index, row, col) 
	{
		this.across = across;
		this.down = down;
		this.region = region;
		this.value = value;
		this.index = index;
		this.row = row;
		this.col = col;
	}

	var getRan = function (high)
	{
		return Math.floor(Math.random() * high);
	}
		
	var getSquares = function (completed, starting)
	{
		var count = 0;
		var squares = ko.observableArray();
		
		for(var h=0; h<3; h++)
		{
			for(var i=0; i<3; i++)
			{
				var square = new SquareViewModel();

				for(var j=0; j<3; j++)
				{
					for(var k=0; k<3; k++)
					{
						var cell = new CellViewModel();
						cell.SolutionValue = completed[count].value;
						var rand = getRan(10);
						if(rand < 5)
						{
							cell.OriginalValue = "";
							cell.CurrentValue("");
							cell.IsEditable(true);
							cell.IsValid(false);
						} else {
							cell.OriginalValue = starting[count].value;
							cell.CurrentValue(starting[count].value);
							cell.IsEditable(false);
							cell.IsValid(true);
						}
						cell.RowIndex(completed[count].row);
						cell.ColIndex(completed[count].col);
						square.Cells.push(cell);
						count++;
					}	
					count += 6;
				}
				squares.push(square);
				count = (3 * (i+1)) + (27*h);
			}
			count = 27 * (h+1);
		}	
		return squares;
	}

	this.GenerateNewGame = function() {
		var squares = new Array();
		var available = new Array();
		var c = 0;
	
		//Populate available number arrays
		for(var i=0; i<81; i++)
		{
			available[i] = new Array();
			for(var j=0; j<9; j++)
			{
				available[i].push(j+1);
			}		
		}
	
		//Do until we have filled every square
		while(c != 81)
		{
			//If we haven't exhausted all possibilities for the current square...
			if(available[c].length != 0)
			{
				var index = getRan(available[c].length);
				var z = available[c][index];
				var test = item(c, z);
				var conflicts = checkForConflicts(squares, test); 
				if(conflicts === false)
				{
					//The current number works so lets add it to our list
					squares[c] = test;
					available[c].splice(index, 1);			
					c += 1;
				} else {
					//number no good...remove it from the possible value list
					available[c].splice(index, 1);
				}		
			}
			else
			{
				//We have run out of available options...
				for(var l=0; l<9; l++)
				{
					available[c].push(l+1);	
				}	
			
				//Head back to the previous square to try again
				c -= 1;
				squares[c] = new Square();
			
			}
		}

		var newGame = new SudokuViewModel();
		newGame.Squares = getSquares(squares, squares);

		return newGame;
	};
};



