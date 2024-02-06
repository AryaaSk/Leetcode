# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def rightSideView(self, root):
        """
        :type root: TreeNode
        :rtype: List[int]
        """
        if root == None:
            return None
        
        #breadth first search, simply retreive the last element from each level into an array
        rightView = []

        queue = [root]
        while len(queue) > 0: #repeat for as many levels there are; new nodes are added for each level so this will only be empty if no new levels were added (i.e. we've reached the bottom level)
            length = len(queue)
            rightView.append(queue[-1].val) #add rightmost element in queue to rightview
            for _ in range(length): #repeat for number of current items in queue (number of items in current level); remove current node and add upto 2 child nodes
                if queue[0].left != None:
                    queue.append(queue[0].left)
                if queue[0].right != None:
                    queue.append(queue[0].right)
                queue.pop(0)

        return rightView




