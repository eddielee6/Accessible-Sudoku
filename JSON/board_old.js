var Board = function() {
	
	// The file format version, used to distinguish between game versions.
	this.version = 1.0;
	
	// The currently highlighted cell, saved with the game and rehighlighted when the game is reloaded.
	this.currentlyHighlightedCell = 0;
	
	// The size of the grid board, hardcoded as 9 (9x9), not sure if this will ever need to be changed.
	this.size = 9;
	
	// The elapsed seconds taken so far, saved with the game.
	this.elapsed = 0;
	
	// The array that contains the current grid contents.
	this.content = new Array(this._size);
	
	// Populate grid
	for (var i = 0; i < this.size; i++)  
	{
		//this.content[i] = new Array(this.size);
		for (var j = 0; j < this.size; j++) 
		{
			this.content[i][j] = 0; /* Put the random generator algortihm here */
		}
	}
	
	/* VISUAL REPRESENTATION OF ARRAYS 
	
	content	->	[0]	->	[0][1][2][3][4][5][6][7][8][9]
				[1]	->	[0][1][2][3][4][5][6][7][8][9]
				[2]	->	[0][1][2][3][4][5][6][7][8][9]
				[3]	->	[0][1][2][3][4][5][6][7][8][9]
				[4]	->	[0][1][2][3][4][5][6][7][8][9]
				[5]	->	[0][1][2][3][4][5][6][7][8][9]
				[6]	->	[0][1][2][3][4][5][6][7][8][9]
				[7]	->	[0][1][2][3][4][5][6][7][8][9]
				[8]	->	[0][1][2][3][4][5][6][7][8][9]
				[9]	->	[0][1][2][3][4][5][6][7][8][9]
	*/
}