function rob(nums: number[]): number {
    //[1, 2, 3, 4]
    return MaxOutcome(0, nums, {});
}

const MaxOutcome = (i: number, houses: number[], cache: { [i: number] : number }) => {
    //recursive algorithm, calculates max possible cost starting from index i (and ascending)
    if (i >= houses.length) {
        return 0; //out of range
    }

    if (cache[i] != undefined) {
        return cache[i];
    }
    else {
        const outcome = Math.max( houses[i] + MaxOutcome(i + 2, houses, cache), MaxOutcome(i + 1, houses, cache) ); //either choose to rob current house, or don't rob and then move to house i + 1
        cache[i] = outcome;
        return outcome;
    }
}

//now need to speed this recursive algorithm up
//implemenet a memoisation/cache of MaxOutcomes, as MaxOutcome(i, houses) is really just a function of i (houses is a constant)

console.log(rob([114,117,207,117,235,82,90,67,143,146,53,108,200,91,80,223,58,170,110,236,81,90,222,160,165,195,187,199,114,235,197,187,69,129,64,214,228,78,188,67,205,94,205,169,241,202,144,240]));