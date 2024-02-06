class Solution(object):
    def minWindow(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: str
        """
        
        tLetters = [0] * 58
        for char in t:
            tLetters[ord(char) - 65] += 1

        #now subtract from tLetters when going through s until max(tLetters) <= 0
        #after this point, we can start trying to decrease the window size

        minSubstring = ""

        left = 0
        right = 0
        while right < len(s):
            letter = s[right]

            tLetters[ord(letter) - 65] -= 1

            while max(tLetters) <= 0:
                #current window is valid
                minSubstring = s[left : right + 1] if right - left + 1 < len(minSubstring) or minSubstring == "" else minSubstring

                tLetters[ord(s[left]) - 65] += 1
                left += 1

            right += 1

        return minSubstring
        