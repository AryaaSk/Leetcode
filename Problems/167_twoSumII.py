class Solution(object):
    def twoSum(self, numbers, target):
        """
        :type numbers: List[int]
        :type target: int
        :rtype: List[int]
        """
        
        #use a left and right pointer on either side of numbers
        #since numbers is sorted, the left pointer will initially point to the lowest item and the right pointer will initially point to the greatest item
        #then we find the sum of the two numbers stored at these indices
        #if the sum is lower than the target, then we can increase the sum by incrementing left by 1; if the sum is greater than the target then we can decrement the sum by decrementing right by 1
        #this will always hone closer to the target if the sum isn't the target, and thus will always eventually find the correct unique solution

        (left, right) = (0, len(numbers) - 1)

        while left < right: #afterwards we are just repeating, since left will be on the 'greater half' and right will be on the 'lower half' (we should find our solution before this loop ends)
            numSum = numbers[left] + numbers[right]

            if numSum == target:
                return [left + 1, right + 1]
            elif numSum < target: #increase sum -> increment left
                left += 1
            else: #decrease sum -> decrement right
                right -= 1

        

