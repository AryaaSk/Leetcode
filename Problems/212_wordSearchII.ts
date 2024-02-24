class Trie {
    entry: { [k: string] : any } = {};

    constructor() {
        this.entry = {};
    }

    insert(word: string): void {
        word = word + "#"; //END character
        let nextPossibleLetters = this.entry;        

        for (const letter of word) {
            //check if letter is a next possible path from the current node
            if (nextPossibleLetters[letter] == undefined) {
                //this path doesn't exist yet, so let's create it
                nextPossibleLetters[letter] = {};
            }

            nextPossibleLetters = nextPossibleLetters[letter];
        }
    }

    startsWith(prefix: string): boolean {
        let nextPossibleLetters = this.entry;
        
        for (const letter of prefix) {
            //check if letter is a possible path; if not then the prefix doesn't exist in the Trie, so return false
            if (nextPossibleLetters[letter] == undefined) {
                return false;
            }
            nextPossibleLetters = nextPossibleLetters[letter]
        }

        return true;
    }

    search(word: string): boolean {
        return this.startsWith(word + "#"); //search for entire word with END character
    }
}



function findWords(board: string[][], words: string[]): string[] {
    //use trie; from each position on the board, execute a depth first search: first check if current prefix exists in trie, then check if current prefix exists as a word
    const trie = new Trie();
    for (const word of words) {
        trie.insert(word);
    }

    const wordSet = new Set(words);
    const foundWords: string[] = [];

    const dfs = (currentWord: string, visited: Set<string>, currentRow: number, currentCol: number) => {
        if (visited.has(String([currentRow, currentCol]))) {
            return;
        }

        if (currentRow < 0 || currentRow >= board.length || currentCol < 0 || currentCol >= board[0].length) {
            return;
        }

        visited.add(String([currentRow, currentCol]));
        currentWord += board[currentRow][currentCol];

        if (trie.startsWith(currentWord)) {
            //current word is a prefix in the trie; now we need to check if it is a full word that we haven't found before
            if (wordSet.has(currentWord) && trie.search(currentWord) == true) {
                foundWords.push(currentWord);
                wordSet.delete(currentWord);
            }

            //continue dfs regardless if word was a full word or not
            dfs(currentWord, visited, currentRow - 1, currentCol);
            dfs(currentWord, visited, currentRow + 1, currentCol);
            dfs(currentWord, visited, currentRow, currentCol - 1);
            dfs(currentWord, visited, currentRow, currentCol + 1);
        }
        
        //no point continuing if there are no matching words in trie; before we return we remove our tracks
        visited.delete(String([currentRow, currentCol]))
    }

    for (let row = 0; row < board.length; row += 1) {
        for (let col = 0; col < board[row].length; col += 1) {
            dfs("", new Set(), row, col);
        }
    }

    return foundWords;
};