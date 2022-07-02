//https://leetcode.com/problems/median-of-two-sorted-arrays/

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    //first merge the 2 arrays
    let merged: number[] = [];
    while (true) {
        if (nums1.length == 0) {
            merged = merged.concat(nums2);
            break;
        }
        else if (nums2.length == 0) {
            merged = merged.concat(nums1);
            break;
        }

        if (nums1[0] < nums2[0]) {
            merged.push(nums1[0])
            nums1.splice(0, 1);
        }
        else {
            merged.push(nums2[0])
            nums2.splice(0, 1);
        }
    }

    const medianIndex = (merged.length + 1) / 2 - 1; //-1 because in maths they start counting from 1 instead of 0

    if (medianIndex % 1 != 0) {
        const num1 = merged[medianIndex - 0.5];
        const num2 = merged[medianIndex + 0.5];
        return (num1 + num2) / 2;
    }
    else {
        return merged[medianIndex];
    }
};