//trying to check whether s1 is a substring of s2, however we only care about the letters themselves rather than the order
//e.g. ab is a substring ot baa

//for this, we can simply convert s1 from a string into a representation which only accounts for the number of each letter, e.g. an array of length 26 with each index representing a number

function checkInclusion(s1: string, s2: string): boolean {
    if (s1.length > s2.length) return false;
    const s1Represenation = GenerateLettersRepresentation(s1);

    //now use the sliding window method, with a window the same width as s1, convert into the same representation and check
    const windowLength = s1.length;
    
    const letterCounts = new Array(26).fill(0);
    for (let i = 0; i != windowLength - 1; i += 1) {
        const ascii = s2[i].charCodeAt(0);
        const index = ascii - 97;
        letterCounts[index] += 1;
    }

    for (let i = windowLength; i <= s2.length; i += 1) {
        //substring: [i - windowLength, i]
        //within this substring, we don't need to generate a new representation each time, as we can simply update with the letters which are added and removed
        const newLetter = s2[i - 1];
        letterCounts[newLetter.charCodeAt(0) - 97] += 1;

        //check if window is another representation of s1
        //need to increase speed by using another method of comparing without converting to string
        if (arraysEqual(s1Represenation, letterCounts)) return true;

        //update letter counts
        const removeLetter = s2[i - windowLength];
        letterCounts[removeLetter.charCodeAt(0) - 97] -= 1;
    }

    return false;
};

const GenerateLettersRepresentation = (substring: string) => {
    const letters = new Array(26).fill(0);
    for (const letter of substring) {
        const ascii = letter.charCodeAt(0);
        const index = ascii - 97;
        letters[index] += 1;
    }
    return letters;
}

function arraysEqual(a, b) { //https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

console.log(checkInclusion("ab", "ba"));