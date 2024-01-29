class Solution(object):
    def maxArea(self, height):
        """
        :type height: List[int]
        :rtype: int
        """
        

        #use left and right pointer to 'hone' in on max area
        maxArea = 0

        left = 0
        right = len(height) - 1

        while left < right:
            leftHeight = height[left]
            rightHeight = height[right]

            #observe that the height of the current container is controlled entirely by the minimum of (leftHeight and rightHeight)
            #therefore in order to have a chance at increasing the area, we need to move the limiting height (if we move the non-limiting height then the area will either remain the same or decrease)
            area = (right - left) * min(leftHeight, rightHeight)
            maxArea = max(maxArea, area)

            if leftHeight < rightHeight: #left height is the limiting height, so move left 1 to the right
                left += 1 #we don't have to worry about the possability that the previous left height was greater since if it was, we wouldn't have increased it
            else:
                right -= 1

        return maxArea

solution = Solution()
print(solution.maxArea([1,8,6,2,5,4,8,3,7]))
            