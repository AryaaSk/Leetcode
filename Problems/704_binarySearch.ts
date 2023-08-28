function search(nums: number[], target: number): number {
    //use binary search to find target in nums
    //two pointers: left and right

    let [left, right] = [0, nums.length - 1];
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midNumber = nums[mid];
        
        if (target == midNumber) return mid;
        else if (target > midNumber) left = mid + 1;
        else right = mid - 1;
    }

    return -1;
};

console.log(search([-1,0,3,5,9,12], 2))