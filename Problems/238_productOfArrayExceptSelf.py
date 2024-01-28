class Solution(object):
    def productExceptSelf(self, nums):
        """
        :type nums: List[int]
        :rtype: List[int]
        """
        
        #create 2 lists
        #first list is product at each index starting from the left
        #second list is product at each index starting from right
        #in each array, we find the cumulative product starting from each end to each specific index
        #e.g. nums = [1,2,3,4]
        # fromLeft = [1, 2, 6, 24]
        # fromRight = [24, 24, 12, 4]
        
        #for each index i in nums, we can calculate the product of all except nums[i] using product of 0 -> (i - 1) * product of (i + 1) -> (len(nums) - 1)
        #this is equivalent to fromLeft[i - 1] * fromRight[i + 1]

        productsFromLeft = [1] * len(nums)
        for i in range(len(nums)):
            productsFromLeft[i] = nums[i] * productsFromLeft[i - 1] #if i = 0, i - 1 = -1, thus last item will be accessed and productsFromLeft is initiallised with all 1s so this should be fine

        #we only need the productsFromLeft, and then we can simply mutate these products from reverse as we generate productsFromRight
        productFromRight = 1
        for i in range(len(nums) - 1, 0, -1):
            productsFromLeft[i] = productsFromLeft[i - 1] * productFromRight
            productFromRight *= nums[i]

        #now special case when i = 0, since we cannot access productFromLeft[-1]; not to worry as output[0] is equivalent to the total productFromRight
        productsFromLeft[0] = productFromRight

        return productsFromLeft
