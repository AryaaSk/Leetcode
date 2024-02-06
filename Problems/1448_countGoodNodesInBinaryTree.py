class Solution(object):
    def goodNodes(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        
        #recurse down tree while keeping track of max item so far
        #for each root, if X >= maxValue then it is a good node, so add to the total (maintained in a global variable)
        return self.CountGoodNodesBelowAndIncluding(root, float('-inf'))

    def CountGoodNodesBelowAndIncluding(self, root, currentMax):
        if root == None:
            return 0

        if root.val >= currentMax: #update with new current max
            return 1 + self.CountGoodNodesBelowAndIncluding(root.left, root.val) + self.CountGoodNodesBelowAndIncluding(root.right, root.val) #add 1 to include current node as a good node
        else:
            return self.CountGoodNodesBelowAndIncluding(root.left, currentMax) + self.CountGoodNodesBelowAndIncluding(root.right, currentMax)
