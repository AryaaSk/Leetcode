class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution(object):
    def mergeTwoLists(self, list1, list2):
        """
        :type list1: Optional[ListNode]
        :type list2: Optional[ListNode]
        :rtype: Optional[ListNode]
        """
        
        if list1 == None:
            return list2
        if list2 == None:
            return list1

        #assume list1[0] <= list2[0]; else:
        if list1.val > list2.val:
            return self.mergeTwoLists(list2, list1)


        nums = list1
        temp = list2

        current = nums
        while current != None and temp != None:
            #comapre current.next with temp
            if current.next != None and current.next.val <= temp.val: #simply increment to next item in nums
                current = current.next
            else: #we need to perform a swap, since current should now point to temp.val rather than current.next
                current.next, temp = temp, current.next #this is only valid since Python assigns individually simultaneously (i.e. these variables are stored in temp variables under the hood and order doesn't matter)

        return nums