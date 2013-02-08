window.TableFill = new function() {

	// Make an instance of the Sudoku game.
	var gameInstance = new SudokuGameModel();
	
	// TODO: Populate the view model with the generated data, etc..
    
    this.fillGrid = function() {
        Sudoku.loadNextBoard();
        gridnum=board;
        
        var i=0,j=0;
        var row;
        var col;
        var idobject;
        while(i<9)
        {
            j=0;
            row=ChangeGrid.getRowCharacter(i);
            while(j<9)
            {
                col=ChangeGrid.getColCharacter(j);
                idobject=row + col;
                //console.log("row: "+row+"col: "+col);
                if(gridnum[i][j]==0)//if grid==0, then put blank
                {
                    document.getElementById(idobject).innerHTML = "&nbsp;";
                } else {
                    var cellNode = document.getElementById(idobject);
                    cellNode.innerHTML = gridnum[i][j];
                    $(cellNode).addClass('filled');
                }
                j=j+1;
            }
            i=i+1;
        }
        MoveCell.color(cell,1);
        $("#inputbox").focus();
    };
};