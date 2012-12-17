window.MoveCell = new function() {

    this.move = function (movt) {        
        var row = cell.charAt(0);
        var col = cell.charAt(1);
        var newRownum;
        var newRowChar;
        var newColnum;
        var newColChar;
        var cellnew = "beep";
        crossedBox = 0;
        if(movt === "up")
        {
            if(row !== 'a') //cant go above
            {
                newRow = row.charCodeAt(0);
                newRow = newRow - 1;

                newRowChar = String.fromCharCode(newRow);
                cellnew = newRowChar + col;
                if (parseInt(ChangeGrid.getRowCoordinate(cellnew) / 3) !== parseInt(ChangeGrid.getRowCoordinate(cell) / 3))//it crossed a box
                {
                    crossedBox=1;
                }
            }
        }
        else if(movt === "down")
        {
            if(row !== 'i') //cant go below
            {
                newRow = row.charCodeAt(0);
                newRow = newRow + 1;
                newRowChar = String.fromCharCode(newRow);
                cellnew = newRowChar + col;
                if (parseInt(ChangeGrid.getRowCoordinate(cellnew) / 3) !== parseInt(ChangeGrid.getRowCoordinate(cell) / 3))//it crossed a box
                {
                    crossedBox = 1;
                }
            }
        }
        else if(movt === "right")
        {
            if(col !== '9')
            {
                newCol = col.charCodeAt(0);
                newCol = newCol + 1;
                newColChar = String.fromCharCode(newCol);
                cellnew = row + newColChar;
                if (parseInt(ChangeGrid.getColCoordinate(cellnew) / 3) !== parseInt(ChangeGrid.getColCoordinate(cell) / 3))//it crossed a box
                {
                    crossedBox = 1;
                }
            }
        }
        else if(movt === "left")
        {
            if(col !== '1')
                {
                    newCol = col.charCodeAt(0);
                    newCol = newCol - 1;
                    newColChar = String.fromCharCode(newCol);
                    cellnew = row + newColChar;
                    if (parseInt(ChangeGrid.getColCoordinate(cellnew) / 3) !== parseInt(ChangeGrid.getColCoordinate(cell) / 3))//it crossed a box
                    {
                        crossedBox = 1;
                    }
                }
        }
        MoveCell.moveBetweenCells(cell, cellnew);
    };


    this.color = function (cell, colr) {
        var cellNode = document.getElementById(cell);
        var num = cellNode.innerHTML;
        if (colr === 0) {
            $(cellNode).removeClass('highlighted');
                        
        } else if (colr === 1) {
            $(cellNode).addClass('highlighted');

            var outstring = "";
            if (crossedBox === 1) {
                outstring = "Line ";
            }

            if (num === "&nbsp;") {
                ChangeGrid.output("");
                ChangeGrid.output(outstring + "blank");
            } else {
                ChangeGrid.output(outstring + num);
            }
        }
    };

    this.moveBetweenCells = function (cellold, cellnew) {
        if (cellnew === "beep")
        {
            ChangeGrid.output("Beep");
        }
        else
        {
            MoveCell.color(cellold, 0);
            MoveCell.color(cellnew, 1);
            cell = cellnew;
        }
    };
};