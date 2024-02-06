class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution(object):
    def mergeKLists(self, lists):
        """
        :type lists: List[ListNode]
        :rtype: ListNode
        """

        """
        i = 0
        lowestListIndex = 0
        while i != len(lists):
            if lists[i] == None:
                del lists[i]
            else:
                #check if lists[i] has a lower element at index 0 than lists[lowestListIndex];
                #if we are in this else block then at least 1 list was not empty, and therefore lists[0] is non-empty
                if lists[i].val < lists[lowestListIndex].val:
                    lowestListIndex = i

                i += 1

        if len(lists) == 0: #no valid lists
            return None
            
        #we will start with the list with the lowest first element; and store all other lists as in temp
        result = lists[lowestListIndex]
        current = result
        del lists[lowestListIndex]

        while len(lists) > 0: #repeat while there are still items left in the total lists array
            #we are comparing result.next.val with all other lists.val
            lowestListIndex = 0
            for i, list in enumerate(lists):
                if list.val < lists[lowestListIndex].val:
                    lowestListIndex = i

            #we have the lowest list val of any of the lists stored in temp list; now compare that with the main list to decide whether to execute a swap or continue
            if current.next != None and current.next.val <= lists[lowestListIndex].val:
                current = current.next #current list has a lower next element, so we just continue along the path
            else:
                #swap must be made: either there are no more items left in current or there is a lower element in another list
                current.next, lists[lowestListIndex] = lists[lowestListIndex], current.next
                current = current.next #increment current

            #check if lists[lowestListIndex] is None, and if so then remove it from the list
            if lists[lowestListIndex] == None:
                del lists[lowestListIndex]

        return result
        """

        #another option is simply to add all items into an array, sort the array and then convert back to a linked list
        lst = []
        for current in lists:
            while current != None:
                lst.append(current)
                current = current.next
        
        lst.sort(key = lambda x: x.val)

        for i in range(len(lst) - 1):
            lst[i].next = lst[i + 1]
        
        return lst[0] if len(lst) > 0 else None