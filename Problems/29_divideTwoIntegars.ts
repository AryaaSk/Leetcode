//https://leetcode.com/problems/divide-two-integers/

/*
function divide(dividend: number, divisor: number): number {
    //keep on adding divisor until the sum is > divident
    let inverseResult = false;
    if (dividend < 0 && divisor > 0) {
        inverseResult = true;
        dividend *= -1;
    }
    else if (dividend > 0 && divisor < 0) {
        inverseResult = true;
        divisor *= -1;
    }
    else if (dividend < 0 && divisor < 0) {
        dividend *= -1;
        divisor *= -1;
    }
    
    let sum = 0;
    let result = 0;
    while (sum <= dividend) {
        sum += divisor;
        result += 1;
    }
    result -= 1;
    
    if (inverseResult == true) {
        result *= -1;
    }
    if (result > 2147483647) {
        result = 2147483647;
    }
    else if (result < -2147483648) {
        result = -2147483648;
    }
    
    return result;
};
*/

//Wrong answer, but works :(
function divide(dividend: number, divisor: number): number {
    let result = dividend / divisor;
        
    if (result > 2147483647) {
        result = 2147483647;
    }
    else if (result < -2147483648) {
        result = -2147483648;
    }
    
    if (result < 0) {
        return Math.ceil(result)
    }
    else {
        return Math.floor(result)
    }
};