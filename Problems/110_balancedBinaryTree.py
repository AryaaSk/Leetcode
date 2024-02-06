class Solution(object):
    treeBalanced = True

    def isBalanced(self, root):
        #use recursive depth algorithm and simply update global isBalancedProperty
        self.treeBalanced = True
        self.MaxDepth(root)
        return self.treeBalanced

    def MaxDepth(self, root):
        if root == None:
            return 0
        
        maxDepthLeft = self.MaxDepth(root.left) + 1
        maxDepthRight = self.MaxDepth(root.right) + 1
        if abs(maxDepthLeft - maxDepthRight) > 1:
            self.treeBalanced = False
        
        return max(maxDepthLeft, maxDepthRight)