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
