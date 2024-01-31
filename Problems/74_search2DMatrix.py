class Solution(object):
    def searchMatrix(self, matrix, target):
        """
        :type matrix: List[List[int]]
        :type target: int
        :rtype: bool
        """
        
        #observe that matrix is really just a sorted array split into rows
        #using regular left and right pointers, we can use regular binary search but we just need to adjust how we access the array

        matrixHeight = len(matrix)
        matrixWidth = len(matrix[0])

        left = 0
        right = matrixWidth * matrixHeight - 1 #row length * number of rows - 1 (for 0-index)

        while left < right:
            midpoint = (left + right) // 2

            if target > matrix[midpoint // matrixWidth][midpoint % matrixWidth]: #discard left 'side'
                left = midpoint + 1
            else: #discard right side but keep midpoint
                right = midpoint
        
        return True if matrix[left // matrixWidth][left % matrixWidth] == target else False
                