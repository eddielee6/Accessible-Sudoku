var SudokuViewModel = function() {
	this.Squares = ko.observableArray();
	this.CurrentSelection;
};

var SquareViewModel = function() {
	this.Cells = ko.observableArray();
};

var CellViewModel = function() {
	this.SolutionValue;
	this.OriginalValue;
	this.RowIndex;
	this.ColIndex;
	this.CurrentValue = ko.observable();
	this.IsSelected = ko.observable(false);
};