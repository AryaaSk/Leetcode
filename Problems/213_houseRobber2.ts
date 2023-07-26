function rob(nums: number[]): number {
    if (nums.length == 1) {
        return nums[0];
    }

    //since houses are arranged in a circle, the only difference is now the last house cannot be robbed if the original I was 0
    const maxOutcomeFrom2nd = MaxOutcome2(1, nums, {});

    nums.pop();
    const maxOutcomeWithoutLast = MaxOutcome2(0, nums, {});

    return Math.max(maxOutcomeFrom2nd, maxOutcomeWithoutLast);
};

const MaxOutcome2 = (i: number, houses: number[], cache: { [i: number] : number }) => {
    //recursive algorithm, calculates max possible cost starting from index i (and ascending)
    if (i >= houses.length) {
        return 0; //out of range
    }

    if (cache[i] != undefined) {
        return cache[i];
    }
    else {
        const outcome = Math.max( houses[i] + MaxOutcome2(i + 2, houses, cache), MaxOutcome2(i + 1, houses, cache) ); //either choose to rob current house, or don't rob and then move to house i + 1
        cache[i] = outcome;
        return outcome;
    }
}

console.log(rob([2, 1, 1, 2]))