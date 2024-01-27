class Solution(object):
    def topKFrequent(self, nums, k):
        #aim for linear time (all items in the list must be used at least once)

        numCounts = {} #key = num, value = occurences
        for num in nums:
            if num in numCounts:
                numCounts[num] += 1
            else:
                numCounts[num] = 1

        occurences = []
        for num, occurenceCount in numCounts.items():
            occurences.append((occurenceCount, num))

        occurences.sort()
        occurences = occurences[len(occurences) - k : len(occurences)]
        occurences.reverse()

        return list(map(lambda tuple: tuple[1], occurences))

solution = Solution()
print(solution.topKFrequent([1,1,1,2,2,3], 2))