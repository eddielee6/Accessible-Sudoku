var CellViewModel = function() {
	this.SolutionValue;
	this.OriginalValue;
	this.CurrentValue = ko.observable();
	this.IsSelected = ko.observable(false);
};