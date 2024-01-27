class Solution(object):
    def ConvertToArray(self, string):
        array = [0] * 26

        for character in string:
            index = ord(character) - 97
            array[index] += 1
        
        return array

    def isAnagram(self, s, t):
        #can be done using hashmap
        #could also be done by sorting both s and t alphabetically and then rearranging
        #create array of length 26, each element represents the number of that specific letter in s

        """
        sArray = self.ConvertToArray(s)
        tArray = self.ConvertToArray(t)

        return sArray == tArray
        """
    
        if len(s) != len(t):
            return False

        #for each letter in s, we check if it has the same count in t; if there is a single instance where this is false we can return false
        #this allows us to early break if false, and still complete in O(n) time if true
        sSet = set(s)
        for character in sSet:
            if s.count(character) != t.count(character):
                return False

        return True