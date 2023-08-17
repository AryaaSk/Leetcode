function nextGreaterElements(nums: number[]): number[] {
    //prepare answers array
    const answers = new Array(nums.length).fill(-1);

    //brute force: for each nums[i], use a pointer j and look for an item larger than nums[i], repeat until j = i, at which point a full loop has been checked
    //speed up using a stack:
    //when looking for an element greater than nums[i], we can keep track of all previously checked numbers in a stack, keep the best candidate for a greater number on top of the stack
    //the stack is monotonically decreasing, as a candidate is more likely to be greater than nums[i] the larger it is
 
    const stack: { num: number, index: number }[] = [];

    //simply loop twice, using same stack technique as next greater element I
    for (let i = 0; i != nums.length * 2; i += 1) {
        const num = nums[i % nums.length];
        while (stack.length > 0 && num > stack[stack.length - 1].num) {
            const signOffNum = stack.pop();
            const index = signOffNum.index;
            answers[index] = num;
        }
        stack.push({ num: num, index: i % nums.length });
    }

    return answers;
};

console.log(nextGreaterElements([1,2,3,4,3]));