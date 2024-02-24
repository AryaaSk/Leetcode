class Solution(object):
    def combinationSum(self, candidates, target):
        """
        :type candidates: List[int]
        :type target: int
        :rtype: List[List[int]]
        """
        
        #backtrack to go through candidates; decision: either use current element again, or move onto next element; repeat while sum < target (if sum == target add to combinations, if sum > target then just return)
        combinations = []

        currentCombination = []
        currentSum = 0

        def AddToCombination(index):
            nonlocal currentSum

            if currentSum == target:
                combinations.append(currentCombination.copy())
                return
            elif currentSum > target:
                return
            elif index == len(candidates):
                return

            num = candidates[index]
            currentCombination.append(num)
            currentSum += num

            AddToCombination(index) #since we can include the current candidate again

            currentCombination.pop() #backtrack; after this point we've added too many of the current element since it's either caused a valid combination or exceeded the target
            currentSum -= num

            AddToCombination(index + 1)

        AddToCombination(0)
        return combinations