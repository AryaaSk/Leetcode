function topKFrequent(nums: number[], k: number): number[] {
    //store num : appearences in map
    const numAppearences = new Map();
    
    for (const num of nums) {
        if (numAppearences.has(num)) {
            numAppearences.set(num, numAppearences.get(num) + 1);
        }
        else {
            numAppearences.set(num, 1);
        }
    }

    //convert map to array (so that it can be sorted)
    const numAppearencesArray = Array.from(numAppearences); //[ [num, appearences] ]

    //sorts list into descending order based on appearences
    numAppearencesArray.sort((a: number[], b: number[]) =>  b[1] - a[1]) //if b[1] (b's appearences) is greater than a[1], they will be swapped

    const firstK = numAppearencesArray.slice(0, k); //only return first k

    const numbers = firstK.map((value: number[]) => { return value[0] }); //to create an array of pure numbers (without the appearences)

    return numbers;
};

console.log(topKFrequent([4,1,-1,2,-1,2,3], 2));