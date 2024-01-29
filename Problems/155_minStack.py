class MinStack(object):

    stack = []

    def __init__(self):
        self.stack = []

    def push(self, val):
        #as items are pushed onto the stack, we can keep track of the current min and its prior history
        #therefore if an item is removed from the stack (from the top), it will also remove that current min history, thus relegating the min back to its prior value before that item was added
        #this will only change the min if the item removed was the min at the time it was added
        currentMin = self.getMin() if len(self.stack) > 0 else val
        if val < currentMin:
            currentMin = val

        self.stack.append((currentMin, val))

    def pop(self):
        self.stack.pop()


    def top(self):
        return self.stack[len(self.stack) - 1][1]
        

    def getMin(self):
        #we want to know the min of the stack at the current moment
        #use the topmost element (with the most recent history)
        return self.stack[len(self.stack) - 1][0]