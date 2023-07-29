function productExceptSelf(nums: number[]): number[] {
    //1, 2, 3, 4
    
    //calculate prefixProducts for each value
    const prefixProducts = new Array(nums.length).fill(1);
    for (let i = 1; i != nums.length; i += 1) {
        prefixProducts[i] = prefixProducts[i - 1] * nums[i - 1];
    }

    //instead of creating suffixProducts, we can save space by directly using nums
    nums.push(1);

    let prevNum = 1;
    for (let i = nums.length - 3; i != -1; i -= 1) {
        const beforeOverwrite = nums[i];
        nums[i] = prevNum * nums[i + 1];
        prevNum = beforeOverwrite; //since it gets overwritten by the product

        prefixProducts[i] *= nums[i];
    }

    //try to directly multiply prefixProduct by a value rather than storing in suffixProduct

    return prefixProducts;
}

console.log(productExceptSelf([1, 2, 3, 4]));