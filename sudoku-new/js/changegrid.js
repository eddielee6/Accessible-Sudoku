window.ChangeGrid = {};

ChangeGrid.fillCurrentCell = function(number) {
    var curRowIndex= ChangeGrid.getRowCoordinate(cell);
    var curColIndex = ChangeGrid.getColCoordinate(cell);
    var isValidCell = Sudoku.canFillPoint(curRowIndex, curColIndex); //bool to get if its a valid cell
    //var isValidCell=1;

    var isRightSolution=1;
    if(isValidCell==1)
    {
        //if its not a part of the sudoku actual grid
        isRightSolution = Sudoku.checkInput(curRowIndex, curColIndex, number);
        if(isRightSolution==1)
        {
            ChangeGrid.output("Filled " + number);
            document.getElementById(cell).innerHTML = number;
			
            document.getElementById(cell).style.color = '0000EE';
            Sudoku.updateBoard(curRowIndex, curColIndex, number);
        }
        else
        {
            ChangeGrid.output("Wrong Answer!");
        }
    }
    else if(isValidCell==0)//its overwriting an already written number
    {
        ChangeGrid.output("Can't overwrite a grid number");
    }
};

ChangeGrid.getRowCoordinate = function(cellnumber) {
    var row=cellnumber.charAt(0);
    var firstRow='a';
    var curRowIndex=row.charCodeAt(0)-firstRow.charCodeAt(0);
    return curRowIndex;
};

ChangeGrid.getColCoordinate = function(cellnumber) {
    var col=cellnumber.charAt(1);

    var firstCol='1';
    var curColIndex=col.charCodeAt(0)-firstCol.charCodeAt(0);

    return curColIndex;
};

ChangeGrid.getRowCharacter = function(number) {
    var firstRow='a';
    var curRowChar=firstRow.charCodeAt(0)+number;
    return String.fromCharCode(curRowChar);
};

ChangeGrid.getColCharacter = function(number) {
    var firstCol='0';
    var curColChar=number+firstCol.charCodeAt(0)+1;
    return String.fromCharCode(curColChar);
};

ChangeGrid.getCurrentRowIndex = function() {
    return ChangeGrid.getRowCoordinate(cell);
};

ChangeGrid.getCurrentColIndex = function() {
    return ChangeGrid.getColCoordinate(cell);
};

ChangeGrid.output = function(textoutput) {
    $("#inputbox").val(textoutput);
};

ChangeGrid.getCurrentBoxIndex = function() {
    var boxIndex = 3 * (parseInt(ChangeGrid.getCurrentRowIndex() / 3)) + parseInt(ChangeGrid.getCurrentColIndex() / 3);
    return boxIndex;
};