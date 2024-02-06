class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution(object):
    def hasCycle(self, head):
        """
        :type head: ListNode
        :rtype: bool
        """

        """
        #simply go through the list and store the ids of previous nodes in a set
        #this enables us to check if node.next has been seen before
        #we break if node.next is an already seen node or if node.next == None

        nodeIDs = set([])
        current = head
        while current != None:
            #check if current has been seen before
            currentID = id(current)
            if currentID in nodeIDs: #seen before -> current has looped around
                return True

            nodeIDs.add(currentID)
            current = current.next

        return False #if we get here that means a node had a next == None, and therefore there is no cycle
        """

        #Floyd's Tortoise and Hare
        fast = head
        slow = head

        while fast != None and fast.next != None:
            fast = fast.next.next
            slow = slow.next

            if fast == slow: #fast has caught up with slow, and therefore there is a cycle
                return True

        return False #if we ever break out of the loop because fast.next is None, then it must mean the linked list comes to an end, and thus there is no cycle

solution = Solution()
print(solution.hasCycle(ListNode(1, None)))