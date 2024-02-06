class Solution(object):
    def findDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """

        #first find point in cycle where fast and slow meet (guaranteed to exist since there is at least one repeated element <- pigeonhole principle, integers from 1 -> n in a container of size (n+ 1))
        fast = nums[0]
        slow = nums[0]
        while True:
            fast = nums[nums[fast]]
            slow = nums[slow]
            if fast == slow:
                break

        #Floyd's Hare and Tortoise algorithm states that the distance from the start of the list to this meeting point is a multiple of the length of the loop
        #Move slow back to the start of the list (index 0)
        #if slow travels this distance, it will reach the meeting point; if fast travels this distance, it will end up at the same point (travelling a multiple of the loop's length cause the pointer to return to the original position)
        #this indicates the two pointers will meet at the same point on the loop if we start one at index 0 and keep the other one; and move both at the same speed
        #therefore they must've joined somewhere -> the intersection of the cycle and list (they join at the tangent, almost like fast 'picks' up slow)
        #the intersection is the only node which has 2 incoming nodes (and these are the two repeated elements)
        #therefore we know the two pointers will join paths eventually if we set them both off (starting one from index 0), and so we will just keep a lookout for when both point to the same index (the current num will be the repeated element)
        slow = nums[0]

        while fast != slow: #fast and slow are the current node values as well (they are used as indices as well, however)
            fast = nums[fast]
            slow = nums[slow]
        
        return fast

    
solution = Solution()
print(solution.findDuplicate([3,1,3,4,2]))