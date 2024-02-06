class Solution(object):
    def characterReplacement(self, s, k):
        """
        :type s: str
        :type k: int
        :rtype: int
        """
        
        #if we keep track of the most frequently occuring letter within a substring, this is the 'best' candidate to have all other letters replaced with
        # e.g. AABABBA
        
        left = 0
        right = 0
        window = {} #keeps count of [letter: numberOfOccurences]

        maxLength = 0

        mostFrequentLetterCount = 0
        while right < len(s):
            letter = s[right]
            window[letter] = window.get(letter, 0) + 1 #update letter count in current window

            if window[letter] > mostFrequentLetterCount: #update mostFrequentLetterCount
                mostFrequentLetterCount = window[letter]

            #mostFrequentLetterCount is not actually the most frequent in the current window; however we can still use it since it is just an overestimate of the most frequent letter in the window
            #we never decrease mostFrequentLetterCount, however we do both increase and decrease windowLength; when increasing windowLength mostFrequentLetterCount is accurate, and when decreasing this will cause the numberOfKsRequired to be greater than the true value, thus preventing false positives
            #windowLength = right - left + 1
            #kRequired = windowLength - mostFrequentLetterCount
            while (right - left + 1 - mostFrequentLetterCount > k):
                window[s[left]] -= 1
                left += 1
            
            maxLength = max(maxLength, right - left + 1)
            right += 1

        return maxLength



solution = Solution()
print(solution.characterReplacement("AABABBA", 1))