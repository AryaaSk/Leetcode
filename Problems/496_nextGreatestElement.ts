function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    //create an answers array for nums2, then copy into nums1
    const answers = new Array(nums1.length).fill(-1);
    const nums1IndexMapping: { [num: number] : number } = {};
    for (const [i, num] of nums1.entries()) nums1IndexMapping[num] = i;


    const nextGreatestIndices = new Array(nums2.length).fill(0); //stores the index of the next greater element for each index
    nextGreatestIndices[nextGreatestIndices.length - 1] = -1; //the final item doesn't have anuthing to the right of it

    //brute force: for each number, move forward until you hit a greater number
    //O(n^2) as you need to search entire list for each num
    //what if we could reuse calculations, e.g. set j to nextGreatestIndices[j]; we know that nums2[j] isn't a valid pair, so we should look for a number greater than that, which is given by nextGreatestIndices[j]. Keep doing this until you reach a number that is also greater than nums2[i]
    for (let i = nums2.length - 2; i >= 0; i -= 1) {
        let j = i + 1;
        while (j != -1) {
            if (nums2[j] > nums2[i]) {
                break; //found the greater element
            }
            j = nextGreatestIndices[j]; //the trick is that as i comes from the left, it will either be set as -1 or the correct element
        }
        console.log(j)

        nextGreatestIndices[i] = j; //the loop ensures j is the correct answer
        if (nums1IndexMapping[nums2[i]] != undefined) {
            const index = nums1IndexMapping[nums2[i]];
            //nextGreatestIndices[i] = j
            answers[index] = j == -1 ? - 1 : nums2[j];
        }
    }

    return answers;
};

console.log(nextGreaterElement([4,1,2], [1,3,4,2]));