//https://leetcode.com/problems/reverse-integer/

const reverseString = (s: string) => {
    let returnString = "";
    for (let i = s.length - 1; i != -1; i -= 1) {
        returnString += s[i];
    }
    return returnString;
}

function reverse(x: number): number {
    const negative = (x < 0) ? true : false;
    if (negative == true) {
        x *= -1;
    }

    let reversed = Number(reverseString(String(x)));
    if (negative == true) {
        reversed *= -1;
    }

    if (reversed < -(2**31) || reversed > 2**31 - 1) { //outside 32 bit integer range
        reversed = 0;
    }

    return reversed;
};