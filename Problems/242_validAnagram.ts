function isAnagram(s: string, t: string): boolean {
    if (s.length != t.length) {
        return false;
    }
    //assume lengths are equal from here

    //create a single shared array of 26 elements (each element represents a letter)
    const letterMap = new Array(26).fill(0);

    //for each letter in s, add 1, and for each letter in t, subtract 1
    //therefore at the end, if all elements in the array are 0 - they are anagrams
    for (let i = 0; i != s.length; i += 1) { //s.length = t.length
        const [sLetter, tLetter] = [s[i], t[i]];

        //need to convert letters -> indexes, e.g. a -> 0, b -> 1 ... z -> 25 (only lowercase)
        const [sIndex, tIndex] = [sLetter.charCodeAt(0) - 97, tLetter.charCodeAt(0) - 97];

        letterMap[sIndex] += 1;
        letterMap[tIndex] -= 1;
    };
    
    //finally check if all elements are 0
    for (const count of letterMap) {
        if (count != 0) {
            return false;
        }
    }
    return true;
};


console.log(isAnagram("rat", "car"));