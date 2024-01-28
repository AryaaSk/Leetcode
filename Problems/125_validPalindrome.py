import re


class Solution(object):
    def isPalindrome(self, s):
        #we are only interested in alphanumeric characters, therefore we can simply create a new string with those characters removed and check if its equivalent to its reversed version
        #filteredString = ''.join([char.lower() for char in s if char.isalnum()]) #using list comprehension and isalnum() function (returns true if string is made entirely of alphanumeric characters)

        filteredString = s.lower()
        filteredString = re.sub(r'[^a-z0-9]+', '', filteredString)

        return filteredString == filteredString[::-1] #slice in reverse to get reversed version of string

solution = Solution()
print(solution.isPalindrome(".,"))