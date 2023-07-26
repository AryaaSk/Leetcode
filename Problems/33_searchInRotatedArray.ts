/*
function search(nums: number[], target: number): number {
    //deal with outlier cases first
    if (nums.length == 1) {
        if (nums[0] == target) {
            return 0;
        }
        else {
            return -1;
        }
    }

    //given list which has been rotated around pivot (index [0])
    //check for target element

    //find index of lowest element in list (the sign change)
    let leapSize = Math.ceil((nums.length - 1) / 2);
    let i = 0;
    while (true) {
        while (nums[i] < nums[i + leapSize]) {
            i += leapSize;
        }

        if (nums[i] > nums[i + 1]) {
            i += 1;
            break;
        }
        if (leapSize == 0) {
            i = 0; //ascending order
            break;
        }
        leapSize = Math.ceil((leapSize - 1) / 2);
    }
    const lowestElementIndex = i;

    if (i == 0) {
        return BinarySearch(nums, target);
    }

    //otherwise split into big and small list
    const bigList = nums;
    const smallList = bigList.splice(i);
    
    const pivotElement = bigList[0];
    if (target < pivotElement) {
        const index = BinarySearch(smallList, target);
        return index != -1 ? index + lowestElementIndex : -1;
    }
    else {
        return BinarySearch(bigList, target);
    }
};

const BinarySearch = (list: number[], target: number) => {
    let indexes: number[] = []; //keep index list coupled to main list to easily return indexes
    for (let i = 0; i != list.length; i += 1) {
        indexes.push(i);
    }

    while (true) {
        const i = Math.ceil((list.length - 1) / 2);
        if (list[i] == target) {
            return indexes[i]
        }
        if (list.length == 1 || list.length == 0) {
            return -1; //doesn't exist in list
        }

        //otherwise split list
        if (target > list[i]) {
            list = list.splice(i);
            indexes = indexes.splice(i);
        }
        else {
            list.splice(i);
            indexes.splice(i);
        }
    }
}
*/

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

console.log(search([3, 1], 3));