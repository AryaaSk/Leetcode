//https://leetcode.com/problems/longest-substring-without-repeating-characters/

function lengthOfLongestSubstring(s: string): number {
    //go through string, and for each letter add it to a dictionary, and check if it already existed.
    //once you get a repeat then you stop, save that score and start again from where the original letter was repeated

    let i = 0;
    let letterStore: { [letter: string] : number } = {}; //[letter: index]
    let longestSubstring = 0;
    while (i != s.length) {
        const letter = s[i];

        if (letterStore[letter] == undefined) { //letter has not been repeated
            letterStore[letter] = i;
        }
        else {
            const substringLength = Object.keys(letterStore).length //just check length of letterScore
            if (substringLength > longestSubstring) {
                longestSubstring = substringLength
            }

            i = letterStore[letter] + 1; //go to that position + 1 (the letter in front of the repeated one)
            letterStore = {};
            const newLetter = s[i];
            letterStore[newLetter] = i; //start again
        }
        i += 1;
    }

    //check again since the substring may have just continued at the end without repeating
    const substringLength = Object.keys(letterStore).length //just check length of letterScore
    if (substringLength > longestSubstring) {
        longestSubstring = substringLength
    }

    return longestSubstring;
};