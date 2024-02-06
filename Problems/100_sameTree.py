class TreeNode(object):
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution(object):
    def isSameTree(self, p, q):
        #we just need to check each individual pair of nodes on p and q
        #given 2 roots p and q; first we check if they are both None; if so then return true
        if p == None and q == None:
            return True #reached end of tree so we cannot recurse any further; the only way to return True is to get all the way to the bottom of a branch

        elif p == None or q == None: #if either p is None or q is None but not both of them (exclusive or) then p != q and so return False
            return False

        elif p.val != q.val: #check if their value do not match (we are looking for a break condition of False)
            return False

        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right) #all and conditions so a single False will return False