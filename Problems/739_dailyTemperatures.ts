function dailyTemperatures(temperatures: number[]): number[] {
    //the number of days you have to wait from each index to get a warmer day
    const answers = new Array(temperatures.length).fill(0);

    const previousTempStack: { temp: number, index: number }[] = [];
    for (let i = temperatures.length - 1; i >= 0; i -= 1) {
        const currentTemp = temperatures[i];

        //looking for an increase within the stack
        while (previousTempStack.length > 0 && currentTemp >= previousTempStack[previousTempStack.length - 1].temp) {
            previousTempStack.pop();
        }

        //now top item on stack is guaranteed to be greater than current temp (or stack is empty and current temp is greatest, for which we may just leave 0)
        if (previousTempStack.length > 0) {
            const nextGreatestTemperature = previousTempStack[previousTempStack.length - 1];
            const distance = nextGreatestTemperature.index - i;
            answers[i] = distance;
        }

        previousTempStack.push({ temp: currentTemp, index: i });
    }

    return answers;
};

console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));