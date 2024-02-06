class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: float
        """

        #median is given by ((len - 1) / 2)th element

        #nums1 = [1, 2]
        #nums2 = [3, 4]

        #median will be at ((4 - 1) / 2) -> 1.5th element (mean of nums[1] and nums [2])
        #therefore we need to get through the first 1 element(s)
        #keep track of how many elements have been elapsed

        #implement binary search on nums1 first; split list down midpoint into 2 lists: <= midpoint and > midpoint
        #within this midpoint, we split nums2 into 2 lists based on the critical value (midpoint); therefore we need to find the greatest item which is <= midpoint;
        #this can be implemented in binary search; check the cumulative length of both first halfs - if it is == approx. half of total list length, then we can now find our median easily

        nums1Left = 0
        num1sRight = len(nums1) - 1
        
        while True:
            nums1Midpoint = (nums1Left + num1sRight) // 2
            nums1MidpointValue = nums1[nums1Midpoint]

            #now split nums2 into two lists: lower than or equal to midpoint and greater than midpoint
            left = 0
            right = len(nums2) - 1
            while left < right:
                nums2Midpoint = (left + right + 1) // 2 #use higher mean since we will include left if it's valid, so we don't want the left pointer to get stuck

                if nums2[nums2Midpoint] <= nums1MidpointValue: #currently valid, however there could be an element greater which is still <= nums1Midpoint
                    left = nums2Midpoint
                else: #invalid, current nums2 num must be too large, so we need to reduce the midpoint
                    right = nums2Midpoint - 1

            #now left and right have honed onto the best candidate
            #it is still possible that nums2[left] > nums1MidpointValue, in which case all items in nums2 are too large

            #we can calculate the length of the cumulative 'first half'
            firstHalfLength = (nums1Midpoint + 1) + (left + 1)

            #if the total length is even, the target length is total length / 2 rounded up; if total length is odd, then the target length is still total length // 2 rounded up (we just take the first item from the second list)
            targetLength = (len(nums1) + len(nums2) + 1) // 2

            if firstHalfLength == targetLength:
                #correct target length, now just determine median
                if (len(nums1) + len(nums2) % 2 == 1):
                    return nums1[nums1Midpoint]
                else:
                    firstItemNums1SecondHalf = nums1[nums1Midpoint + 1] if nums1Midpoint != (len(nums1) - 1) else float('inf')
                    firstItemNums2SecondHalf = nums2[left + 1] if left != (len(nums2) - 1) else float('inf')
                    print(nums1[nums1Midpoint], firstItemNums1SecondHalf, firstItemNums2SecondHalf)

                    return ((float(nums1[nums1Midpoint]) + min(firstItemNums1SecondHalf, firstItemNums2SecondHalf))) / 2
            elif firstHalfLength < targetLength:
                #not enough items in the first half, likely since midpoint value of nums1 was too low -> increase midpoint value of nums1
                nums1Left = nums1Midpoint + 1
            else:
                #too many items in first half, decrease midpoint value of nums1
                num1sRight = nums1Midpoint - 1

solution = Solution()
print(solution.findMedianSortedArrays([1,3], [2, 7]))