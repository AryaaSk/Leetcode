function threeSum(nums: number[]): number[][] {
    const triplets = [];
    
    nums.sort((a: number, b: number) => a - b);

    let i = 0;
    while (i < nums.length - 2) {
        if (nums[i] > 0) return triplets;
        const requiredSum = 0 - nums[i];

        //now use j and k similar to 2sum
        let j = i + 1;
        let k = nums.length - 1;

        while (j < k) {
            const sum = nums[j] + nums[k];
            if (sum == requiredSum) {
                triplets.push( [nums[i], nums[j], nums[k]] );

                while (nums[j] == nums[j + 1]) j += 1; //get a new unique pair
                while (nums[k] == nums[k - 1]) k -= 1;
                j += 1;
                k += 1;
            }
            else if (sum < requiredSum) j += 1;
            else k -= 1 //sum > requiredSum
        }

        while (nums[i] == nums[i + 1]) i += 1; //skip past all duplicates
        i += 1;
    }

    return triplets;
};

console.log(threeSum([-2,0,0,2,2]));