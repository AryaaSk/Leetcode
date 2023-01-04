//https://leetcode.com/problems/string-to-integer-atoi/

function myAtoi(s: string): number {
    s = s.replace(" ", ""); //remove whitespace 1
    s = s.replace(" ", ""); //remove whitespace 2
    s = s.replace("   ", ""); //remove whitespace 3

    const negative = (s[0] == "-") ? true : false;
    if (negative == true) {
        s = s.slice(1, s.length);
    }

    const sList = s.split(""); //remove characters which aren't numbers
    let i = 0;
    while (i != sList.length) {
        if (isNaN(Number(sList[i])) == true && sList[i] != "-") {
            sList.splice(i, 1);
        }
        else {
            i += 1;
        }
    }
    s = sList.join("");

    let value = Number(s);
    if (negative == true) {
        value *= -1;
    }

    return value;
};

//keeps failing but I don't know what this question is asking me to do..