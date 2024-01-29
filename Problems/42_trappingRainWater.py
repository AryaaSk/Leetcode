class Solution(object):
    def trap(self, height):
        #use 2 pointers
        #first pointer is base pointer, and keeps track of current elevation level
        #second pointer is look ahead pointer, and continues ahead until it reaches a height equal to or greater than the base pointer
        #water will be stored after the base pointer if the next height is lower than it (as long as we do eventually reach another base pointer to act as the end marker of the interval)

        def baseLookAhead(subheight):
            totalArea = 0

            base = 0
            while base < len(subheight):
                currentBatchArea = 0
                lookAhead = base + 1
                while lookAhead < len(subheight) and subheight[lookAhead] < subheight[base]:
                    currentBatchArea += subheight[base] - subheight[lookAhead]
                    lookAhead += 1

                if lookAhead != len(subheight):
                    totalArea += currentBatchArea #if lookAhead is equal to the length of heights, it means there was no end-interval, so we cannot add the final batch area

                base = lookAhead

            return totalArea

        #Use base lookAhead method, except we will split the input heights into 2 sublists based around the maximum height (since this can always be used as an end-interval
        maxIndex = height.index(max(height))
        firstHalf = height[0 : maxIndex + 1]
        secondHalf = height[maxIndex : len(height)][::-1] #reverse to ensure the max height is always at the end interval

        return baseLookAhead(firstHalf) + baseLookAhead(secondHalf)

solution = Solution()
print(solution.trap([0,1,0,2,1,0,1,3,2,1,2,1]))