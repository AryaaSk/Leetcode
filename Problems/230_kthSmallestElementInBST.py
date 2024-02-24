class Solution(object):
    lst = []

    def kthSmallest(self, root, k):
        """
        :type root: TreeNode
        :type k: int
        :rtype: int
        """

        #depth first search alongside increasing list
        #lst = self.AddItems(root, k, [])
        #return lst[-1]

        #use depth first search on BST to put items into order; then just get (k - 1)th element (array is 0-indexed by k is 1-indexed)
        self.lst = []
        self.AddItemsFromSubtree(root)
        return self.lst[k - 1]

    """
    def AddItems(self, root, k, lst): #want to insert root.val into the correct location in the list; eventually lst will store k lowest items in tree
        if root == None:
            return lst

        lst = self.AddItems(root.left, k, lst)
        lst = self.AddItems(root.right, k, lst) #lst object is continuously modified by all these calls

        value = root.val
        
        positionToInsert = len(lst) - 1 #similar to insertion sort
        while positionToInsert >= 0 and value < lst[positionToInsert]:
            positionToInsert -= 1

        #lst[positionToInsert] is the rightmost item which is less than or equal to value; therefore insert value after this
        lst.insert(positionToInsert + 1, root.val)
        lst = lst[0:k] #cut away

        return lst
    """

    def AddItemsFromSubtree(self, root):
        if root == None:
            return self.lst #no items to add if root is None

        #add items from left subtree first (since they are all lower than current item); then add current item; then add items on right subtree since they are greater than item

        self.AddItemsFromSubtree(root.left)
        self.lst.append(root.val)
        self.AddItemsFromSubtree(root.right)