# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    maxDiameter = 0

    def diameterOfBinaryTree(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        self.maxDiameter = 0
        self.MaxDepthAndDiameter(root) #will update self.maxDiameter
        return self.maxDiameter
    
    def MaxDepthAndDiameter(self, root):
        if root == None:
            return 0 #if root is 0, then depth is 0

        maxDepthLeft = self.MaxDepthAndDiameter(root.left) + 1 #add 1 for current node
        maxDepthRight = self.MaxDepthAndDiameter(root.right) + 1

        diameter = maxDepthLeft + maxDepthRight - 2
        self.maxDiameter = max(self.maxDiameter, diameter)

        return max(maxDepthLeft, maxDepthRight) #(maxDepth, maxDiameter; compare current diameter with max diameter)