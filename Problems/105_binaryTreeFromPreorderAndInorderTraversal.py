class TreeNode(object):
     def __init__(self, val=0, left=None, right=None):
         self.val = val
         self.left = left
         self.right = right

class Solution(object):
    def buildTree(self, preorder, inorder):
        """
        :type preorder: List[int]
        :type inorder: List[int]
        :rtype: TreeNode
        """
        if len(inorder) == 0:
            return None
        
        #preorder[0] will always give the root node
        #items to the left or preorder[0] in inorder are on the left subtree, and items to the right are on the right subtree
        #therefore for each node, we set its value to preorder[0], and we can split inorder based on preorder[0]; then recurse downwards using the left and right side of inorder
        val = preorder.pop(0)
        node = TreeNode(val, None, None)

        nodeValIndex = inorder.index(val)
        leftSubtreeInorder = inorder[:nodeValIndex]
        rightSubtreeInorder = inorder[nodeValIndex + 1:]

        """
        #we know know how large the left and right subtrees are
        #ignoring the first item in preorder, it's clear that the left subtree will be contained within the first contiguous list 'half' and the right will be contained in the second half
        #preorder will append all nodes below the current node first before moving onto the other child node of the parent
        #therefore all children of the current node's left will be in a continous line and then afterwards will be the children of the current node's right
        leftSubtreePreorder = preorder[1:len(leftSubtreeInorder) + 1]
        rightSubtreePreorder = preorder[len(leftSubtreeInorder) + 1:]
        """

        #now set current node's left and right using these new preorder and inorder lists;
        #because we popped the current node's value, we simply return the entire preorder list: every left node takes the first item, and so the remaining nodes are given to the right
        node.left = self.buildTree(preorder, leftSubtreeInorder)
        node.right = self.buildTree(preorder, rightSubtreeInorder)

        return node