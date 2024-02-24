class WordDictionary(object):

    #Use trie to check if nextLetter exists after current letter
    dummy = {} #entry point; starting letter is null and this shows all possible next letters

    def __init__(self):
        self.dummy = {}

    def addWord(self, word):
        """
        :type word: str
        :rtype: None
        """

        #keep checking if next letter exists, if it doesn't then add it
        # '#' serves as the END character to determine when the word has ended
        word = word + "#"

        currentLetterOptions = self.dummy
        for nextLetter in word:
            if nextLetter not in currentLetterOptions:
                currentLetterOptions[nextLetter] = {}

            currentLetterOptions = currentLetterOptions[nextLetter]
        

    def search(self, word, **kwargs):
        """
        :type word: str
        :rtype: bool
        """

        #search for word by checking if next letter of word exists in current letter's options; if not then we know the word doesn't exist
        #if next letter is '.' then it could be anything, so we recursively call function with remainingLetters of word and starting at new node

        currentLetterOptions = kwargs.get('currentLetterOptions', self.dummy)
        if 'currentLetterOptions' not in kwargs:
            word = word + "#" #if this is the first call then we have to add the end character to word, we'd return true for a substring of a previously added word

        for i, nextLetter in enumerate(word):
            if nextLetter == ".":
                for possiblePath in currentLetterOptions:
                    pathWorks = self.search(word[i + 1:], currentLetterOptions = currentLetterOptions[possiblePath]) #return search for remaining word past '.'
                    if pathWorks == True:
                        return True
                    
                return False #if we check all possible paths and none of them work, then we return False

            if nextLetter not in currentLetterOptions:
                return False

            currentLetterOptions = currentLetterOptions[nextLetter] #increment 'pointer'

        return True #if we get through the whole string then it means the path exists in the trie
        

# Your WordDictionary object will be instantiated and called as such:
# obj = WordDictionary()
# obj.addWord(word)
# param_2 = obj.search(word)

dictionary = WordDictionary()
dictionary.addWord('apple')
print(dictionary.search('a....'))