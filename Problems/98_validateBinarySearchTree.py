# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def isValidBST(self, root):
        """
        :type root: TreeNode
        :rtype: bool
        """
        
        #perform depth first search (doesn't actually matter), and keep track of minimum and maximum items further up the tree
        #for each node, we check minimum < node.val < maximum; if this is false then return False
        #otherwise we repeat the process, for the left subtree we keep minimum and set maximum = node.val; fpr the right we set minimum = node.val and keep maximum
        #repeat until we reach a node == None, at which point we've reached the bottom of the branch without any issues so return True
        return self.IsValidNode(root, float('-inf'), float('inf'))

    def IsValidNode(self, root, minimum, maximum):
        if root == None:
            return True

        elif minimum < root.val and root.val < maximum: #valid node
            return self.IsValidNode(root.left, minimum, root.val) and self.IsValidNode(root.right, root.val, maximum)
        
        else: #root is lower than minimum or greater than maximum; either way it is invalid, and therefore this binary search tree is invalid
            return False
