class Solution(object):
    def maxSlidingWindow(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: List[int]
        """
        
        #brute force: for each window, compute the max and store in output
        """
        output = []
        for i in range(len(nums) - k + 1):
            window = nums[i : i + k]
            output.append(max(window))

        return output
        """

        #this is slow since we need to iterate through the window each time, thus causing a time complexity of O(n)
        #use a queue to keep track of the current window; we need to implement a queue which has an O(1) GetMax() function
        #this can be done using a monotonically decreasing queue
        #element at index[0] will be the earliest greatest item
        #for each subsequently added item, we will remove all items in the queue which it is greater than and append it at that position

        #the first item will be the greatest but there is a chance it is out of the range of the window;
        #for each iteration we need to remove items from the front of the queue which are out of the range of the window
        #this can be done by storing the indices of the element rather than their true value, and then checking their index for every increment

        queue = []
        for i in range(k - 1): #initialise queue with first k items
            while len(queue) > 0 and nums[i] >= nums[queue[-1]]:
                queue.pop()
            
            #last element in queue is greater than nums[i]
            queue.append(i)

        output = []
        for i in range(k, len(nums) + 1): #initial window we initialised for was nums[0 : k - 1]
            #remove elements from front of queue which are no longer valid
            left = i - k
            while len(queue) > 0 and queue[0] < left:
                queue.pop(0)

            #add current element to queue
            right = i - 1 #i represents right bound of interval which is exclusive; therefore rightmost element in window is actually (i - 1)
            while len(queue) > 0 and nums[right] >= nums[queue[-1]]:
                queue.pop()
            queue.append(right)
            
            #first item from queue represents the largest element in the current window; there will always be at least 1 element since we added the current element
            output.append(nums[queue[0]])
        
        return output
            