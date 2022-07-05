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