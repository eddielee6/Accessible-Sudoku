var SudokuViewModel = function() {
	this.Squares = ko.observableArray();

	this.ResetSelection = function() {
		// for (var i = 0; i < this.Squares().length; i++) {
		// 	for (var j = 0; j < this.Squares()[i].Cells().length; j++) {
		// 		this.Squares()[i].Cells()[j].IsSelected(false);
		// 	};
		// };
	};

	this.GetCurrentSelection = function() { //Eventually make this knockout computed
		for (var i = 0; i < this.Squares().length; i++) {
			for (var j = 0; j < this.Squares()[i].Cells().length; j++) {
				if(this.Squares()[i].Cells()[j].IsSelected()) {
					return { square: i, cell: j };
				}
			};
		};
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