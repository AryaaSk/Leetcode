class Solution(object):
    def GenerateWordRepresentation(self, string):
        #convert the string into letter-array form (array of length 26, each index storing the number of occurences for that letter)
        #new technique: instead of using arrays (which are clunky), we will convert/map the an array representation into a singular number
        #every number will be unique due to uniqueness of binary/base representations
        #essentially, there are 26 place values and we are working in base 101 (the max length of a string is 100, thus there could be at max 100 of the same character, thus max place value is 100)
        #therefore we will need to be able to represent numbers upto the realm of 100 * 101^25

        """
        array = [0] * 26
        for character in string:
            index = ord(character) - 97
            array[index] += 1
        """

        """
        #Instead of creating the array, we will just add to the sum
        numericRepresentation = 0
        for character in string:
            index = ord(character) - 97 #the column the number belongs in; 'a' is in column 0, 'b' is in column 2 (i.e. reverse array)

            #the column represents the power which 101 must be raised to
            #adding 1 to this column is essentially the same as adding 1 * (101^index) to the numericRepresentation
            numericRepresentation += 101 ** index

        return numericRepresentation
        """

        return tuple(sorted(string)) #using sorted function may be faster due to implementation in C


    def groupAnagrams(self, strs):
        anagrams = {} #dictionary [representation: str[]]

        for string in strs:
            representation = self.GenerateWordRepresentation(string)

            if representation in anagrams:
                anagrams[representation].append(string)
            else:
                anagrams[representation] = [string]

        #return the dictionary as a list of lists
        return anagrams.values()


solution = Solution()
print(solution.GenerateWordRepresentation("baa"))