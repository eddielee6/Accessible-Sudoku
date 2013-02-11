var SudokuViewModel = function() {
	this.Squares = ko.observableArray();

	this.SetSelectedCell = function(square, cell) {
		for (var squareIndex = 0; squareIndex < this.Squares().length; squareIndex++) {
			for (var cellIndex = 0; cellIndex < this.Squares()[squareIndex].Cells().length; cellIndex++) {
				if(squareIndex == square && cellIndex == cell) {
					this.Squares()[squareIndex].Cells()[cellIndex].IsSelected(true);
				} else {
					this.Squares()[squareIndex].Cells()[cellIndex].IsSelected(false);
				}
			};
		};
	};

	this.GetSelectedCell = function() {
		for (var squareIndex = 0; squareIndex < this.Squares().length; squareIndex++) {
			for (var cellIndex = 0; cellIndex < this.Squares()[squareIndex].Cells().length; cellIndex++) {
				if(this.Squares()[squareIndex].Cells()[cellIndex].IsSelected()) {
					return {
						square: squareIndex,
						cell: cellIndex
					};
				}
			};
		};
	};

	this.SetCellValue = function(square, cell, value) {
		if(this.Squares()[square].Cells()[cell].IsEditable()) {
			this.Squares()[square].Cells()[cell].CurrentValue(value);
        }
	};
};

var SquareViewModel = function() {
	this.Cells = ko.observableArray();
};

var CellViewModel = function() {
	this.SolutionValue;
	this.OriginalValue;
	this.RowIndex = ko.observable();
	this.ColIndex = ko.observable();
	this.IsEditable = ko.observable();
	this.CurrentValue = ko.observable();
	this.IsSelected = ko.observable(false);
	this.IsValid = ko.observable(false);
	this.IsMouseOver = ko.observable(false);
	this.mouseEnter = function() {
		this.IsMouseOver(true);
	};

	this.mouseLeave = function() {
		this.IsMouseOver(false);
	};
};