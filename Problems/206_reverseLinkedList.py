class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution(object):
    def reverseList(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """

        if head == None or head.next == None:
            return head

        #length of list is at least 2
        storage = head.next
        head.next = None

        while storage != None:
            temp = storage.next
            storage.next = head
            head = storage
            storage = temp

        return head

        """
        #we can also use Python's tuple assignment characteristic of being simultaneous to avoid the use of temp variables (done under the hood)
        reversedList = None
        while head != None:
            reversedList, reversedList.next, head = head, reversedList, head.next #adding the top val of head and then 'shifting' reversedList down by 1
            #need to also modify head inline since otherwise we create a pointer to head (reversedList) and then set reversedList.next = head.next = Original reversedList = None; if we then do head = head.next afterwards then head becomes None immediately

        return reversedList
        """