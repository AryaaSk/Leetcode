//[3,1,2,4]

//for each number, we want to find the range to the right and left in which it is the smallest number
//e.g. [(0,0),(0,3),(2,3),(3,3)]

//once we have this range, we want to count how many subarrays will contain this 'pseudo-minimum' value
//e.g. for 1: its range extends from index 0 -> 3 incl.
//by spliting this range into 2 subarrays divided by 1 ([3], [2,4]), we are able to construct all possible subarrays from this range which would contain 1:
//3 - 1 - 2,4
//3 - 1 - 2
//3 - 1 - _
//_ - 1 - 2,4
//_ - 1 - 2
//_ - 1 - _
// -> 6
//observe that this is generated in a double loop method, thus it can be given by (beforeArray.length + 1) * (afterArray.length + 1)

//therefore, for each number, we know the range in which it is a minimum, and we also know how many subarrays within this range will contian the number -> total contribution of num = num * numSUbarraysContainingNum
//if we sum up each number's total contribution then we will arrive at the final answer

function sumSubarrayMins(arr: number[]): number {
    if (arr.length == 1) return arr[0];
    const moduloConstant = 10**9 + 7;

    //finding a num's minimum range is equivalent to finding the previous and next smaller numbers
    const minRangesLeft = new Array(arr.length).fill(0);
    const minRangesRight = new Array(arr.length).fill(arr.length - 1);
    
    //first find previous smaller element for each num - monotonically decreasing stack
    //now find next smaller element - monotonically increasing stack, 'sign-off' candidates
    let decreasingStack: { num: number, index: number }[] = [];
    let increasingStack: { num: number, index: number }[] = [];
    for (const [i, num] of arr.entries()) {
        while (decreasingStack.length > 0 && num < decreasingStack[decreasingStack.length - 1].num) decreasingStack.pop(); //removing bad candidates
        if (decreasingStack.length > 0) {
            const previousSmallerElement = decreasingStack[decreasingStack.length - 1];
            minRangesLeft[i] = previousSmallerElement.index + 1;
        }
        decreasingStack.push({ num: num, index: i });

        while (increasingStack.length > 0 && num < increasingStack[increasingStack.length - 1].num) {
            const signOff = increasingStack.pop();
            minRangesRight[signOff.index] = i - 1;
        }
        increasingStack.push({ num: num, index: i });
    }

    let total = 0;
    for (const [i, num] of arr.entries()) {
        //for each num, calculate the number of subarrays for which it is the minimum, using minRanges
        const beforeArrayLength = i - minRangesLeft[i];
        const afterArrayLength = minRangesRight[i] - i;
        const numSubarraysWithMin = (beforeArrayLength + 1) * (afterArrayLength + 1);

        const contribution = numSubarraysWithMin * num;
        total += contribution % moduloConstant;
    }

    return total % moduloConstant;
}

console.log(sumSubarrayMins([71,55,82,55]));