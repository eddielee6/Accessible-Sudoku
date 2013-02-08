var SudokuViewModel = function() {
	this.Squares = ko.observableArray();
	this.currentSelection = {
		square: 0,
		cell: 0
	}
};

var SquareViewModel = function() {
	this.Cells = ko.observableArray();
};

var CellViewModel = function() {
	this.SolutionValue;
	this.OriginalValue;
	this.CurrentValue = ko.observable();
	this.IsSelected = ko.observable(false);
};