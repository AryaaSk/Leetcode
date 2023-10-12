//e.g. A [1, 4, 6, 7, 9]
// B [1, 5, 6, 11]

//after merging: A + B [1, 1, 4, 5, 6, 6, 7, 9, 11]
//median is middle value: [1, 1, 4, 5] 6 [6, 7, 9, 11]

//notice how median could also be defined as value with equal number of elements on both sides (e.g. above, this is 4)
//for even lengthed arrays: [1, 2, 5, 6, 9, 10] -> [1, 2, 5] [6, 9, 10]
//we simply don't have a middle value, however there are still equal numbers on either side

//we can calculate this number of elements on either side as floor( (m + n) / 2 ) -> the total length of the merged array halfed, floored to account for the extra middle item in odd lengthed arrays

//now we just need to find a way to partion both arrays such that we know for sure we have partioned the left and right elements in each array
//if we start by partioning array A into half, we know numElementsEachSide will always be >= than this (since B.length > 0). 
//for each A half length, there is a corresponding B length (numElementsEachSide - AHalfLength), so this is no longer an O(n^2) problem but rather now an O(n), since we only need to test different values of array A's half length
//from here, it's easy to rech O(log(m + n)) simply by using binary search to find the correct A half length, given that A is already in sorted order

//e.g. A Half Length: [(1, 4, 6) 7, 9] -> 3
//the total half length shuld be 4, so therefore the half length for B should be 1 -> [(1) 5, 6, 11]
//this implies the first half of the merged array contains [1, 4, 6] and [1]; similiarly, it suggests the second half contains [7, 9] and [5, 6, 11]
//to check if the chosen A half length is correct, we observe whether the leftmost elemnet of A's half is still in order with the rightmost element of B's second half

//if A[rightmost] > B[leftmost] it is wrong, as you clearly cannot have an element in the first half of the merged array which is larger than an element in the second half (the merged array should be sorted)
//this suggests the leftmost element of A is too large, so we need to reduce the length of A

//oppositely, if B[rightmost] > A[leftmost], this suggests the rightmost element of A is too small, so we again need to move more elements into the first half of A. Conversely, it shows B's leftmost is too large, so we need to exclude it, and to do this we need to increase A.

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const numElementsEachSide = Math.floor((nums1.length + nums2.length) / 2);

    const largerArray = nums1.length > nums2.length ? nums1 : nums2;
    const smallerArray = nums1.length <= nums2.length ? nums1 : nums2;

    let [left, right] = [Math.max(0, numElementsEachSide - smallerArray.length), numElementsEachSide]; //range of values for AHalfLength; if nums2.length is lower than required num of elements on each side, then even using all of nums2 we won't be able to fully reach this target
    while (left <= right) {
        let AHalfLength = (left + right) >> 1;
        let BHalfLength = numElementsEachSide - AHalfLength;

        //now check if these are valid  
        if (AHalfLength > 0 && largerArray[AHalfLength - 1] > smallerArray[BHalfLength]) { //leftmost element of A is too large, reduce A. If A is 0 then there is no need to compare
            right = AHalfLength - 1;
        }
        else if (BHalfLength > 0 && smallerArray[BHalfLength - 1] > largerArray[AHalfLength]) { //leftmost element of B is too large, increase A to reduce BHalfLength
            left = AHalfLength + 1;
        }
        else { //both conditions must be false, which means these are valid lengths
            largerArray.unshift(-Infinity);
            largerArray.push(Infinity);
            AHalfLength += 1;

            smallerArray.unshift(-Infinity);
            smallerArray.push(Infinity); //adding these to handle cases where halfLength = 0;
            BHalfLength += 1;

            const rightmostMerged = Math.max(largerArray[AHalfLength - 1], smallerArray[BHalfLength - 1]);
            const leftmostMerged = Math.min(largerArray[AHalfLength], smallerArray[BHalfLength]);

            if ((largerArray.length + smallerArray.length) % 2 == 0) { //if the total array is even lengthed, then the median is the average of the max(leftside) and min(rightside)
                const median = (rightmostMerged + leftmostMerged) / 2;
                return median;
            }
            else { //median is simply the rightmost element of the first half
                return leftmostMerged;
            }
        }
    }

    return 0;
};

console.log(findMedianSortedArrays([2,3,4,5], []));