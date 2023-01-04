//https://leetcode.com/problems/regular-expression-matching/submissions/
function isMatch(s, p) {
    //go through p, and check if s is matching, repeat until you find something wrong
    const regex = p;
    const test = s.split(''); //convert to list to make easy modifications
    let i = 1;
    while (i != regex.length) {
        const lastLetter = regex[i - 1];
        const letter = regex[i];
        const testLetter = test[0];
        if (testLetter == undefined) {
            break; //finished checking
        }
        let failed = true;
        let extraInfo = "";
        if (letter == test[0]) {
            failed = false;
        }
        else if (letter == "*" && (lastLetter == testLetter || lastLetter == ".")) {
            failed = false;
        }
        else if (letter == ".") {
            failed = false;
        }
        if (letter == "*" && !(lastLetter == testLetter || lastLetter == ".")) {
            //s = 'aab', p = 'c*a*b*'
            failed = false;
            extraInfo = "nothingWildcard";
        }
        if (failed == true) {
            return false;
        }
        if (letter != "*") {
            if (extraInfo != "nothingWildcard") {
                i += 1;
            }
        }
        test.splice(0, 1);
    }
    if (test.length == 0) {
        return true;
    }
    else {
        return false; //regex was not enough to cover text
    }
}
;
//May try later, only have 169/353 matches, I believe I have got upto 352/353 before (in python - time limit), however this problem seems to be very complicated
function intToRoman(num) {
    //split number into the basic Roman parts:
    const numeralMap = {
        1: "I",
        5: "V",
        10: "X",
        50: "L",
        100: "C",
        500: "D",
        1000: "M"
    };
    //similar to coin denominations, split into fewest number of denominations possible
    const denominations = [1, 5, 10, 50, 100, 500, 1000].reverse();
    const currentDenominations = [];
    let value = num;
    while (true) {
        for (const denomination of denominations) {
            if (denomination <= value) {
                value -= denomination;
                currentDenominations.push(denomination);
                break;
            }
        }
        if (value == 0) {
            break;
        }
    }
    //now need a mechanism to convert numbers such as 4 from [1, 1, 1, 1] to [5, 1]
    //this is because 4 would not be IIII, but instead IV
    let i = 0;
    while (i < currentDenominations.length - 3) {
        //check for quadruple repeats
        const [a, b, c, d] = [currentDenominations[i], currentDenominations[i + 1], currentDenominations[i + 2], currentDenominations[i + 3]];
        if (a == b && b == c && c == d) {
            //find current denomination and above denomination
            const currentDenomination = a;
            let higherDenomination = -1;
            for (let a = 0; a != denominations.length; a += 1) {
                if (denominations[a] == currentDenomination) {
                    higherDenomination = denominations[a - 1];
                }
            }
            currentDenominations.splice(i, 4, currentDenomination, higherDenomination);
            i -= 2;
        }
        else {
            i += 1;
        }
    }
    //similarly, need to convert numbers like 9 from [5, 4] to [10, 1]
    //or 90 from [50, 40] to [100, 10]
    //this would be identified in the current stucture, as 90 = [50, 10, 50], so look for 2 repeating elements which start with 5
    i = 0;
    while (i < currentDenominations.length - 2) {
        const currentLetter = currentDenominations[i];
        const letter2Infront = currentDenominations[i + 2];
        if (currentLetter == letter2Infront && String(currentLetter)[0] == "5") {
            //e.g. [500, 100, 500] -> [100, 1000]
            currentDenominations[i] = currentDenominations[i + 1];
            currentDenominations[i + 1] = currentLetter * 2;
            currentDenominations.splice(i + 2, 1);
            i += 2; //since we removed 1 item, and the next item was affected by this change
        }
        else {
            i += 1;
        }
    }
    console.log(currentDenominations);
    let returnNumeral = "";
    for (const denomination of currentDenominations) {
        returnNumeral = returnNumeral + numeralMap[denomination];
    }
    return returnNumeral;
}
;
// https://leetcode.com/problems/two-sum/
function twoSum(nums, target) {
    //could just go through every item and check every other item, however that is inefficient
    //go through list once, and store number + index in a dictionary, then check if the other number required already exists
    const numbers = {}; //[ Number: Index ]
    for (let i = 0; i != nums.length; i += 1) {
        const num = nums[i];
        if (numbers[target - num] != undefined) {
            const index = i;
            const otherIndex = numbers[target - num];
            return [index, otherIndex];
        }
        else {
            numbers[num] = i;
        }
    }
    return [];
}
;
function strStr(haystack, needle) {
    //look through haystack, create new string each time and use StartsWith() function
    let index = -1;
    for (let i = 0; i != haystack.length; i += 1) {
        const substring = haystack.substring(i, haystack.length);
        if (substring.startsWith(needle)) {
            index = i;
            break;
        }
    }
    return index;
}
;
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
function divide(dividend, divisor) {
    let result = dividend / divisor;
    if (result > 2147483647) {
        result = 2147483647;
    }
    else if (result < -2147483648) {
        result = -2147483648;
    }
    if (result < 0) {
        return Math.ceil(result);
    }
    else {
        return Math.floor(result);
    }
}
;
//https://leetcode.com/problems/add-two-numbers/
class ListNode {
    val;
    next;
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}
function addTwoNumbers(l1, l2) {
    const [list1, list2] = [convertLinkedListArray(l1).reverse(), convertLinkedListArray(l2).reverse()];
    const [num1, num2] = [BigInt(list1.join("")), BigInt(list2.join(""))];
    const result = num1 + num2;
    const resultReversedString = String(result).split("").reverse().join(""); //converting to string -> list -> reversed -> string
    const resultReversedArray = Array.from(String(resultReversedString), Number);
    return convertArrayToLinkedList(resultReversedArray);
}
;
const convertLinkedListArray = (li) => {
    const array = [];
    let currentNode = li;
    while (true) {
        array.push(currentNode.val);
        if (currentNode.next == null) {
            break;
        }
        else {
            currentNode = currentNode.next;
        }
    }
    return array;
};
const convertArrayToLinkedList = (array) => {
    let linkedList = new ListNode(array[array.length - 1], null);
    for (let i = array.length - 2; i != -1; i -= 1) {
        const newLinkedList = new ListNode(array[i], linkedList);
        linkedList = newLinkedList;
    }
    return linkedList;
};
//https://leetcode.com/problems/longest-substring-without-repeating-characters/
function lengthOfLongestSubstring(s) {
    //go through string, and for each letter add it to a dictionary, and check if it already existed.
    //once you get a repeat then you stop, save that score and start again from where the original letter was repeated
    let i = 0;
    let letterStore = {}; //[letter: index]
    let longestSubstring = 0;
    while (i != s.length) {
        const letter = s[i];
        if (letterStore[letter] == undefined) { //letter has not been repeated
            letterStore[letter] = i;
        }
        else {
            const substringLength = Object.keys(letterStore).length; //just check length of letterScore
            if (substringLength > longestSubstring) {
                longestSubstring = substringLength;
            }
            i = letterStore[letter] + 1; //go to that position + 1 (the letter in front of the repeated one)
            letterStore = {};
            const newLetter = s[i];
            letterStore[newLetter] = i; //start again
        }
        i += 1;
    }
    //check again since the substring may have just continued at the end without repeating
    const substringLength = Object.keys(letterStore).length; //just check length of letterScore
    if (substringLength > longestSubstring) {
        longestSubstring = substringLength;
    }
    return longestSubstring;
}
;
//https://leetcode.com/problems/median-of-two-sorted-arrays/
function findMedianSortedArrays(nums1, nums2) {
    //first merge the 2 arrays
    let merged = [];
    while (true) {
        if (nums1.length == 0) {
            merged = merged.concat(nums2);
            break;
        }
        else if (nums2.length == 0) {
            merged = merged.concat(nums1);
            break;
        }
        if (nums1[0] < nums2[0]) {
            merged.push(nums1[0]);
            nums1.splice(0, 1);
        }
        else {
            merged.push(nums2[0]);
            nums2.splice(0, 1);
        }
    }
    const medianIndex = (merged.length + 1) / 2 - 1; //-1 because in maths they start counting from 1 instead of 0
    if (medianIndex % 1 != 0) {
        const num1 = merged[medianIndex - 0.5];
        const num2 = merged[medianIndex + 0.5];
        return (num1 + num2) / 2;
    }
    else {
        return merged[medianIndex];
    }
}
;
//https://leetcode.com/problems/longest-palindromic-substring/
/*
function longestPalindrome(s: string): string {
    //brute force, just find every word and check if its a palindrome
    let longestPalindrome = "";
    for (let i = 0; i != s.length; i += 1) {
        for (let a = i; a != s.length + 1; a += 1) {
            const word = s.substring(i, a);
            if (isPalindrome(word) == true) {
                if (word.length > longestPalindrome.length) {
                    longestPalindrome = word;
                }
            }
        }
    }

    return longestPalindrome;
};

const isPalindrome = (word: string) => {
    const reverse = word.split("").reverse().join("");
    if (word == reverse) {
        return true;
    }
    else {
        return false;
    }
}
*/
//Brute force will not work, I get time limit exceeded error
//https://leetcode.com/problems/zigzag-conversion/
//order s into the pattern, then read row by row
//PAYPALISHIRING
//P     I     N
// A   L S   I G
//  Y A   H R
//   P     I
function convert(s, numRows) {
    if (numRows == 1) {
        return s; //dont need to do anything if its all on 1 row
    }
    const rows = [];
    for (let i = 0; i != numRows; i += 1) {
        rows.push([]);
    }
    let pointer = 0;
    let ascDesc = 1; //asc = 1, desc = -1
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
}
;
//https://leetcode.com/problems/reverse-integer/
const reverseString = (s) => {
    let returnString = "";
    for (let i = s.length - 1; i != -1; i -= 1) {
        returnString += s[i];
    }
    return returnString;
};
function reverse(x) {
    const negative = (x < 0) ? true : false;
    if (negative == true) {
        x *= -1;
    }
    let reversed = Number(reverseString(String(x)));
    if (negative == true) {
        reversed *= -1;
    }
    if (reversed < -(2 ** 31) || reversed > 2 ** 31 - 1) { //outside 32 bit integer range
        reversed = 0;
    }
    return reversed;
}
;
//https://leetcode.com/problems/string-to-integer-atoi/
function myAtoi(s) {
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
}
;
//keeps failing but I don't know what this question is asking me to do..
