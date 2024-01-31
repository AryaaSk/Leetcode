class Solution(object):
    def search(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: int
        """
        
        #use binary search to find target
        left = 0
        right = len(nums) - 1 #[left, right] represents the current interval being searched

        while left < right:
            midpoint = (left + right) // 2
            
            if target > nums[midpoint]: #discard left side of list
                left = midpoint + 1
            else: #target <= nums, so we discard right side but keep midpoint
                right = midpoint
            
        #left == right, so check if index is correct
        return left if nums[left] == target else -1
