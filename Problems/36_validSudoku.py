class Solution(object):
    def isValidSudoku(self, board):
        #brute force, check every row, every column and every 3x3 box

        #we can check the first row and first column together using a double nested loop by simply inverting the order that we access the board
        for constant in range(9):
            currentRowCheck = [1] * 9 # for each row/col, start with [1, 1, 1, 1, 1, 1, 1, 1, 1]; then as we encounter elements, e.g. 2, we subtract 1 from the 2nd item in the check array;
            currentColCheck = [1] * 9 # if there is a negative number in the check array, that means a number appeared twice, thus meaning the row is invalid

            currentBoxCheck = [1] * 9

            for variable in range(9):
                #in this loop, we can loop through a row by locking the row index and varying the column index
                rowItem = board[constant][variable]
                if rowItem != ".":
                    rowItem = int(rowItem) - 1 # rowItem - 1 since numbers are 1-indexed but array is 0-indexed
                    currentRowCheck[rowItem] -= 1 
                    if currentRowCheck[rowItem] < 0:
                        return False #row is invalid
                
    
                
                #however we can also loop through the column by locking the column and varying the row
                colItem = board[variable][constant]
                if colItem != ".":
                    colItem = int(colItem) - 1
                    currentColCheck[colItem] -= 1
                    if currentColCheck[colItem] < 0:
                        return False

                #we can also access each box using constant, and use variable to access the individual slots inside the box
                # e.g. constant = 0, variable = 0 would be the top-left item
                # constant = 0, variable = 4 would be the middle item in the top left box
                boxItem = board[3 * (constant // 3) + (variable // 3)][3 * (constant % 3) + (variable % 3)]
                if boxItem != ".":
                    boxItem = int(boxItem) - 1
                    currentBoxCheck[boxItem] -= 1
                    if currentBoxCheck[boxItem] < 0:
                        return False

        return True

solution = Solution()
print(solution.isValidSudoku(
    [["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]]))