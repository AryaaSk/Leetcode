class Solution(object):
    def minEatingSpeed(self, piles, h):
        """
        :type piles: List[int]
        :type h: int
        :rtype: int
        """
        
        #we are looking for minimum integer k such that all bananas can be eaten in h hours, where h >= length of piles
        #the maximum value of k will be the maximum number of bananas in one pile (if we set k = max(piles) then each pile will take at most 1 tick to eat)
        #use binary search to hone in on a value for k, with lower bound 1

        #values of k: [1, 2, 3 ... max(piles)] can be mapped to their total times to eat all piles: [1000, 200, 30 ... len(piles)]
        #this list is sorted, and therefore we can use binary search to find the first item which is lower than or equal to h

        left = 1
        right = max(piles)

        while left < right:
            midK = (left + right) // 2

            #calculate total time taken to eat piles; time for each pile is given by math.ceil(piles[i] / k)
            totalTime = 0
            for pile in piles:
                totalTime -= ((pile * -1) // midK) #multiply by -1 the integer divide to get round-up rather than round down functionality

            if totalTime <= h: #we're in the correct portion of the list, but we could get a lower k value; move right to midK but still include midK
                right = midK 
            else: #totalTime > h; k is too small, so move left
                left = midK + 1

        #there is always a valid k in the list, so we can simply return k now (which is left or right; they are both the same at this point)
        return left

