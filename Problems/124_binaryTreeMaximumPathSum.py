# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    maxPath = 0

    def maxPathSum(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """

        self.maxPath = root.val
        self.MaxSum(root)
        return self.maxPath

    def MaxSum(self, root):
        if root == None:
            return 0

        #find the max sum or max gain from the left and right side
        maxSumLeft = self.MaxSum(root.left) #will return 0 if greatest sum of child node is < 0 (i.e. we just ignore this node)
        maxSumRight = self.MaxSum(root.right)

        #we can form a path with left -> node -> right;
        maxPathSum = max(maxSumLeft + root.val + maxSumRight, root.val) #minimum value of path including current node is root.val
        self.maxPath = max(self.maxPath, maxPathSum)

        #for our return value, we need to remember that we can only include either the left or right paths
        #additionally, if all of root.val + maxLeft, root.val + maxRight and root.val are below 0, it is a better idea to completely ignore this node and return 0
        return max(maxSumLeft + root.val, root.val + maxSumRight, root.val, 0)