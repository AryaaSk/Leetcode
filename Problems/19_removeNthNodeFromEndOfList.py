class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution(object):
    def removeNthFromEnd(self, head, n):
        """
        :type head: ListNode
        :type n: int
        :rtype: ListNode
        """
        
        #use 2 pointers to access nth node from the end
        #stagger a fast and slow pointer by n nodes, i.e. slow pointer is always n nodes behind the fast pointer
        #then increment both pointers until fast reaches the end (since we want slow to finish on the node before the node to remove, we stop when fast.next == None since this implies fast is on the final node)

        fast = head
        slow = head
        stagger = n
        while fast.next != None:
            fast = fast.next

            if stagger == 0:
                slow = slow.next #start moving slow once stagger has been implemented
            else:
                stagger -= 1
        
        if stagger > 0: #stagger has not been fully implemented: this can only happen if n == length of list, i.e. remove the first element
            return head.next

        slow.next = slow.next.next
        return head

solution = Solution()
solution.removeNthFromEnd(ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5, None))))), 2)