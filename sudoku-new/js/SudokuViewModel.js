var SudokuViewModel = function() {
	this.Squares = {};
	this.currentSelection = {
		square: 0,
		cell: 0
	}
};

var CellViewModel = function() {
	this.SolutionValue;
	this.OriginalValue;
	this.CurrentValue = ko.observable();
	this.IsSelected = ko.observable(false);
};