//https://leetcode.com/problems/zigzag-conversion/

//order s into the pattern, then read row by row

//PAYPALISHIRING
//P     I     N
// A   L S   I G
//  Y A   H R
//   P     I

function convert(s: string, numRows: number): string {
    if (numRows == 1) {
        return s; //dont need to do anything if its all on 1 row
    }

    const rows: string[][] = [];
    for (let i = 0; i != numRows; i += 1) {
        rows.push([]);
    }

    let pointer = 0;
    let ascDesc: 1 | -1 = 1; //asc = 1, desc = -1
    for (const letter of s) {
        rows[pointer].push(letter);

        if (pointer == 0) {
            ascDesc = 1;
        }
        else if (pointer == rows.length - 1) {
            ascDesc = -1;
        }

        pointer += ascDesc;
    }
    
    let returnString = "";
    for (const row of rows) {
        returnString += row.join("");
    }

    return returnString;
};