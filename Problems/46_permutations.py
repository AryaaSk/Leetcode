class Solution(object):
    def permute(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        
        #we want to construct an array of length nums
        #e.g. nums = [1, 2, 3]
        #array[0] = 1 or 2 or 3
        #array[1] = 1 or 2 or 3 excluding prior choice
        #array[2] = 1 or 2 or 3 excluding prior 2 choices

        permutations = []

        def AddItem(currentArray, choices):
            if len(currentArray) == len(nums):
                permutations.append(currentArray)
                return

            for i in range(len(choices)):
                choice = choices[i]
                
                AddItem(currentArray + [choice], [option for option in choices if option != choice])

        AddItem([], nums)

        return permutations
