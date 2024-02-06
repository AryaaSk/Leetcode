class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution(object):
    def reverseKGroup(self, head, k):
        """
        :type head: ListNode
        :type k: int
        :rtype: ListNode
        """

        #bring linked list into array, and then modify pointers in place
        current = head
        lst = []
        while current != None:
            lst.append(current)
            current = current.next

        #swap pointers (k - 1) times, and then skip one iteration
        #we only care about k being a multiple of the number of nodes, therefore 'round' k down to the nearest multiple of n (number of nodes)
        #swap (k - 1) times, and then don't swap kth element
        n = len(lst)
        swapsRemaining = k - 1
        for i in range(1, n):
            if swapsRemaining > 0:
                lst[i].next = lst[i - 1]
                swapsRemaining -= 1
            else:
                #lst[i - k].next = lst[i] #map element from front of 'swap cluster' (which is now at the end) to the front of the next 'cluster'
                swapsRemaining = k - 1

            nodesLeft = n - i
            if nodesLeft <= swapsRemaining:
                break #not enough nodes to create a new cluster
            
        #map the front of each cluster to the start of the next cluster
        for i in range(0, n - (2*k - 1), k):
            lst[i].next = lst[i + 2*k - 1]

        if swapsRemaining == 0:
            lst[n - k].next = None #final node has no next pointer; only re-map this if there is a cluster reaching till the end
        else: #loop was ended prematurely, so there are nodes in order towards the end; however we need to map the final node of the final cluster to these ordered nodes
            #final item of final cluster is given by (n - 1 - swapsRemaining); therefore first item of final cluster is given by (n - 1 - swapsRemaining - (k - 1))
            lst[n - 1 - swapsRemaining - (k - 1)].next = lst[n - swapsRemaining]

        #the entry point is the end of the first cluster, i.e. element at index (k - 1)
        entry = lst[k - 1]
        while entry != None:
            entry = entry.next

        return entry

sol = Solution()
sol.reverseKGroup(ListNode(1, ListNode(2, ListNode(3, ListNode(4, None)))), 3)

        