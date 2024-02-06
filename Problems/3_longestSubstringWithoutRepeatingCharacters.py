class Solution(object):
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        
        #keep track of current window using hashmap
        left = 0
        right = 0 #interval [left, right] represents current substring
        window = {} #stores [ letter : index ]

        maxSubstringLength = 0

        while right < len(s):
            currentLetter = s[right]
            if currentLetter in window and window[currentLetter] >= left: #run into a repeated character (check if the current letter is in the window)
                left = window[currentLetter] + 1 #reset window: bring left pointer to item after previously repeated item

            window[currentLetter] = right

            #check and possibly update substring length
            maxSubstringLength = max(maxSubstringLength, right - left + 1)

            right += 1

        return maxSubstringLength
    
solution = Solution()
solution.lengthOfLongestSubstring("dvdf")