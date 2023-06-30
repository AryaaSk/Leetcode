def findSubstring(s, words):
        """
        :type s: str
        :type words: List[str]
        :rtype: List[int]
        """
            
        concatenatedSubstringLength = len(words) * len(words[0])
        #Go through s, and extract every substring of length concatenatedSubstringLength, then run a separate function to determine whether that is a valid substring
        indices = []
        i = 0
        while i != (len(s) - concatenatedSubstringLength):
            substring = s[i : i + concatenatedSubstringLength]
            if IsSubstring(substring, words):
                indices.append(i)
            i += 1

        print(indices)

def IsSubstring(substring, words):
        #Assuming that substring is only made up of words from the words list, then they should all be of the same length
        #Split substring into its individual words
        wordLength = len(words[0])
        chunks = int(len(substring) / wordLength)
        #print(substring, words, wordLength, chunks)

        substringWords = []
        i = 0
        while i != (len(substring) / chunks):
            substringWords.append(substring[i * chunks : i * chunks + wordLength])
            i += 1

        #Now go through these substringWords, and 'tick off' when they've used a word from words
        wordsTemp = words.copy()
        for word in substringWords:
                try:
                    wordsTemp.remove(word)
                except:
                    break
        print(substringWords, wordsTemp)

        if len(wordsTemp) == 0:
            return True
        else:
            return False
    






    
        
