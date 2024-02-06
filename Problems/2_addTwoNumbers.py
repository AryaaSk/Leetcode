class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution(object):
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        
        #imagine l1 and l2 as rows in column addition
        #the leftmost element of each represents the units digit and the place value increases as you go to the right; similar to how you start from the right in column addition and work towards the left
        #keep track of the number to carry, and then at the end if the carry number is nonzero append it to the end of the list

        carry = 0

        result = ListNode(0, None)
        resultCurrent = result

        while l1 != None or l2 != None:
            num1 = l1.val if l1 != None else 0
            num2 = l2.val if l2 != None else 0

            columnSum = num1 + num2 + carry

            if columnSum > 9:
                carry = 1
                columnSum -= 10
            else:
                carry = 0

            resultCurrent.next = ListNode(columnSum, None)
            resultCurrent = resultCurrent.next

            l1 = l1.next if l1 != None else l1
            l2 = l2.next if l2 != None else l2
        
        if carry != 0:
            resultCurrent.next = ListNode(carry, None)

        return result.next
