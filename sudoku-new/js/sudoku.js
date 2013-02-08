window.Sudoku = new function() {

	this.isValidArray = function(array, msg) {
		//input: an array and a debug message
		//return: none
		//checks if array is in fact an array.  if not alerts user
		//used to help enforce typing issues
		if (Object.prototype.toString.call(array) === '[object Array]') {
			return;
		}
		else{
			alert("Expected an array at function " + msg);
			return;
		}
	};

	this.copyBoard = function(board) {
		//input: board to be copied
		//returns: copied board
		//copys a 9x9 array by value.
		var newBoard = [];
		for (var i=0; i<9;i++){
			var row = [];
			for (var j=0; j<9;j++){
				row[j]=board[i][j];
			}
			newBoard[i] = row;
		}
		return newBoard;
	};
	 
	this.loadNextBoard = function() {
		//input: none
		//returns: none
		//the game has one board loaded at a time
		//this function cycles through the currently selected board
		//boards are pre-loaded in globalVars.js
		//puzzleNumber = (puzzleNumber+1) % boards.length;
		//board = this.copyBoard(boards[puzzleNumber]);
		//solvedBoard = solvedBoards[puzzleNumber];
		//originalBoard = board;
		board = Generator.generateGrid();
		return;
	};

	this.point = function(row, col) {
		//this is a data type to represent a point
		//which holds a row value and column value
		//given row and column returns dict of obvious form
		this.row = row;
		this.col = col;
	};

	this.getBox = function(box) {
		//input: box number
		//returns: the indices as an array of points contained in a given 3x3 box
		//box numbering format:
		//012
		//345
		//678
		var indices = new Array;
		//calculate columns of box geometrically from box number
		var colCoord = box % 3;
		var rowCoord = 0;
		if(box < 3){ rowCoord = 0; }
		else if(box < 6){rowCoord = 1; }
		else if(box < 9){rowCoord = 2; }
		
		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++){
				var p = new this.point(3*rowCoord+i,3*colCoord+j);
				indices.push(p);
			}
		}	
		return indices;
	};

	this.getRow = function(row) {
		//input: row number
		//returns: the indices as an array of points contained in a given row
		var indices = new Array;
		for(j = 0; j < 9; j++){
				var p = new this.point(row,j);
				indices.push(p);
		}	
		return indices;
	};

	this.getCol = function(col) {
		//input: column number
		//returns: the indices as an array of points contained in a given column
		var indices = new Array;
		for(var i = 0; i < 9; i++){
				var p = new this.point(i,col);
				indices.push(p);
		}	
		return indices;
	};

	//input: a point
	//returns: which row, 0:8 it's in
	this.point2Row = function(point) {
		return point.row;
	};

	//input: a point
	//returns: which column, 0:8 it's in
	this.point2Col = function(point) {
		return point.col;
	};

	this.find = function(points, number) {
		//inputs: an array of points and a given sudoku value
		//returns: a subset of the the input array consisting of
		//all the points it contains that are that number on the board
		this.isValidArray(points,"find");
	    var subpoints = new Array;
	    var count = 0;
	    for (var i=0;i<points.length;i++){
			var currentRow = points[i].row;
			var currentCol = points[i].col;
			if (board[currentRow][currentCol] == number){
				subpoints.push(points[i]);      
			}
	    }
	    return subpoints;
	};

	this.countNum = function(points, number) {
		//inputs: an array of points and a given sudoku value
		//returns: how many instances of the number there is in the array of points
		this.isValidArray(points,"countNum");
		var myPoints = this.find(points, number);
		return myPoints.length;
	};

	this.contains = function(points, number) {
		//inputs: an array of points and a given sudoku value
		//returns: true/false for whether the number is in the array of points
		this.isValidArray(points,"contains");
		var numInstances = this.countNum(points, number);
		if(numInstances > 0){ return true; }
		else { return false; }
	};

	this.sortWIndices = function(vec, cmp) {
		//input: an array of things that can be compared via "<"
		//returns: [the permutation you apply that sorts the array, the sorted vector]
		this.isValidArray(vec,"sortWIndices");
	    var data = [];
	    for (var i=0;i<vec.length;i++){
	        data[i]=[vec[i],i];
	    }
	    data.sort(cmp);
	    var inds = [];
	    var vals = [];
	    for (var i=0;i<data.length;i++){
	        inds[i]=data[i][1];
	        vals[i]=data[i][0];
	    }
	    return [vals,inds];
	    //console.log(inds);
	    //console.log(vals);
	};

	this.cmpKillZeros = function(a,b) {
		//input: two things to be compared
		//output: a number used to compare with
		//functions as a "<" operator for comparisons
		//in some contexts 0 should be 'high': in particular, a row with no missing entries
		//should not be a high priority row to work on
	   if (a[0]==0){
	       return 1;
	   }
	   else if (b[0]==0){
	       return -1;
	   }
	   return a[0]-b[0];
	};

	this.findLeastMissingRows = function() {
		//inputs: none
		//returns: [the rows ranked in order of least missing, the number of missing entries]
	    var counts=[];
	    for (var row=0;row<board.length;row++){
	        var selection = this.getRow(row);
	        var nMissing = this.countNum(selection, 0);
	        counts[row]=nMissing;
	    }
	    var sorted = this.sortWIndices(counts, this.cmpKillZeros);
	    var rows = sorted[1];
	    var cts = sorted[0];
		return [rows,cts];
	};

	this.findLeastMissingCols = function() {
		//inputs: none
		//returns: [the cols ranked in order of least missing, the number of missing entries]
	    var counts=[];
	    for (var j=0;j<board.length;j++){
	        var selection = this.getCol(j);
	        var nMissing = this.countNum(selection, 0);
	        counts[j]=nMissing;
	    }
	    var sorted = this.sortWIndices(counts, this.cmpKillZeros);
	    var cols = sorted[1];
	    var cts = sorted[0];
		return [cols,cts];
	};

	this.findLeastMissingBoxes = function() {
		//inputs: none
		//returns: [the boxes ranked in order of least missing, the number of missing entries]
	    var counts=[];
	    for (var k=0;k<board.length;k++){
	        var selection = this.getBox(k);
	        var nMissing = this.countNum(selection, 0);
	        counts[k]=nMissing;
	    }
	    var sorted = this.sortWIndices(counts, this.cmpKillZeros);
	    var boxes = sorted[1];
	    var cts = sorted[0];
		return [boxes,cts];
	};

	this.getBoard = function() {
		//inputs: none
		//returns: the entire board as an array of points
		var points = new Array;
		for(var i = 0; i < board.length; i++){
			for(var j = 0; j < board[0].length; j++){
				var newPoint = new this.point(i,j);
				points.push(newPoint);
			}
		}
		return points
	};

	this.bestRowOptions = function(n) {
		//input: an integer n
		//returns: [the n-th most filled row, how many entries are missing] 
		//filled rows are bottom priority for obvious reasons
	    var options = this.findLeastMissingRows();
	    //console.log("The best option number ",n, " is row " , options[0][n-1], "with ", options[1][n-1], "missing");
	    return [options[0][n-1],options[1][n-1]];
	};

	this.bestColOptions = function(n) {
		//input: an integer n
		//returns: [the n-th most filled col, how many entries are missing]
		//filled columns are bottom priority for obvious reasons
	    var options = this.findLeastMissingCols();
	    //console.log("The best option number ",n, " is column " , options[0][n-1], "with ", options[1][n-1], "missing");
	    return [options[0][n-1],options[1][n-1]];
	};

	this.bestBoxOptions = function(n) {
		//input: an integer n
		//returns: [the n-th most filled box, how many entries are missing]
		//filled boxes are bottom priority for obvious reasons
	    var options = this.findLeastMissingBoxes();
	    //console.log("The best option number ",n, " is box " , options[0][n-1], "with ", options[1][n-1], "missing");
	    return [options[0][n-1],options[1][n-1]];
	};

	this.findMissingNumbers = function(points) {
		//input: an array of points
		//returns: what sudoku numbers are not in those points
		this.isValidArray(points,"findMissingNumbers");
		var i = 0;
		var missingNumbers = [];
		for(i = 1; i < board.length+1; i++){
			if(!this.contains(points, i)){
				missingNumbers.push(i);
			}
		}
		return missingNumbers;
	};

	this.getValue = function(point) {
		//input: a point
		//returns: the sudoku value at the point
		return board[point.row][point.col];
	};

	this.getValues = function(points) {
		//input: an array of points
		//returns: an array containing the values in the points
		this.isValidArray(points,"getValues");
		var vals = new Array;
		for(var i = 0; i < points.length; i++){
			vals.push(this.getValue(points[i]));
		}
		return vals;
	};

	this.updateBoard = function(row, col, number) {
		//inputs: a row, a column, and a sudoku value
		//returns: true iff array successfully changed	
		//updates the board at the point to the number
		//does not let you overwrite original values
		//and at the moment does not let you make invalid moves
		if(originalBoard[row][col] == 0 & solvedBoard[row][col] == number){
			board[row][col] = number;
			return true;
		}
		else{
			return false;
		}
	};

	this.select = function(type, num) {
		//inputs: a type of the form "row"/"col"/"box" and the number of it 0:8
		//returns: an array of the points in the given zone.
		var sel = [];
	    if (type=="row"){
	        sel = this.getRow(num);
	    }
	    else if (type=="col"){
	        sel = this.getCol(num);
	    }
	    else if (type=="box"){
	        sel = this.getBox(num);
	    }
	    //console.log(type, num, "selected");
	    this.isValidArray(sel,"select");
	    return sel;
	};

	this.read = function(selection) {
		//input: an array of values
		//returns: an array of values corresponding to the selection
		//in current form is unnecessary as it just calls getValues
		this.isValidArray(selection,"read");
		var values = this.getValues(selection);  
		//console.log(values);
		return values;
	};

	this.canFillPoint = function(row, col) {
		//inputs: a row and column
		//returns: 1 if original board and current board are empty
		//returns: 0 if original board is empty and current board is not 
		//returns: 0 if original board is full
		//essentially, reports whether a user can put in a new value at the given point
		//the functionality here will change if we intend to let the user make mistakes
		//which we currently do not so the user will never need to override their past guesses
		if(originalBoard[row][col] == 0 & board[row][col] == 0){
			return 1;
		}
		else{
			return 0;
		}
	};

	this.checkInput = function(row, col, number) {
		//input: a row, column, and sudoku value
		//returns: 1 iff desired input is correct by checking against the true solution
		if(solvedBoard[row][col] == number){
			return 1;
		}
		else{
			return 0;
		}
	};

	this.getBoardAsArray = function() {
		//inputs: none
		//returns: the board array
		return board;
	};

	this.getCorrectValues = function(points) {
		//inputs: array of points
		//returns: an array of the correct values at those points
	    var values = [];
	    for (var i=0;i<points.length;i++){
	        var p = points[i];
	        var row = this.point2Row(p);
	        var col = this.point2Col(p);
	        values[i] = solvedBoard[row][col];
	    }
	    return values;
	};

	this.checkSolved = function() {
		//inputs: none
		//returns: true iff the board is solved

		//does this easily by seeing if any blanks are left
		//obviously if we let the user make mistakes we have to compare also
		//against the true solution
	    var missing = this.countNum(this.getBoard(), 0);
	    return (missing==0);
	};
};