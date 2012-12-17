$(function () {

    cell='a1';
    boardLength = 9;

    //board is stored as a 9x9 array of numbers; 0 denotes blank
    //store sample boards in an array
    boards = new Array;
    originalBoard = new Array;
	solvedBoards = new Array;
	
	//--------------adding boards
	boards.push([[7,5,6,3,0,0,9,0,4],[9,8,2,0,4,6,0,7,0],[0,0,4,2,0,0,6,8,0],[0,2,8,1,0,4,3,0,0],[4,0,7,6,0,8,5,0,1],[1,6,9,7,3,5,0,4,0],[0,0,0,9,5,7,8,3,2],[8,9,0,4,1,2,0,5,6],[2,7,0,0,0,3,4,1,9]]);
	solvedBoards.push([[7,5,6,3,8,1,9,2,4],[9,8,2,5,4,6,1,7,3],[3,1,4,2,7,9,6,8,5],[5,2,8,1,9,4,3,6,7],[4,3,7,6,2,8,5,9,1],[1,6,9,7,3,5,2,4,8],[6,4,1,9,5,7,8,3,2],[8,9,3,4,1,2,7,5,6],[2,7,5,8,6,3,4,1,9]]);

	boards.push([[0,0,5,6,0,0,9,4,3],[3,0,0,0,4,0,0,0,0],[0,4,0,0,0,0,7,0,6],[0,7,0,0,9,4,0,0,0],[6,0,2,0,0,0,4,0,5],[0,0,0,2,6,0,0,3,0],[1,0,3,0,0,0,0,7,0],[0,0,0,0,5,0,0,0,9],[8,9,4,0,0,7,6,0,0]]);
	solvedBoards.push([[7,1,5,6,8,2,9,4,3],[3,2,6,7,4,9,5,8,1],[9,4,8,5,1,3,7,2,6],[5,7,1,3,9,4,2,6,8],[6,3,2,8,7,1,4,9,5],[4,8,9,2,6,5,1,3,7],[1,5,3,9,2,6,8,7,4],[2,6,7,4,5,8,3,1,9],[8,9,4,1,3,7,6,5,2]]);
	
	boards.push([[6,0,0,7,0,8,9,0,0],[1,0,0,0,3,6,7,5,0],[7,0,4,5,0,0,0,6,1],[0,2,7,0,0,0,0,4,8],[0,0,1,0,0,0,6,0,0],[8,6,0,0,0,0,2,1,0],[2,8,0,0,0,1,4,0,6],[0,7,5,6,2,0,0,0,9],[0,0,6,8,0,9,0,0,3]]);
	solvedBoards.push([[6,5,2,7,1,8,9,3,4],[1,9,8,4,3,6,7,5,2],[7,3,4,5,9,2,8,6,1],[9,2,7,1,6,5,3,4,8],[5,4,1,2,8,3,6,9,7],[8,6,3,9,4,7,2,1,5],[2,8,9,3,5,1,4,7,6],[3,7,5,6,2,4,1,8,9],[4,1,6,8,7,9,5,2,3]]);
	
	boards.push([[0,0,2,6,0,0,5,9,8],[4,0,3,0,8,0,0,2,0],[5,8,0,9,2,7,0,0,4],[0,0,9,0,4,0,0,0,0],[0,4,7,2,5,8,3,1,0],[0,0,0,0,7,0,6,0,0],[7,0,0,4,6,2,0,5,3],[0,6,0,0,1,0,4,0,2],[2,3,4,0,0,5,8,0,0]]);
	solvedBoards.push([[1,7,2,6,3,4,5,9,8],[4,9,3,5,8,1,7,2,6],[5,8,6,9,2,7,1,3,4],[3,5,9,1,4,6,2,8,7],[6,4,7,2,5,8,3,1,9],[8,2,1,3,7,9,6,4,5],[7,1,8,4,6,2,9,5,3],[9,6,5,8,1,3,4,7,2],[2,3,4,7,9,5,8,6,1]]);
	

	boards.push([[3,0,4,2,0,0,8,0,6],[0,0,0,0,0,8,2,4,9],[0,8,2,0,6,0,7,3,1],[0,0,0,6,8,2,0,0,5],[1,0,9,0,5,3,4,8,2],[5,2,8,0,0,9,6,0,3],[2,7,5,0,0,6,1,9,0],[6,0,0,9,0,5,3,0,0],[0,9,3,4,0,1,5,6,7]]);
	boards.push([[8,0,2,6,4,0,0,0,0],[0,3,4,0,7,2,0,0,0],[0,0,6,1,0,3,0,0,0],[2,0,0,0,9,0,0,6,7],[3,4,0,8,2,0,5,9,1],[0,1,9,5,3,7,2,4,0],[0,2,0,3,6,0,4,0,9],[0,6,1,7,0,0,0,3,2],[9,8,3,2,0,4,0,5,0]]);
	boards.push([[8,2,0,5,0,0,1,7,3],[5,0,7,3,1,0,9,2,0],[1,4,0,2,0,0,6,8,5],[0,9,1,7,0,3,0,0,0],[2,8,5,1,0,9,3,6,7],[3,0,0,0,0,0,0,9,0],[4,0,0,9,0,0,8,3,2],[7,0,2,0,3,0,4,1,9],[9,3,8,0,0,0,0,0,0]]);
	boards.push([[4,1,0,0,7,2,0,5,6],[2,8,9,0,4,5,7,3,1],[0,5,0,1,0,3,0,4,9],[8,2,0,4,9,0,0,7,3],[9,6,1,5,3,0,4,8,2],[7,3,0,8,2,6,9,1,0],[5,7,0,3,6,8,1,0,0],[1,0,6,7,5,9,0,2,8],[3,9,8,2,1,0,5,6,7]]);
	boards.push([[1,3,0,0,0,0,5,8,6],[0,7,0,3,1,8,0,2,9],[8,9,0,5,6,4,3,7,0],[2,0,8,1,4,0,7,0,0],[0,1,0,0,5,0,8,0,0],[3,0,7,0,8,0,0,9,5],[9,8,3,4,2,0,0,5,7],[4,6,1,9,7,0,0,0,0],[7,2,0,8,3,0,9,0,4]]);
	boards.push([[8,9,2,0,6,5,1,7,3],[0,0,4,0,9,2,6,8,0],[5,7,0,0,0,0,0,0,4],[0,5,8,9,0,0,3,0,0],[0,0,9,0,5,7,2,4,8],[3,4,7,2,0,0,0,9,1],[0,8,3,0,2,4,7,0,0],[4,6,0,5,7,9,8,3,0],[7,0,5,0,0,8,0,1,9]]);
	boards.push([[0,7,6,1,8,3,9,2,4],[0,9,2,6,0,0,1,0,0],[0,0,4,9,0,2,0,0,0],[3,0,7,8,2,6,0,9,1],[0,0,9,0,0,0,0,4,8],[2,0,8,4,9,0,0,0,7],[0,0,0,3,0,0,0,1,9],[0,6,0,0,5,9,0,3,2],[9,8,0,2,0,4,0,5,0]]);
	boards.push([[7,0,5,8,3,1,0,4,0],[3,0,0,7,0,9,6,5,8],[0,2,8,0,5,6,0,3,0],[4,7,3,2,0,8,5,0,9],[5,0,0,9,1,4,0,0,6],[0,0,6,3,0,0,0,0,0],[0,0,9,1,0,2,0,6,5],[6,1,4,5,9,7,8,2,3],[2,5,7,6,8,0,0,0,0]]);
	boards.push([[0,7,0,0,0,8,9,2,0],[8,9,2,5,6,4,0,0,0],[1,3,4,2,0,0,0,0,5],[6,1,0,0,5,0,2,4,8],[0,5,8,1,4,9,0,6,7],[3,4,7,0,0,0,0,9,1],[4,0,1,0,7,0,8,0,2],[0,0,0,8,0,6,0,1,9],[0,8,3,0,0,1,7,5,6]]);
	boards.push([[0,9,0,4,5,6,7,0,0],[1,0,0,0,2,0,8,5,6],[5,0,6,8,0,1,2,4,9],[0,0,9,0,7,5,4,8,2],[2,5,8,9,1,4,6,0,3],[0,4,7,2,6,0,0,1,0],[4,0,1,5,9,7,0,2,0],[0,2,0,6,8,0,0,9,4],[9,0,3,1,4,2,0,6,7]]);
	boards.push([[5,0,0,0,0,3,0,0,9],[8,2,9,4,6,0,3,0,1],[1,0,3,7,9,2,0,0,6],[2,8,5,9,4,0,7,6,0],[3,0,4,0,0,6,1,0,0],[6,9,1,3,5,7,0,4,0],[0,3,0,0,2,0,0,0,0],[4,1,6,0,0,0,0,0,8],[0,5,2,6,0,0,0,1,0]]);
	boards.push([[1,3,0,9,2,0,5,8,0],[8,9,2,0,5,0,3,0,0],[0,7,6,1,3,8,0,0,9],[6,1,9,5,7,0,0,0,0],[3,0,0,0,0,2,1,9,5],[0,5,0,4,1,0,0,6,3],[9,0,3,2,0,0,6,0,7],[0,2,5,0,0,0,0,1,4],[0,0,0,0,0,5,2,0,8]]);
	boards.push([[6,5,0,0,0,0,9,0,2],[2,0,9,4,6,5,0,3,0],[0,1,3,7,9,2,6,5,8],[7,3,0,2,8,6,0,1,0],[8,0,5,9,0,1,3,0,6],[9,6,1,3,5,7,2,0,4],[1,4,6,0,7,0,8,2,3],[0,0,0,0,2,4,7,0,5],[5,0,0,6,3,0,0,9,1]]);
	boards.push([[9,0,2,0,0,0,0,0,3],[7,0,0,1,3,8,0,0,0],[3,1,4,9,0,0,8,0,5],[4,0,7,8,6,2,9,0,1],[1,6,9,5,7,3,0,0,0],[5,2,0,4,1,9,0,3,7],[2,7,5,3,8,6,0,0,9],[6,4,1,7,0,0,3,8,2],[8,9,3,0,0,0,0,7,6]]);
	boards.push([[8,0,2,0,5,0,3,1,7],[5,0,6,8,3,0,0,9,0],[1,0,0,0,0,0,5,0,8],[3,4,0,2,6,0,0,5,0],[6,0,0,0,7,0,8,2,0],[2,5,0,0,1,0,7,0,0],[0,2,5,0,0,3,0,0,1],[4,0,0,5,9,0,2,0,0],[0,0,3,0,4,2,6,7,5]]);
	boards.push([[4,1,0,0,2,0,0,6,5],[0,0,7,8,0,0,2,0,4],[2,0,9,4,0,6,0,0,3],[0,2,0,0,0,4,0,3,7],[0,3,0,0,6,8,0,5,1],[9,0,1,0,0,0,4,2,0],[0,7,2,0,0,3,0,4,9],[0,0,8,0,4,2,5,7,6],[0,0,0,5,9,0,0,0,2]]);
	boards.push([[0,3,4,7,0,9,6,0,8],[8,9,2,4,5,6,1,3,7],[5,0,6,0,3,1,0,4,2],[0,0,8,9,1,4,0,0,6],[6,1,0,3,7,0,0,0,0],[3,0,7,0,6,0,0,1,9],[0,0,1,5,9,0,0,2,3],[9,0,3,1,0,2,0,6,0],[7,2,0,6,0,3,4,0,1]]);
	boards.push([[9,8,2,0,6,4,0,0,0],[7,5,0,3,1,8,9,2,0],[0,0,4,0,9,0,0,8,5],[0,6,9,0,5,3,0,4,0],[0,2,0,0,0,0,0,6,7],[0,3,7,6,0,2,5,9,1],[8,9,3,0,2,0,0,0,0],[6,0,1,9,7,0,8,3,2],[2,0,0,8,3,6,4,1,0]]);
	boards.push([[2,9,0,0,6,0,3,0,0],[4,3,0,0,9,0,5,6,0],[0,7,0,3,1,8,4,0,0],[0,0,0,0,8,0,1,5,9],[8,0,2,1,4,9,0,3,6],[9,1,6,7,0,3,0,2,4],[0,0,0,4,0,0,0,7,0],[0,0,7,8,3,0,0,4,1],[1,6,0,0,0,0,0,0,3]]);
	boards.push([[2,9,0,6,4,5,0,7,3],[6,7,0,0,8,3,9,2,4],[4,3,0,9,0,2,6,0,5],[8,5,0,0,0,1,0,6,0],[0,4,0,0,2,6,0,9,1],[9,1,6,5,3,0,2,4,0],[5,0,7,3,0,0,4,1,9],[3,0,9,0,1,0,7,5,6],[1,6,4,0,5,9,0,3,0]]);
	boards.push([[7,5,6,3,0,0,9,0,4],[9,8,2,0,4,6,0,7,0],[0,0,4,2,0,0,6,8,0],[0,2,8,1,0,4,3,0,0],[4,0,7,6,0,8,5,0,1],[1,6,9,7,3,5,0,4,0],[0,0,0,9,5,7,8,3,2],[8,9,0,4,1,2,0,5,6],[2,7,0,0,0,3,4,1,9]]);

	solvedBoards.push([[3,1,4,2,9,7,8,5,6],[7,5,6,3,1,8,2,4,9],[9,8,2,5,6,4,7,3,1],[4,3,7,6,8,2,9,1,5],[1,6,9,7,5,3,4,8,2],[5,2,8,1,4,9,6,7,3],[2,7,5,8,3,6,1,9,4],[6,4,1,9,7,5,3,2,8],[8,9,3,4,2,1,5,6,7]]);
	solvedBoards.push([[8,9,2,6,4,5,1,7,3],[1,3,4,9,7,2,6,8,5],[5,7,6,1,8,3,9,2,4],[2,5,8,4,9,1,3,6,7],[3,4,7,8,2,6,5,9,1],[6,1,9,5,3,7,2,4,8],[7,2,5,3,6,8,4,1,9],[4,6,1,7,5,9,8,3,2],[9,8,3,2,1,4,7,5,6]]);
	solvedBoards.push([[8,2,9,5,6,4,1,7,3],[5,6,7,3,1,8,9,2,4],[1,4,3,2,9,7,6,8,5],[6,9,1,7,5,3,2,4,8],[2,8,5,1,4,9,3,6,7],[3,7,4,6,8,2,5,9,1],[4,1,6,9,7,5,8,3,2],[7,5,2,8,3,6,4,1,9],[9,3,8,4,2,1,7,5,6]]);
	solvedBoards.push([[4,1,3,9,7,2,8,5,6],[2,8,9,6,4,5,7,3,1],[6,5,7,1,8,3,2,4,9],[8,2,5,4,9,1,6,7,3],[9,6,1,5,3,7,4,8,2],[7,3,4,8,2,6,9,1,5],[5,7,2,3,6,8,1,9,4],[1,4,6,7,5,9,3,2,8],[3,9,8,2,1,4,5,6,7]]);
	solvedBoards.push([[1,3,4,2,9,7,5,8,6],[5,7,6,3,1,8,4,2,9],[8,9,2,5,6,4,3,7,1],[2,5,8,1,4,9,7,6,3],[6,1,9,7,5,3,8,4,2],[3,4,7,6,8,2,1,9,5],[9,8,3,4,2,1,6,5,7],[4,6,1,9,7,5,2,3,8],[7,2,5,8,3,6,9,1,4]]);
	solvedBoards.push([[8,9,2,4,6,5,1,7,3],[1,3,4,7,9,2,6,8,5],[5,7,6,8,1,3,9,2,4],[2,5,8,9,4,1,3,6,7],[6,1,9,3,5,7,2,4,8],[3,4,7,2,8,6,5,9,1],[9,8,3,1,2,4,7,5,6],[4,6,1,5,7,9,8,3,2],[7,2,5,6,3,8,4,1,9]]);
	solvedBoards.push([[5,7,6,1,8,3,9,2,4],[8,9,2,6,4,5,1,7,3],[1,3,4,9,7,2,6,8,5],[3,4,7,8,2,6,5,9,1],[6,1,9,5,3,7,2,4,8],[2,5,8,4,9,1,3,6,7],[7,2,5,3,6,8,4,1,9],[4,6,1,7,5,9,8,3,2],[9,8,3,2,1,4,7,5,6]]);
	solvedBoards.push([[7,6,5,8,3,1,9,4,2],[3,4,1,7,2,9,6,5,8],[9,2,8,4,5,6,1,3,7],[4,7,3,2,6,8,5,1,9],[5,8,2,9,1,4,3,7,6],[1,9,6,3,7,5,2,8,4],[8,3,9,1,4,2,7,6,5],[6,1,4,5,9,7,8,2,3],[2,5,7,6,8,3,4,9,1]]);
	solvedBoards.push([[5,7,6,3,1,8,9,2,4],[8,9,2,5,6,4,1,7,3],[1,3,4,2,9,7,6,8,5],[6,1,9,7,5,3,2,4,8],[2,5,8,1,4,9,3,6,7],[3,4,7,6,8,2,5,9,1],[4,6,1,9,7,5,8,3,2],[7,2,5,8,3,6,4,1,9],[9,8,3,4,2,1,7,5,6]]);
	solvedBoards.push([[8,9,2,4,5,6,7,3,1],[1,3,4,7,2,9,8,5,6],[5,7,6,8,3,1,2,4,9],[6,1,9,3,7,5,4,8,2],[2,5,8,9,1,4,6,7,3],[3,4,7,2,6,8,9,1,5],[4,6,1,5,9,7,3,2,8],[7,2,5,6,8,3,1,9,4],[9,8,3,1,4,2,5,6,7]]);
	solvedBoards.push([[5,6,7,8,1,3,4,2,9],[8,2,9,4,6,5,3,7,1],[1,4,3,7,9,2,5,8,6],[2,8,5,9,4,1,7,6,3],[3,7,4,2,8,6,1,9,5],[6,9,1,3,5,7,8,4,2],[9,3,8,1,2,4,6,5,7],[4,1,6,5,7,9,2,3,8],[7,5,2,6,3,8,9,1,4]]);
	solvedBoards.push([[1,3,4,9,2,7,5,8,6],[8,9,2,6,5,4,3,7,1],[5,7,6,1,3,8,4,2,9],[6,1,9,5,7,3,8,4,2],[3,4,7,8,6,2,1,9,5],[2,5,8,4,1,9,7,6,3],[9,8,3,2,4,1,6,5,7],[7,2,5,3,8,6,9,1,4],[4,6,1,7,9,5,2,3,8]]);
	solvedBoards.push([[6,5,7,8,1,3,9,4,2],[2,8,9,4,6,5,1,3,7],[4,1,3,7,9,2,6,5,8],[7,3,4,2,8,6,5,1,9],[8,2,5,9,4,1,3,7,6],[9,6,1,3,5,7,2,8,4],[1,4,6,5,7,9,8,2,3],[3,9,8,1,2,4,7,6,5],[5,7,2,6,3,8,4,9,1]]);
	solvedBoards.push([[9,8,2,6,5,4,7,1,3],[7,5,6,1,3,8,2,9,4],[3,1,4,9,2,7,8,6,5],[4,3,7,8,6,2,9,5,1],[1,6,9,5,7,3,4,2,8],[5,2,8,4,1,9,6,3,7],[2,7,5,3,8,6,1,4,9],[6,4,1,7,9,5,3,8,2],[8,9,3,2,4,1,5,7,6]]);
	solvedBoards.push([[8,9,2,4,5,6,3,1,7],[5,7,6,8,3,1,4,9,2],[1,3,4,7,2,9,5,6,8],[3,4,7,2,6,8,1,5,9],[6,1,9,3,7,5,8,2,4],[2,5,8,9,1,4,7,3,6],[7,2,5,6,8,3,9,4,1],[4,6,1,5,9,7,2,8,3],[9,8,3,1,4,2,6,7,5]]);
	solvedBoards.push([[4,1,3,7,2,9,8,6,5],[6,5,7,8,3,1,2,9,4],[2,8,9,4,5,6,7,1,3],[8,2,5,9,1,4,6,3,7],[7,3,4,2,6,8,9,5,1],[9,6,1,3,7,5,4,2,8],[5,7,2,6,8,3,1,4,9],[3,9,8,1,4,2,5,7,6],[1,4,6,5,9,7,3,8,2]]);
	solvedBoards.push([[1,3,4,7,2,9,6,5,8],[8,9,2,4,5,6,1,3,7],[5,7,6,8,3,1,9,4,2],[2,5,8,9,1,4,3,7,6],[6,1,9,3,7,5,2,8,4],[3,4,7,2,6,8,5,1,9],[4,6,1,5,9,7,8,2,3],[9,8,3,1,4,2,7,6,5],[7,2,5,6,8,3,4,9,1]]);
	solvedBoards.push([[9,8,2,5,6,4,1,7,3],[7,5,6,3,1,8,9,2,4],[3,1,4,2,9,7,6,8,5],[1,6,9,7,5,3,2,4,8],[5,2,8,1,4,9,3,6,7],[4,3,7,6,8,2,5,9,1],[8,9,3,4,2,1,7,5,6],[6,4,1,9,7,5,8,3,2],[2,7,5,8,3,6,4,1,9]]);
	solvedBoards.push([[2,9,8,5,6,4,3,1,7],[4,3,1,2,9,7,5,6,8],[6,7,5,3,1,8,4,9,2],[7,4,3,6,8,2,1,5,9],[8,5,2,1,4,9,7,3,6],[9,1,6,7,5,3,8,2,4],[3,8,9,4,2,1,6,7,5],[5,2,7,8,3,6,9,4,1],[1,6,4,9,7,5,2,8,3]]);
	solvedBoards.push([[2,9,8,6,4,5,1,7,3],[6,7,5,1,8,3,9,2,4],[4,3,1,9,7,2,6,8,5],[8,5,2,4,9,1,3,6,7],[7,4,3,8,2,6,5,9,1],[9,1,6,5,3,7,2,4,8],[5,2,7,3,6,8,4,1,9],[3,8,9,2,1,4,7,5,6],[1,6,4,7,5,9,8,3,2]]);
	solvedBoards.push([[7,5,6,3,8,1,9,2,4],[9,8,2,5,4,6,1,7,3],[3,1,4,2,7,9,6,8,5],[5,2,8,1,9,4,3,6,7],[4,3,7,6,2,8,5,9,1],[1,6,9,7,3,5,2,4,8],[6,4,1,9,5,7,8,3,2],[8,9,3,4,1,2,7,5,6],[2,7,5,8,6,3,4,1,9]]);
	//done adding boards----------------------------------
	//board=boards[0]; //should maybe copy by value here :[
	//solvedBoard=solvedBoards[0]; //copy by reference fine here
	//originalBoard=board;

	puzzleNumber = -1;
    
	
	crossedBox=0;





	//Taken from jinput.js


	TableFill.fillGrid(); //fill the grid initially and greet the player
    ChangeGrid.output("Welcome to Accessible Sudoku! Press h for help or begin playing");

    var controlSwitch = false;  //used to detect if the user has pressed one of a series of commands (r, c, or b)
    var controlSwitchRCB = "x"; //used to store the previous command if controlSwitch = true
    var tCounter = 0;           //used to count the number of times the user has consecutively executed the t command (toggle)
    var hCounter = 0;           //used to count the number of times the user has consecutively executed the h command (help)

    $("#inputbox").keydown(function (e) {
        if (Sudoku.checkSolved()) {     //check on every kepress to see if the board is solved, if so on any keypress it should refill itself with a new puzzle
            TableFill.fillGrid();
            return true;
        }

        if (controlSwitch === false) {      //if no previous command has been entered
            if ((tCounter > 0) && (e.which === 84) && (tCounter < 9)) {     //if the current command is t (toggle) and this isnt the first time it is being pressed
                tCounter++;
                switch (controlSwitchRCB) {
                    case 'R':   //toggle rows
                        var bestRowOp = Sudoku.bestRowOptions(tCounter)[0];   //moves cursor to next best option

                        var rowArray = Sudoku.getRow(bestRowOp);
                        for (var i = 0; i < rowArray.length; i++)
                            if (Sudoku.getValue(rowArray[i]) === 0) {

                                var newRow = String.fromCharCode(97 + rowArray[i].row);
                                var newCol = rowArray[i].col + 1;
                                var newcell = newRow + newCol;

                                MoveCell.moveBetweenCells(cell, newcell);
                                break;
                            }
                        ChangeGrid.output("Next best row option is " + (Sudoku.bestRowOptions(tCounter)[0] + 1) + ".");
                        break;
                    case 'C':   //toggle columns
                        var bestColOp = Sudoku.bestColOptions(tCounter)[0];       //moves cursor to next best option

                        var colArray = Sudoku.getCol(bestColOp);
                        for (var i = 0; i < colArray.length; i++)
                            if (Sudoku.getValue(colArray[i]) === 0) {

                                var newRow = String.fromCharCode(97 + colArray[i].row);
                                var newCol = colArray[i].col + 1;
                                var newcell = newRow + newCol;

                                MoveCell.moveBetweenCells(cell, newcell);
                                break;
                            }
                        ChangeGrid.output("Next best column option is " + (Sudoku.bestColOptions(tCounter)[0] + 1) + ".");
                        break;
                    case 'B':   //toggle boxes
                        var bestBoxOp = Sudoku.bestBoxOptions(tCounter)[0];      //moves cursor to next best option

                        var boxArray = Sudoku.getBox(bestBoxOp);
                        for (var i = 0; i < boxArray.length; i++)
                            if (Sudoku.getValue(boxArray[i]) === 0) {

                                var newRow = String.fromCharCode(97 + boxArray[i].row);
                                var newCol = boxArray[i].col + 1;
                                var newcell = newRow + newCol;

                                MoveCell.moveBetweenCells(cell, newcell);
                                break;
                            }
                        ChangeGrid.output("Next best box option is " + (Sudoku.bestBoxOptions(tCounter)[0] + 1) + ".");
                        break;
                }
            } else if (tCounter === 9) {       //if all the options have been toggled through, start over from the beginning
                tCounter = 1;
                switch (controlSwitchRCB) {
                    case 'R':   //toggle rows
                        var bestRowOp = Sudoku.bestRowOptions(tCounter)[0];   //moves cursor to next best option

                        var rowArray = Sudoku.getRow(bestRowOp);
                        for (var i = 0; i < rowArray.length; i++)
                            if (Sudoku.getValue(rowArray[i]) === 0) {

                                var newRow = String.fromCharCode(97 + rowArray[i].row);
                                var newCol = rowArray[i].col + 1;
                                var newcell = newRow + newCol;

                                MoveCell.moveBetweenCells(cell, newcell);
                                break;
                            }
                        ChangeGrid.output("Starting over, the best row option is " + (Sudoku.bestRowOptions(tCounter)[0] + 1) + ".");
                        break;
                    case 'C':   //toggle columns
                        var bestColOp = Sudoku.bestColOptions(tCounter)[0];       //moves cursor to next best option

                        var colArray = Sudoku.getCol(bestColOp);
                        for (var i = 0; i < colArray.length; i++)
                            if (Sudoku.getValue(colArray[i]) === 0) {

                                var newRow = String.fromCharCode(97 + colArray[i].row);
                                var newCol = colArray[i].col + 1;
                                var newcell = newRow + newCol;

                                MoveCell.moveBetweenCells(cell, newcell);
                                break;
                            }
                        ChangeGrid.output("Starting over, the best column option is " + (Sudoku.bestColOptions(tCounter)[0] + 1) + ".");
                        break;
                    case 'B':   //toggle boxes
                        var bestBoxOp = Sudoku.bestBoxOptions(tCounter)[0];      //moves cursor to next best option

                        var boxArray = Sudoku.getBox(bestBoxOp);
                        for (var i = 0; i < boxArray.length; i++)
                            if (Sudoku.getValue(boxArray[i]) === 0) {

                                var newRow = String.fromCharCode(97 + boxArray[i].row);
                                var newCol = boxArray[i].col + 1;
                                var newcell = newRow + newCol;

                                MoveCell.moveBetweenCells(cell, newcell);
                                break;
                            }
                        ChangeGrid.output("Starting over, the best box option is " + (Sudoku.bestBoxOptions(tCounter)[0] + 1) + ".");
                        break;
                }
            } else {
                tCounter = 0;
            }
            if (e.which !== 72 || hCounter >= 8) {  //if the current command isn't h (help) or all the help text has been exhausted start help text back at beginning
                hCounter = 0;
            }
            switch (e.which) {
                case 72:    // 'h'
                    switch (++hCounter) {
                        case 1:     //first help text
                            ChangeGrid.output("To play, navigate using the W,A,S, and D letters to " +
                                            "move up, left, down, and right respectively. Press h to continue");
                            break;
                        case 2:     //second line of help text
                            ChangeGrid.output("To assist you, we have also added the r, c, and b commands to select" +
                                            " the current row, column, or box of numbers.");
                            break;
                        case 3:     //third line of help text
                            ChangeGrid.output("Once you select any of these, you may" +
                                            " press r to have that selection read out to you, from top to bottom, left to right,");
                            break;
                        case 4:     //fourth line of help text
                            ChangeGrid.output("m to find out which numbers are missing from that selection,");
                            break;
                        case 5:     //fifth line of help text
                            ChangeGrid.output("1 through 9 to see if that number is already present in the selection,");
                            break;
                        case 6:     //sixth line of help text
                            ChangeGrid.output("and t to navigate to the next similar selection (such as the next box, row or column) " +
                                            "with the fewest missing numbers.");
                            break;
                        case 7:     //seventh line of help text
                            ChangeGrid.output("Pressing t multiple times will visit each selection of that type from least complete to most complete.");
                            break;
                        case 8:     //eighth line of help text
                            ChangeGrid.output("To hear these instructions again, press h, or begin playing.");
                            break;
                    }
                    break;
                case 65:    // 'a'
                    MoveCell.move("left");
                    break;
                case 87:    // 'w'
                    MoveCell.move("up");
                    break;
                case 68:    // 'd'
                    MoveCell.move("right");
                    break;
                case 83:    // 's'
                    MoveCell.move("down");
                    break;
                case 49:    // '1'
                    ChangeGrid.fillCurrentCell("1");
                    if (Sudoku.checkSolved())
                        ChangeGrid.output("Congratulations, you won! \n Press any key to start new game!");
                    break;
                case 50:    // '2'
                    ChangeGrid.fillCurrentCell("2");
                    if (Sudoku.checkSolved())
                        ChangeGrid.output("Congratulations, you won! \n Press any key to start new game!");
                    break;
                case 51:    // '3'
                    ChangeGrid.fillCurrentCell("3");
                    if (Sudoku.checkSolved())
                        ChangeGrid.output("Congratulations, you won! \n Press any key to start new game!");
                    break;
                case 52:    // '4'
                    ChangeGrid.fillCurrentCell("4");
                    if (Sudoku.checkSolved())
                        ChangeGrid.output("Congratulations, you won! \n Press any key to start new game!");
                    break;
                case 53:    // '5'
                    ChangeGrid.fillCurrentCell("5");
                    if (Sudoku.checkSolved())
                        ChangeGrid.output("Congratulations, you won! \n Press any key to start new game!");
                    break;
                case 54:    // '6'
                    ChangeGrid.fillCurrentCell("6");
                    if (Sudoku.checkSolved())
                        ChangeGrid.output("Congratulations, you won! \n Press any key to start new game!");
                    break;
                case 55:    // '7'
                    ChangeGrid.fillCurrentCell("7");
                    if (Sudoku.checkSolved())
                        ChangeGrid.output("Congratulations, you won! \n Press any key to start new game!");
                    break;
                case 56:    // '8'
                    ChangeGrid.fillCurrentCell("8");
                    if (Sudoku.checkSolved())
                        ChangeGrid.output("Congratulations, you won! \n Press any key to start new game!");
                    break;
                case 57:    // '9'
                    ChangeGrid.fillCurrentCell("9");
                    if (Sudoku.checkSolved())
                        ChangeGrid.output("Congratulations, you won! \n Press any key to start new game!");
                    break;
                case 82:    // 'r' wait for next input
                    controlSwitch = true;
                    controlSwitchRCB = 'R';
                    ChangeGrid.output("Row selected, choose an option.");
                    break;
                case 67:    // 'c' wait for next input
                    controlSwitch = true;
                    controlSwitchRCB = 'C';
                    ChangeGrid.output("Column selected, choose an option.");
                    break;
                case 66:    // 'b' wait for next input
                    controlSwitch = true;
                    controlSwitchRCB = 'B';
                    ChangeGrid.output("Box selected, choose an option.");
                    break;
            }
        } else if (controlSwitch === true) {    //if r, c, or b was the previous command
            switch (e.which) {
                case 49: // 1 - 9
                case 50: // check and see if the current row, column or box contains the number
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                    switch (controlSwitchRCB) {
                        case 'R':   //row
                            if (Sudoku.contains(Sudoku.select("row", ChangeGrid.getCurrentRowIndex()), e.which - 48))
                                ChangeGrid.output("Yes, row " + (ChangeGrid.getCurrentRowIndex() + 1) + " contains a " + (e.which - 48) + ".");
                            else
                                ChangeGrid.output("No, row " + (ChangeGrid.getCurrentRowIndex() + 1) + " does not contain a " + (e.which - 48) + ".");
                            break;
                        case 'C':   // column
                            if (Sudoku.contains(Sudoku.select("col", ChangeGrid.getCurrentColIndex()), e.which - 48))
                                ChangeGrid.output("Yes, column " + (ChangeGrid.getCurrentColIndex() + 1) + " contains a " + (e.which - 48) + ".");
                            else
                                ChangeGrid.output("No, column " + (ChangeGrid.getCurrentColIndex() + 1) + " does not contain a " + (e.which - 48) + ".");
                            break;
                        case 'B':   // box
                            if (Sudoku.contains(Sudoku.select("box", ChangeGrid.getCurrentBoxIndex()), e.which - 48))
                                ChangeGrid.output("Yes, box " + (ChangeGrid.getCurrentBoxIndex() + 1) + " contains a " + (e.which - 48) + ".");
                            else
                                ChangeGrid.output("No, box " + (ChangeGrid.getCurrentBoxIndex() + 1) + " does not contain a " + (e.which - 48) + ".");
                            break;
                    }
                    break;
                case 82:    // 'r' read the current row, column or box out
                    switch (controlSwitchRCB) {
                        case 'R':   // row
                            var results = Sudoku.read(Sudoku.select("row", ChangeGrid.getCurrentRowIndex()));
                            var outputString = "Row " + (ChangeGrid.getCurrentRowIndex() + 1) + " contains ";
                            for (var i = 0; i < 9; i++)
                                outputString += (results[i] === 0 ? "blank" : results[i]) + (i === 8 ? ". " : ", ");    //internally blanks are stored as 0s, convert to "blank" here for output text
                            ChangeGrid.output(outputString);
                            break;
                        case 'C':   // column
                            var results = Sudoku.read(Sudoku.select("col", ChangeGrid.getCurrentColIndex()));
                            var outputString = "Column " + (ChangeGrid.getCurrentColIndex() + 1) + " contains ";
                            for (var i = 0; i < 9; i++)
                                outputString += (results[i] === 0 ? "blank" : results[i]) + (i === 8 ? ". " : ", ");
                            ChangeGrid.output(outputString);
                            break;
                        case 'B':   // box
                            var results = Sudoku.read(Sudoku.select("box", ChangeGrid.getCurrentBoxIndex()));
                            var outputString = "Box " + (ChangeGrid.getCurrentBoxIndex() + 1) + " contains ";
                            for (var i = 0; i < 9; i++)
                                outputString += (results[i] === 0 ? "blank" : results[i]) + (i === 8 ? ". " : ", ");
                            ChangeGrid.output(outputString);
                            break;
                    }
                    break;

                case 77:    // 'm' check to see what numbers are missing from the current row, column or box
                    switch (controlSwitchRCB) {
                        case 'R':   //row
                            var results = Sudoku.findMissingNumbers(Sudoku.select("row", ChangeGrid.getCurrentRowIndex()))
                            var outputString = "Row " + (ChangeGrid.getCurrentRowIndex() + 1) + " is missing ";
                            for (var i = 0; i < results.length; i++)
                                outputString += results[i] + (i === results.length - 1 ? ". " : ", ");      //add commas inbetween numbers or, if the last one, a period
                            ChangeGrid.output(outputString);
                            break;
                        case 'C':   // column
                            var results = Sudoku.findMissingNumbers(Sudoku.select("col", ChangeGrid.getCurrentColIndex()));
                            var outputString = "Column " + (ChangeGrid.getCurrentColIndex() + 1) + " is missing ";
                            for (var i = 0; i < results.length; i++)
                                outputString += results[i] + (i === results.length - 1 ? ". " : ", ");      //add commas inbetween numbers or, if the last one, a period
                            ChangeGrid.output(outputString);
                            break;
                        case 'B':   // box
                            var results = Sudoku.findMissingNumbers(Sudoku.select("box", ChangeGrid.getCurrentBoxIndex()));
                            var outputString = "Box " + (ChangeGrid.getCurrentBoxIndex() + 1) + " is missing ";
                            for (var i = 0; i < results.length; i++)
                                outputString += results[i] + (i === results.length - 1 ? ". " : ", ");      //add commas inbetween numbers or, if the last one, a period
                            ChangeGrid.output(outputString);
                            break;
                    }
                    break;

                case 84:    // 't' find the row, column or box missing the fewest numbers
                    switch (controlSwitchRCB) {
                        case 'R':   //row
                            var bestRowOp = Sudoku.bestRowOptions(1)[0];   //moves cursor to next best option

                            var rowArray = Sudoku.getRow(bestRowOp);
                            for (var i = 0; i < rowArray.length; i++)
                                if (Sudoku.getValue(rowArray[i]) === 0) {

                                    var newRow = String.fromCharCode(97 + rowArray[i].row);
                                    var newCol = rowArray[i].col + 1;
                                    var newcell = newRow + newCol;

                                    MoveCell.moveBetweenCells(cell, newcell);
                                    break;
                                }
                            ChangeGrid.output("Best row option is " + (Sudoku.bestRowOptions(1)[0] + 1) + ".");
                            tCounter++;
                            break;
                        case 'C':   // column
                            var bestColOp = Sudoku.bestColOptions(1)[0];       //moves cursor to next best option

                            var colArray = Sudoku.getCol(bestColOp);
                            for (var i = 0; i < colArray.length; i++)
                                if (Sudoku.getValue(colArray[i]) === 0) {

                                    var newRow = String.fromCharCode(97 + colArray[i].row);
                                    var newCol = colArray[i].col + 1;
                                    var newcell = newRow + newCol;

                                    MoveCell.moveBetweenCells(cell, newcell);
                                    break;
                                }
                            ChangeGrid.output("Best column option is " + (Sudoku.bestColOptions(1)[0] + 1) + ".");
                            tCounter++;
                            break;
                        case 'B':   // box
                            var bestBoxOp = Sudoku.bestBoxOptions(1)[0];         //moves cursor to next best option

                            var boxArray = Sudoku.getBox(bestBoxOp);
                            for (var i = 0; i < boxArray.length; i++)
                                if (Sudoku.getValue(boxArray[i]) === 0) {

                                    var newRow = String.fromCharCode(97 + boxArray[i].row);
                                    var newCol = boxArray[i].col + 1;
                                    var newcell = newRow + newCol;

                                    MoveCell.moveBetweenCells(cell, newcell);
                                    break;
                                }
                            ChangeGrid.output("Best box option is " + (Sudoku.bestBoxOptions(1)[0] + 1) + ".");
                            tCounter++;
                            break;
                    }
                    break;
            }
            controlSwitch = false;
        }
        return false;
    });

    $("#inputbox").blur(function () {                            //make sure that the user's cursor is always on the output textbox, this way their screen reader will always read whatever we print to it
        setTimeout(function () { $("#inputbox").focus(); }, 5);  //and we always capture every keystroke the user makes
    });

});
