function containsDuplicate(nums: number[]): boolean {
    const numsSet = new Set(nums);
    return numsSet.size != nums.length;
};

console.log(containsDuplicate([1,2,3,4]))