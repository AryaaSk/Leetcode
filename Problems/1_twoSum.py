class Solution(object):
    def twoSum(self, nums, target):
        #the index function start from the front, therefore we want to start from the end and use index() to find the complimentary number to each number
        for (i, num) in enumerate(reversed(nums)):
            currentIndex = len(nums) - 1 - i #remember that we need to return the index based on the original list
            complimentaryNum = target - num #the number which must be added to num to sum to the target

            try:
                complimentaryIndex = nums.index(complimentaryNum)

                if complimentaryIndex != currentIndex:
                    return [currentIndex, complimentaryIndex]
            except:
                pass #complimentary num doesn't exist

solution = Solution()
print(solution.twoSum([2,1,9,4,4,56,90,3], 8))