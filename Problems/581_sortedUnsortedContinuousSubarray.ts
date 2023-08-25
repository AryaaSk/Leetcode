function findUnsortedSubarray(nums: number[]): number {
    //[2,6,4,8,16,12,10,9,15]

    //for leftBound, we need to find the lowest index i such that nums[i] > nums[j] and i < j
    //since this indicates that sorting needs to occur for this nums[i] to be in the correct position
    //e.g. in example above, valid values for nums[i] are: 10, 12, 16, 6; the lowest of these is i = 1 (nums[i] = 6)

    //similiarly for rightBound, we need to find the maximum index j such that nums[i] > nums[j] and i < j
    //again, this shows nums[j] is out of place, and by finding the max value, we find the rightmost element which needs to be sorted
    //in the example above valid values for nums[j] are: 4, 12, 10, 9, 15, the greatest of these is j = 9 (nums[j] = 15)
    
    //thus the subarray to be sorted is from index 1 -> 9 inclusive, giving a length of 8
    let [minI, maxJ] = [Infinity, -Infinity];

    //for minI, find the leftmost number such that there is a number to the right which is smaller
    //for maxJ, find the rightmost number such that there is a number to the left that is larger
    let smallestSoFar = nums[nums.length - 1]; //we want to have the highest chance of num being larger than this number
    let largestSoFar = nums[0];
    for (let j = 0; j != nums.length ; j += 1) {
        const i = nums.length - j - 1;
        if (nums[i] > smallestSoFar) minI = i;
        else smallestSoFar = nums[i];

        if (nums[j] < largestSoFar) maxJ = j;
        else largestSoFar = nums[j];
    }

    if (minI == Infinity) return 0; //nums is in ascending order already

    return maxJ - minI + 1;
};

console.log(findUnsortedSubarray([2,3,3,2,4]))