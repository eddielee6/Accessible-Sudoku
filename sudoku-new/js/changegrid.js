window.ChangeGrid = new function() {

    this.fillCurrentCell = function(number) {
        var curRowIndex= this.getRowCoordinate(cell);
        var curColIndex = this.getColCoordinate(cell);
        var isValidCell = Sudoku.canFillPoint(curRowIndex, curColIndex); //bool to get if its a valid cell
        //var isValidCell=1;

        var isRightSolution=1;
        if(isValidCell==1)
        {
            //if its not a part of the sudoku actual grid
            isRightSolution = Sudoku.checkInput(curRowIndex, curColIndex, number);
            if(isRightSolution==1)
            {
                this.output("Filled " + number);
                document.getElementById(cell).innerHTML = number;
                
                document.getElementById(cell).style.color = '0000EE';
                Sudoku.updateBoard(curRowIndex, curColIndex, number);
            }
            else
            {
                this.output("Wrong Answer!");
            }
        }
        else if(isValidCell==0)//its overwriting an already written number
        {
            this.output("Can't overwrite a grid number");
        }
    };

    this.getRowCoordinate = function(cellnumber) {
        var row=cellnumber.charAt(0);
        var firstRow='a';
        var curRowIndex=row.charCodeAt(0)-firstRow.charCodeAt(0);
        return curRowIndex;
    };

    this.getColCoordinate = function(cellnumber) {
        var col=cellnumber.charAt(1);

        var firstCol='1';
        var curColIndex=col.charCodeAt(0)-firstCol.charCodeAt(0);

        return curColIndex;
    };

    this.getRowCharacter = function(number) {
        var firstRow='a';
        var curRowChar=firstRow.charCodeAt(0)+number;
        return String.fromCharCode(curRowChar);
    };

    this.getColCharacter = function(number) {
        var firstCol='0';
        var curColChar=number+firstCol.charCodeAt(0)+1;
        return String.fromCharCode(curColChar);
    };

    this.getCurrentRowIndex = function() {
        return this.getRowCoordinate(cell);
    };

    this.getCurrentColIndex = function() {
        return this.getColCoordinate(cell);
    };


    //This method is shit because it misses messages
    //Basically when you cross a line it says "line" but instantly tries to output the number
    //As it's already talking it will just miss the number
    //We need to look at the difference between aria "polite vs assertive vs rude"
    //And possibly look at queueing messages
    this.output = function(textoutput) {
        $("#messageOutput").text(textoutput);
    };

    this.getCurrentBoxIndex = function() {
        var boxIndex = 3 * (parseInt(this.getCurrentRowIndex() / 3)) + parseInt(this.getCurrentColIndex() / 3);
        return boxIndex;
    };
};