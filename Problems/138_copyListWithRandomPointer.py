class Node:
    def __init__(self, x, next=None, random=None):
        self.val = int(x)
        self.next = next
        self.random = random

class Solution(object):
    def NodeID(self, node):
        if node == None:
            return None
        else:
            return id(node)

    def copyRandomList(self, head):
        """
        :type head: Node
        :rtype: Node
        """

        #head.next is a node, and head.random is a different node
        #create a hashmap providing a link between old nodes and their clones in first pass
        #then link all nodes together in second pass

        nodeMaps = { None : None } #none will map to none
        current = head
        while current != None:
            nodeMaps[self.NodeID(current)] = Node(current.val, None, None) #keep pointers blank for now
            current = current.next

        #Loop through head again, but this time for each node access, we access its copy and then link its pointers to the clones of the original's pointers
        current = head
        while current != None:
            nodeMaps[self.NodeID(current)].next = nodeMaps[self.NodeID(current.next)] #don't have to worry about KeyErrors since we initiailised all nodes into this hashmap in first pass
            nodeMaps[self.NodeID(current)].random = nodeMaps[self.NodeID(current.random)]
            current = current.next

        return nodeMaps[self.NodeID(head)] #return copy of first node