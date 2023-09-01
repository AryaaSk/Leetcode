//[4,5,6,7,0,1,2]

//regualr min: loop through and keep track of minimum; O(n)

//cannot use regular binary search since the array is not fully sorted
//however if we can split it into 2 arrays, then each array becomes sorted

//notice, because the rotation moves the largest element at the end to the front, the first 'sorted' array will consist of elements which are all larger than the second 'sorted' array
//therefore, we simply need to find the start of the second 'sorted' array, and then we are done
//we are looking for the first element after nums[0] which is greater than nums[0]; if this doesn't exist, it means nums[0] is the smallest the array is fully sorted

//store reference number (nums[0])
//use left and right bounds to store candidates for number lower than reference (1, nums.length - 1), assuming nums.length > 1
//narrow down bounds until left == right

//e.g. reference number = 4
//4[5,6,7,0,1,2]    check mid item (higher) -> 0; 0 is smaller than 4, therefore is already part of the second 'sorted' array, therefore reduce upper bound
//4[5,6,7,0]1,2     mid item = 7; 7 > 4, therefore is part of first 'sorted' array, therefore cannot be a candidate, and we can increase lower bound to element after it
//4,5,6,7[0]1,2     left == right, therefore exit

//e.g. [11,13,15,17], reference number = 11; left, right = 1, 3
//11[13,15,17]      mid item = 15; 15 > 11, therefore increase lower bound
//11,13,15[17]      left == right; 

//since we don't know whether the narrowed item will defintely be > reference, we need to do 1 more check at the end

//EDIT: had to choose lower, since otherwise left could be set outside of nums range

function findMin(nums: number[]): number {
    if (nums.length == 1) return nums[0];

    const referenceNumber = nums[0];
    let [left, right] = [1, nums.length - 1];

    while (left < right) {
        const midIndex = Math.floor((left + right) / 2);
        const midNum = nums[midIndex];

        if (midNum > referenceNumber) { //still part of first 'sorted' array
            left = midIndex + 1;
        }
        else { //part of second 'sorted' array, therefore could be a candidate for lowest; all numbers after this will be greater though
            right = midIndex;
        }
    }

    //final check (left = right)
    if (nums[left] > referenceNumber) return referenceNumber
    else return nums[left]
};

console.log(findMin([3,4,5,1,2]))