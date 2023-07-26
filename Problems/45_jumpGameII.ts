function jump(nums: number[]): number {
    return LowestJumps(nums, 0, {});
};

//optimise: use cache

const LowestJumps = (nums: number[], i: number, cache: { [index: number] : number }): number => {
    //2 choices: either jump +1 from current spot, or jump i from current spot
    if (cache[i] != undefined) {
        return cache[i];
    }

    if (i == nums.length - 1) {
        return 0;
    }
    if (i > nums.length - 1) {
        //need to discard this path
        return 10000;
    }

    if (nums[i] == 0) {
        return 10000; //if at 0 and not the last element, its impossible to move anywhere
    }

    //if currently at index 2, what is the lowest number of jumps possible
    //lower of: 1 + Lowest(2 + 1), 1 + Lowest(2 + 2) ... 1 + Lowest(2 + nums[2])

    //nums[i] isn't the only other choice, its the MAXIMUM
    const maxJump = nums[i];
    const allOptions: number[] = [];
    for (let jumpDistance = 1; jumpDistance <= maxJump; jumpDistance += 1) {
        allOptions.push(1 + LowestJumps(nums, i + jumpDistance, cache))
    }

    const lowestOption = Math.min(...allOptions);
    cache[i] = lowestOption;
    return lowestOption;
}

const numbers = [5,6,4,4,6,9,4,4,7,4,4,8,2,6,8,1,5,9,6,5,2,7,9,7,9,6,9,4,1,6,8,8,4,4,2,0,3,8,5];
console.log(jump(numbers));