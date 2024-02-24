class Solution(object):
    def subsets(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        
        subsets = []
        
        currentSubset = [] #use a common subset tracker, go through each index in nums and decide whether to include or not include the current element
        def AddToSubset(index):
            if index == len(nums): #base case => we've gone through the entire array
                subsets.append(currentSubset.copy())
                return

            currentSubset.append(nums[index]) #include current element in subset
            AddToSubset(index + 1)

            #don't include current element in subset
            currentSubset.pop() #remove the element we just added
            AddToSubset(index + 1)

        AddToSubset(0)

        return subsets

solution = Solution()
print(solution.subsets([1, 2]))