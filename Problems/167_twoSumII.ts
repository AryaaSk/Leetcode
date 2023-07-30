function twoSum(numbers: number[], target: number): number[] {
    let [frontPointer, backPointer] = [0, numbers.length - 1];

    //could repeat until front pointer is ahead of back pointer, but it doesn't matter since a solution wil always exist
    while (true) {
        const sum = numbers[frontPointer] + numbers[backPointer];
        if (sum == target) {
            return [frontPointer + 1, backPointer + 1];
        }

        //if sum is too low, then we need to increase, and therefore we need to move front pointer up (ascending order -> move up will increase sum)
        if (sum < target) frontPointer += 1;
    
        //otherwise if the sum is too high then reduce back pointer, which supplies a lower 'back number', thus decreasing the sum
        else if (sum > target) backPointer -= 1;
    }
};

console.log(twoSum([2,7,11,15], 9));