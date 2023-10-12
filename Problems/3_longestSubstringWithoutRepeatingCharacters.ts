//abcabcbb

//left and right pointer, and the range between them represents the current substring
//as right pointer moves forward, we want to keep track of all prior letters in the substring, as well as the indices at which they occur (in a hashmap)
//if we run into a repeat, then we can move the left pointer to just after the index of the repeated character (the first one)
//everytime right is incremented, we keep track of the longest substring

//e.g.

//abcabcbb
//lr
//l r
//l  r -> now that a is a repeat, we need to move left by 1 (to remove the 'a' from the substring)
// l  r -> 'b' is a repeat now, so increment l again
//...


function lengthOfLongestSubstring(s: string): number {
    if (s.length == 0) return 0;

    let [left, right] = [0, 0];
    const priorCharacters: Map<string, number> = new Map();

    let maxSubstringLength = 1;

    while (right != s.length) {
        const currentLetter = s[right];

        //check if the current letter is a repeat
        if (priorCharacters.has(currentLetter) && priorCharacters.get(currentLetter) >= left) { //we need to check the index is >= left, otherwise it could just be the remains of a previous substring
            const priorIndex = priorCharacters.get(currentLetter);
            left = priorIndex + 1; //to remove the current letter from the substring
        }

        //now we know the left and right bounds are valid, and we can update the letter to have its new index
        priorCharacters.set(currentLetter, right);
        const substringLength = right - left + 1;
        if (substringLength > maxSubstringLength) maxSubstringLength = substringLength;

        right += 1;
    }

    return maxSubstringLength;
};

console.log(lengthOfLongestSubstring("abba"));