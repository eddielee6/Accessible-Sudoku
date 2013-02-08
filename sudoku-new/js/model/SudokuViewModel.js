var SudokuViewModel = function() {
	
	// The file format version, used to distinguish between game versions.
	this.version = null;
	
	// The currently highlighted cell, saved with the game and rehighlighted when the game is reloaded.
	this.currentlyHighlightedCell = null;

	// The elapsed seconds taken so far, saved with the game.
	this.elapsed = null;
	
	// The elapsed seconds since the last save.
	this.lastSaved = null;
	
	//Array of SquareViewModel
	this.Squares = ko.observableArray();
	
}