class Solution(object):
    def containsDuplicate(self, nums):
        #Convert to set and check if its the same length
        numsSet = set(nums)
        return not len(numsSet) == len(nums)

solution = Solution()
print(solution.containsDuplicate([1,2,3,1]))