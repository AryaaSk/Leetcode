//[4,-2,-3,4,1]

//brute force: generate all combinations of subarrays, find ranges and sum
//O(n^2), beats 92.86% speed, 71.43% memory

//slow because we need to make a new loop for each element
//try to optimise by observing how subarrays are constructed, and we need to work per element rather than using a double loop

//[4,-2,-3,4,1]

//lets look at how each element contributes to the range
//if an element is either the highest or lowest then it 'contributes', since it is used in the range calculation

//therefore similar to sumOfMinimums, we are going to calculate each numbers radius of being a minimum and maximum
//e.g. -2 has a left radius of 1 and a right radius of 0 (since 4 > -2 > -3)
//this tells us -2 will be the minimum in (1 + 1) * (0 + 1) 2 subarrays
//out of 15 subarrays, 2 will have a minimum being -2

//doing a similar process for maximums, -2 has a left radius of 0 and a right radius of 1
//therefore it is the maximum of 2 subarrays out of 15

function subArrayRanges(nums: number[]): number {
    //so for each number, we need to create its left/right radius of being minimum and maximum
    //equivalent to finding the previous and next smaller and greater elements
    
    let increasingStack: { num: number, index: number }[] = [];
    let decreasingStack: { num: number, index: number }[] = [];

    const leftMinimumDistance = new Array(nums.length).fill(-1);
    const leftMaximumDistance = new Array(nums.length).fill(-1);
    const rightMinimumDistance = new Array(nums.length).fill(-1);
    const rightMaximumDistance = new Array(nums.length).fill(-1);

    //previous/next smaller and previous larger elements    
    for (const [i, num] of nums.entries()) {
        while (increasingStack.length > 0 && increasingStack[increasingStack.length - 1].num >= num) { //current num is less than top item on stack, remove until current item is greater than top item on stack
            const priorGreaterElement = increasingStack.pop(); //num becomes the next smaller element for this element
            const distance = i - priorGreaterElement.index - 1;
            rightMinimumDistance[priorGreaterElement.index] = distance;
        }

        if (increasingStack.length > 0) {
            const previousSmallerElement = increasingStack[increasingStack.length - 1];
            const distance = i - previousSmallerElement.index - 1;
            leftMinimumDistance[i] = distance;
        }
        else {
            //there is no previous smaller element, so the radius extends to the start of the array
            const distance = i;
            leftMinimumDistance[i] = distance;
        }

        while (decreasingStack.length > 0 && decreasingStack[decreasingStack.length - 1].num <= num) {
            const priorSmallerElement = decreasingStack.pop();
            const distance = i - priorSmallerElement.index - 1;
            rightMaximumDistance[priorSmallerElement.index] = distance;
        }

        if (decreasingStack.length > 0) {
            const previousGreaterElement = decreasingStack[decreasingStack.length - 1];
            const distance = i - previousGreaterElement.index - 1;
            leftMaximumDistance[i] = distance;
        }
        else {
            leftMaximumDistance[i] = i;
        }

        increasingStack.push({ num: num, index: i });
        decreasingStack.push({ num: num, index: i });
    }

    //the items left in the increasingStack have not been popped because there was no number after them that was lower
    for (const item of increasingStack) {
        const distance = nums.length - item.index - 1;
        rightMinimumDistance[item.index] = distance;
    }
    for (const item of decreasingStack) { //items here have no number after that was greater
        const distance = nums.length - item.index - 1;
        rightMaximumDistance[item.index] = distance;
    }


    let [maxSum, minSum] = [0, 0];
    //now sum up the maximums and minimums of each subarray
    for (const [i, num] of nums.entries()) {
        //calculate how many subarrays the current num is maximum for by multiplying (left + 1) and (right + 1) maximum distances
        //the contribution is num of subarrays * num
        const totalMaxContribution = num * (leftMaximumDistance[i] + 1) * (rightMaximumDistance[i] + 1);
        const totalMinContribution = num * (leftMinimumDistance[i] + 1) * (rightMinimumDistance[i] + 1);
        maxSum += totalMaxContribution;
        minSum += totalMinContribution;
    }

    return maxSum - minSum;
};

console.log(subArrayRanges([4,-2,-3,4,1]));