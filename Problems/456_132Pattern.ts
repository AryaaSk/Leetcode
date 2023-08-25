//e.g. [3,1,4,2]

//we are looking for a triple nums[i] < nums[k] < nums[j], where i < j < k

//notice if we loop through nums looking for candidates of nums[k], then we are looking for a previous greater element, which will be assigned as nums[j]
//however once we have found this greater element, we next need to find a number less than nums[k]
//therefore, to have the best chance of finding a number less than nums[k], we should keep track of the lowest number behind nums[j] (in hopes that it will also be less than nums[k], thus finding a match as nums[i])

//this can be done using a stack
//i) Monotonically decreasing stack to keep track of elements greater than nums[k]
//ii) Also keep track of lowest num at that point

function find132pattern(nums: number[]): boolean {
    if (nums.length < 3) return false;

    let lowestNum = Infinity;
    const decreasingStack: { num: number, lowestNumBefore: number }[] = [];
    for (const num of nums) {
        //we are looking for a num[j] which is greater than the current num[k]
        while (decreasingStack.length > 0 && num >= decreasingStack[decreasingStack.length - 1].num) decreasingStack.pop();

        //now either the top item is greater than num or there are no items in the stack
        if (decreasingStack.length > 0) {
            const previousGreaterNum = decreasingStack[decreasingStack.length - 1];

            //the previous greater num is the most likely to also have the the lowest number before it, since it has 'seen' the most numbers
            //therefore we only need to check this to see if there is a match for nums[i]
            if (previousGreaterNum.lowestNumBefore < num) return true;
        }

        decreasingStack.push({ num: num, lowestNumBefore: lowestNum });
        if (num < lowestNum) lowestNum = num;
    }

    return false;
}

console.log(find132pattern([1,4,0,-1,-2,-3,-1,-2]));