var BoardCol = function() {

	this.v = -1;
	
}

var BoardRow = function(size) {

	this.cols = new Array(size);
	
	for (var i = 0; i < size; i++) {
		this.cols[i] = new BoardCol();
	}
	
}

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
		this.content[i] = new BoardRow(this.size);
		for (var j = 0; j < this.size; j++) 
		{
			//this.content[i][j] = 0; /* Put the random generator algortihm here */
			this.content[i].cols[j].v = 0;
		}
	}
	
}