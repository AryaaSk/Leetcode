/*
function search(nums: number[], target: number): number {
    let indexes: number[] = [];
    for (let i = 0; i != nums.length; i += 1) {
        indexes.push(i);
    }
    //make sure indexes is always coupled with nums list

    const pivotNumber = nums[0];
    if (pivotNumber == target) {
        return 0; //edge case, since checking if on same side relies on pivot number
    }
    
    while (true) {
        const midIndex = Math.ceil((nums.length - 1) / 2);
        console.log(nums, midIndex);

        if (nums[midIndex] == target) {
            return indexes[midIndex];
        }
        if (nums.length == 1) {
            //can't be mid index since that's just been checked, thus the target element doesn't exist
            return -1;
        }

        //first check whether middle item and target are both on the same side (if so, then we can just split list like regular binary search)
        if ((nums[midIndex] > pivotNumber) != (target > pivotNumber)) {
            //we need to adjust the mid item to be on the same side as the target
            if (target < pivotNumber) {
                nums[midIndex] = -Infinity; //target is less than pivotNumber, so mid item should also be less than pivotNumber
            }
            else {
                nums[midIndex] = Infinity;
            }
        }

        //once the miditem has been adjusted to be on the same 'side' as the target, we can simply cut the list like regular binary search
        if (target > nums[midIndex]) {
            nums = nums.splice(midIndex);
            indexes = indexes.splice(midIndex);
        }
        else {
            nums.splice(midIndex);
            indexes.splice(midIndex);
        }
    }
}
*/

function search(nums: number[], target: number): number {
    //list can be split into 2 sorted areas
    //we want to check we are in the correct area, which can be done using the reference value

    if (nums.length == 1) {
        if (target == nums[0]) return 0;
        else return -1;
    }

    const referenceValue = nums[0]; //all items to the right of reference value will be greater, until we reach the second list; if the current item < reference, we know it is part of the second list
    if (target == referenceValue) return 0;

    const targetSide = target > referenceValue; //true means it is in first section, false means second section

    //binary search with modified narrow code
    let [left, right] = [1, nums.length - 1];
    while (left <= right) {
        const midIndex = (left + right) >> 1;
        const checkNum = nums[midIndex];

        //before using regular binary search, we want to check whether checkNum is on the same 'side' as the target
        const checkNumSide = checkNum > referenceValue;
        if (targetSide == checkNumSide) {
            //currently we are in the correct section, so we can narrow down binary search like usual
            if (target == checkNum) return midIndex;
            else if (target > checkNum) left = midIndex + 1;
            else right = midIndex - 1;
        }
        else {
            //we are on the wrong side, e.g. target is in the first section but checkNum is in the second section.
            //in this case, we know all elements to the right and including checkNum will be incorrect, so we can exclude them all
            //otherwise, if target was in second section and checkNum was in first section, we know all elements to the left and including checkNum will be incorrect
            if (checkNumSide == false) {
                right = midIndex - 1;
            }
            else {
                left = midIndex + 1;
            }
        }
    }

    return -1;
}

console.log(search([4,5,6,7,0,1,2], 0));