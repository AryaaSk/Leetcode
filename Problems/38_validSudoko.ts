function isValidSudoku(board: string[][]): boolean {
    //keep track of which square, row and col we are currently in
    //squares: [0, 1, 2]
    //         [3, 4, 5]
    //         [6, 7, 8]

    //rows: 0
    //      1
    //      2
    //
    // ...  8
    
    //cols: 0 1 2 ... 8

    //encode each element with its specific value as well as position, e.g. r15 for row 1 (5), or s24 for square 2 (4)

    const trackingSet = new Set();

    for (let row = 0; row != board.length; row += 1) {
        for (let col = 0; col != board[row].length; col += 1) {
            const value = board[row][col];
            if (value == '.') {
                continue;
            }
            
            const square = 3 * (row/3>>0) + (col/3>>0); //https://stackoverflow.com/questions/4228356/how-to-perform-an-integer-division-and-separately-get-the-remainder-in-javascr

            const [rowID, colID, squareID] = [`r${row}${value}`, `c${col}${value}`, `s${square}${value}`];
            if (trackingSet.has(rowID) || trackingSet.has(colID) || trackingSet.has(squareID)) {
                return false;
            }
            else {
                trackingSet.add(rowID);
                trackingSet.add(colID);
                trackingSet.add(squareID);
            }
        }
    }

    return true;
};

console.log(isValidSudoku([
 ["5","3",".",".","7",".",".",".","."]
,["6","2",".","1","9","5",".",".","."]
,[".","9",".",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]))