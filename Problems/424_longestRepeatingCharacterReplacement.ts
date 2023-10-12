//AABABBA, k = 1

//brute force
//we test each letter in the string and see how far we can go

function characterReplacement(s: string, k: number): number {
    //use sliding window to create a 'substring'
    //to check if this substring is valid (can become all 1 letter using at most k replacements), we count up the occurences of each letter within the substring, subtract each from the window length (which gives us the replacements needed to make the substring valid), and then check if this value is <= k
    //this letter count can be maintained as the window slides (rather than reseting each time)
    //if the substring is valid, the window expands (right += 1), and if not valid, the window gets smaller from the left (left += 1); also update the letter count when sliding

    const windowLetterCount = new Map();
    windowLetterCount.set(s[0], 1); //initially add first letter to the count
    const mostCommonLetter = { letter: s[0], count: 1 }; //will be updated everytime window slides

    let maxSubstringLength = 1;

    let [left, right] = [0, 0]; 
    while (right < s.length) {  
        // we know the count/distribution of letters within this substring (s[left, right + 1]), as well as the most common letter
        const substringLength = (right + 1) - left;
        const replacementsNeeded = substringLength - mostCommonLetter.count;

        if (replacementsNeeded <= k) { //valid substring, so update maxSubstringLength
            maxSubstringLength = Math.max(maxSubstringLength, substringLength);

            //update window and count
            right += 1;
            const newLetter = s[right];
            if (windowLetterCount.has(newLetter)) {
                const occurences = windowLetterCount.get(newLetter);
                windowLetterCount.set(newLetter, occurences + 1);

                //check to update mostCommonLetter
                if (occurences + 1 >= mostCommonLetter.count) {
                    mostCommonLetter.letter = newLetter
                    mostCommonLetter.count = occurences + 1;
                }
            }
            else {
                windowLetterCount.set(newLetter, 1);
            }
        }
        else {
            //invalid, so we need to reduce the size of the window, thus we will increase left by 1
            const removedLetter = s[left];
            left += 1;

            //update count (remove 1 from the letter removed), this letter is guaranteed to be in the letterCountMap
            const occurences = windowLetterCount.get(removedLetter);
            windowLetterCount.set(removedLetter, occurences - 1);

            //also may have to update most common letter (for this we cannot simply -1 if the mostCommonLetter is removedLetter, as there could be another letter with the same number of occurences)
            for (const pair of windowLetterCount) {
                const [letter, count] = pair;

                if (count >= mostCommonLetter.count) {
                    mostCommonLetter.letter = letter;
                    mostCommonLetter.count = count;
                }
            }
        }
    }

    return maxSubstringLength;
};

console.log(characterReplacement('ABAB', 0)); 