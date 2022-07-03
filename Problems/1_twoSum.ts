// https://leetcode.com/problems/two-sum/

function twoSum(nums: number[], target: number): number[] {
    //could just go through every item and check every other item, however that is inefficient
    //go through list once, and store number + index in a dictionary, then check if the other number required already exists

    const numbers: { [Number: number] : number } = {}; //[ Number: Index ]
    for (let i = 0; i != nums.length; i += 1) {
        const num = nums[i];

        if (numbers[target - num] != undefined) {
            const index = i;
            const otherIndex = numbers[target - num];
            return [index, otherIndex];
        }
        else {
            numbers[num] = i;
        }

    }
    
    return [];
};