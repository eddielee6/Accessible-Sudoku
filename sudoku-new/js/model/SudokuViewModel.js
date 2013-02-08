var SudokuViewModel = function() {
	
	// The file format version, used to distinguish between game versions.
	this.version = 1.0;
	
	// The currently highlighted cell, saved with the game and rehighlighted when the game is reloaded.
	this.currentlyHighlightedCell = 0;
	
	// The size of the grid board, hardcoded as 9 (9x9), not sure if this will ever need to be changed.
	this.size = 9;
	
	// The elapsed seconds taken so far, saved with the game.
	this.elapsed = 0;
	
	// The elapsed seconds since the last save.
	this.lastSaved = 0;
	
	// The array that contains the current grid contents.
	this.board = null;
	
}