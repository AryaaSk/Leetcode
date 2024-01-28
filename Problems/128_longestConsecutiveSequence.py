class Solution(object):
    def longestConsecutive(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        
        #e.g. nums = [0,3,7,2,5,8,4,6,0,1]
        #this problem is related to simply checking if consecutive numbers exist within a list
        #it's very useful if we know we are at the minimum of a streak, therefore we will skip nums which we know aren't the minimum

        nums = set(nums) #use a set to get O(1) lookup times - assuming all items in nums are unique

        greatestLength = 0

        for num in nums:
            if (num - 1) in nums:
                continue #since num - 1 is also in nums, there is a streak starting from (nums - 1), and thus num isn't the minimum, hence we will skip it
            
            #otherwise we now know num is the minimum of its set
            #we can simply go up and count how long this streak is
            currentNum = num
            streakLength = 0
            while currentNum in nums:
                streakLength += 1
                currentNum += 1

            if streakLength > greatestLength:
                greatestLength = streakLength

            if streakLength > len(nums) // 2: #we can instantly return since we know there cannot be a streak longer than this one (since this streak already takes up half the list)
                return streakLength

        return greatestLength