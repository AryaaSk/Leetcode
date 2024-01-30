class Solution(object):
    def largestRectangleArea(self, heights):
        """
        :type heights: List[int]
        :rtype: int
        """
        
        #largest rectangle for a given pillar is calculated by going furthest left and right
        #you can go left and right until there is an element lower than the current pillar
        #therefore for each pillar, we need to determine the previous lower element and next lower element

        #previous lower element
        previousLowerElements = [-1] * len(heights)
        stack = [] #use increasing stack
        for i in range(len(heights)):
            #remove all items in stack which current height is lower than or equal to (there is no point holding them since current height is both closer and lower than them)
            while len(stack) > 0 and heights[i] <= heights[stack[-1]]:
                del stack[-1]

            #if there are any items left in the stack, then they must be lower than current height, and therefore this is the previous lower element
            if len(stack) > 0:
                previousLowerElements[i] = stack[-1]

            #add current height to stack (increasing stack, current height is greater than current stack.top)
            stack.append(i)

        #next lower element
        nextLowerElements = [len(heights)] * len(heights)
        stack = []
        for i in range(len(heights)): 
            #sign off method, use increasing stack
            #use current height to sign off as many items in stack as possible (stack is increasing so stack.top is greatest height, and therefore has greatest chance of getting signed off)
            while len(stack) > 0 and heights[i] < heights[stack[-1]]:
                nextLowerElements[stack.pop()] = i
            
            #current height is now greater than stack.top, so add it to the stack
            stack.append(i)

        
        maxArea = 0
        for i, height in enumerate(heights):
            width = nextLowerElements[i] - previousLowerElements[i] - 1 #width using indices of next and previous smaller elements
            area = width * height
            maxArea = max(maxArea, area)

        return maxArea

solution = Solution()
print(solution.largestRectangleArea([2,1,5,6,2,3]))