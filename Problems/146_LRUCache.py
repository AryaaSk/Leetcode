class LRUCache(object):
    capacity = 0

    cache = {} #stores key: (value, previousKey, nextKey)
    firstKey = None
    lastKey = None

    def DeleteNode(self, key): #assume key is a valid key in cache
        previousNodeKey = self.cache[key][1]
        nextNodeKey = self.cache[key][2]

        if key != self.lastKey: #if node is last node, then there is no previous node
            self.cache[previousNodeKey][2] = self.cache[key][2]
        if key != self.firstKey: #if node is first node, there is no next node
            self.cache[nextNodeKey][1] = self.cache[key][1]

        if key == self.firstKey:
            self.firstKey = previousNodeKey
        elif key == self.lastKey:
            self.lastKey = nextNodeKey

        del self.cache[key]

    def AddNode(self, key, value): #assume key is fresh (not already in cache)
        if len(self.cache) == 0:
            self.cache[key] = [value, None, None]
            self.firstKey = key
            self.lastKey = key

        firstNodeKey = self.firstKey
        self.cache[firstNodeKey][2] = key
        self.cache[key] = [value, firstNodeKey, None]
        self.firstKey = key

    def __init__(self, capacity):
        self.capacity = capacity

        self.cache = {}
        self.firstKey = None
        self.lastKey = None

    def get(self, key):
        if key in self.cache:
            value = self.cache[key][0]
            self.DeleteNode(key)
            self.AddNode(key, value)
            return value
        else:
            return -1

    def put(self, key, value):
        #if key is already in cache, then we need to move it to the front; no extra space is used
        if key in self.cache:
            self.get(key) #sends node to the front
            self.cache[key][0] = value

        #add new node at the front of the list; we don't have to delete anything if cache size is less than possible capacity
        elif len(self.cache) < self.capacity:
            self.AddNode(key, value)

        else: #cache is at max capacity and key is fresh
            self.DeleteNode(self.lastKey)
            self.AddNode(key, value)


cache = LRUCache(2)
cache.put(2, 1)
print(cache.get(2))