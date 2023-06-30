function multiply(num1: string, num2: string): string {
    //not allowed to simply convert results to integer
    //will have to use column multiplication

    //e.g. if num1 = 234 and num2 = 32:
    //      11  
    //      234
    //    x  32
    //    _____
    //      468
    //   + 702 
    //    _____
    //     7488

    //multiplication is carried out right to left, so we need to reverse these lists
    const num1Digits = num1.split("").reverse();
    const num2Digits = num2.split("").reverse();

    const columnMultiplicationRows: number[][] = [];

    let carryOver = 0; //use same variable since carry over is created then used immediately

    for (const num2Digit of num2Digits) {
        let currentRow = [];
        for (const [i, num1Digit] of num1Digits.entries()) {
            const [digit1, digit2] = [Number(num1Digit), Number(num2Digit)];

            let result = digit1 * digit2 + carryOver;
            carryOver = 0;

            //need to check if it is the 'final calculation' for the row
            if (i == num1Digits.length - 1) {
                const resultArray = String(result).split("").map((value) => { return Number(value); })
                currentRow = resultArray.concat(currentRow);
            }
            else {
                if (result > 9) { //max is 81
                    const resultString = String(result);
                    result = Number(resultString[1]);
                    carryOver = Number(resultString[0]);
                }
    
                currentRow = [result].concat(currentRow);
            }
        }
        columnMultiplicationRows.push(currentRow);
    }

    let maxLengthRow = 0;
    //now just carry out addition by first shifting the upper arrays to the right
    for (const [i, row] of columnMultiplicationRows.entries()) {
        const trailingZeros = i;
        for (let _ = 0; _ != trailingZeros; _ += 1) {
            row.push(0)
        }

        if (row.length > maxLengthRow) {
            maxLengthRow = row.length;
        }
    }

    //need to make all rows have a consistent length
    for (const row of columnMultiplicationRows) {
        while (row.length < maxLengthRow) {
            row.unshift(0);
        }
    }

    //Addition
    let result: number[] = [];
    
    //all rows should be of equal length now
    let i = columnMultiplicationRows[0].length - 1;
    while (i >= 0) {
        let sum = 0;
        for (let rowIndex = 0; rowIndex != columnMultiplicationRows.length; rowIndex += 1) {
            sum += columnMultiplicationRows[rowIndex][i];
        }
        sum += carryOver;
        carryOver = 0;

        //just add rest on if its the final sum
        if (i == 0) {
            result.unshift(sum);
        }
        else {
            //take last digit of sum and leave rest as carry over
            const sumStringArray = String(sum).split("");
            const lastDigit = Number(sumStringArray.pop());
            result.unshift(lastDigit);

            if (sumStringArray.length > 0) {
                carryOver = Number(sumStringArray.join(""));
            }
        }

        i -= 1;
    }

    const returnStringList = result.join('').split('');
    while (returnStringList[0] == '0') {
        returnStringList.splice(0, 1);
    }
    if (returnStringList.length == 0) {
        returnStringList.push('0');
    }

    return returnStringList.join('');
};

console.log(multiply("140", "721"));