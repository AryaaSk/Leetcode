function longestConsecutive(nums: number[]): number {
    if (nums.length == 0) return 0;

    const numbers = new Set(nums);

    //iterate through numbers, and once you find a number which is a minimum of its corresponding streak (number - 1 doesn't exist in set), find the total length of that streak
    let maximumStreak = 0;

    for (const num of numbers) {
        if (numbers.has(num - 1)) {
            continue; //not the minimum num in the streak
        }

        //otherwise we can assume the num is now the minimum of the streak
        let streak = 0;
        let currentNum = num;
        while (numbers.has(currentNum)) {
            streak += 1;
            currentNum += 1;
        }

        if (streak > (numbers.size / 2)) return streak;
        if (streak > maximumStreak) maximumStreak = streak;
    }

    return maximumStreak;
};


console.log(longestConsecutive([100,4,200,1,3,2]))