class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution(object):
    def reorderList(self, head):
        """
        :type head: ListNode
        :rtype: None Do not return anything, modify head in-place instead.
        """
        
        if head == None or head.next == None: #length <= 1, so we can just return head
            return

        #find middle of list using fast and slow pointer; slow pointer moves 1 space for each time fast pointer moves 2 spaces, thus meaning slow pointer is at middle when 
        fast = head
        slow = head
        while fast != None and fast.next != None:
            fast = fast.next.next
            slow = slow.next

        #slow is second half of list; reverse slow
        storage = slow.next
        slow.next = None #this causes us to lose data on head; which is not wanted; however we are only losing items after the first half which is all we want head for anyway, so it won't matter for this problem
        #losing all items after and including slow.next is actually beneficial since it means we don't have to check separately for odd and even cases, since the final item added will always have None for next

        while storage != None:
            temp = storage.next
            storage.next = slow
            slow = storage
            storage = temp

        current = head
        temp = slow
        while current.next != None: #once we have swapped to the final item in slow, the current.next will be None and so the loop will break; use slow as temp
            current.next, temp = temp, current.next
            current = current.next

        #head is controlled by current, which should now be correct
    
solution = Solution()
lst = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5, None)))))
solution.reorderList(lst)

print(lst.val)
print(lst.next.val)
print(lst.next.next.val)
print(lst.next.next.next.val)
print(lst.next.next.next.next.val)