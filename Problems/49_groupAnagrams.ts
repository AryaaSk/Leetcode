function groupAnagrams1(strs: string[]): string[][] {
    //letterCounts: [0, 0, 1, 0 .... 0] -> 26 elements, each element represents a letter

    const anagramGroups: { words: string[], letterCounts: number[] }[] = [];
    //letterCounts is based on a similar principle to the original anagram question

    for (const string of strs) {
        const stringLetterCount = GenerateLetterCount(string);

        //check if it belongs in any of the pre-existing anagram groups
        let addedToGroup = false;
        for (const anagramGroup of anagramGroups) {
            if (arraysEqual(anagramGroup.letterCounts, stringLetterCount)) {
                anagramGroup.words.push(string);
                addedToGroup = true;
                break;
            }
        }

        //otherwise add it to its own separate
        if (addedToGroup == false) {
            anagramGroups.push( { words: [string], letterCounts: stringLetterCount } );
        }
    }

    const words = [];
    for (const anagramGroup of anagramGroups) {
        words.push(anagramGroup.words);
    }
    return words;
};

const GenerateLetterCount = (word: string) => {
    const letterCounts = new Array(26).fill(0);
    for (const letter of word) {
        const letterIndex = letter.charCodeAt(0) - 97;
        letterCounts[letterIndex] += 1;
    }
    return letterCounts;
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

//console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));



//assign each string a unique code to represent the digits it contains
//can then match other strings to this string using this code

function groupAnagrams(strs: string[]): string[][] {
    const anagramGroups: { [code: string] : string[] } = {};

    for (const string of strs) {
        const anagramCode = GenerateAnagramCode(string);

        if (anagramGroups[anagramCode] != undefined) { //check if the code already exists as a group
            anagramGroups[anagramCode].push(string)
        }
        else {
            anagramGroups[anagramCode] = [string];
        }
    }

    return Object.values(anagramGroups);
}

const GenerateAnagramCode = (string: string) => {
    return [...string].sort().join(""); //simply just sorted order
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));