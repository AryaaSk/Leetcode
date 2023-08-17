function largestRectangleArea(heights: number[]): number {
    //brute force: for each bar, find the first bar to the left and right which is smaller than it
    //this enables us to create a rectangle in which the bar is the limiting factor, thus creating the maximum area for each bar
    let maxArea = 0;

    //the reason this is slow is because for each bar, we have to loop basically through the entire list to find the bounds
    //we can speed this up using knowledge of the nextGreaterNumber problem and dailyTemperatures

    //so for each element in heights, we want to record the distance to the the next greater number
    //we essentially check if the number is smaller than the top item of the stack, and if so, we 'sign off' numbers within the stack until the top item is again greater than the current number
    const nextSmallerDistances = new Array(heights.length).fill(-1);

    //take a slightly different approach to compute previous smaller number distances, based on stack holding valid candidates
    const previousSmallerDistances = new Array(heights.length).fill(-1);

    const nextStack: { num: number, index: number }[] = [];
    const previousStack: { num: number, index: number }[] = [];
    for (const [i, num] of heights.entries()) {
        while (nextStack.length > 0 && num < nextStack[nextStack.length - 1].num) {
            const signOffNum = nextStack.pop(); 
            const distance = i - signOffNum.index;
            nextSmallerDistances[signOffNum.index] = distance;
        }
        nextStack.push({ num: num, index: i }); //push to the stack so that this number can also be 'signed off' by a future number

        while (previousStack.length > 0 && previousStack[previousStack.length - 1].num >= num) {
            //remove all numbers greater than num in stack, since num is a better candidate and we are looking for matches
            previousStack.pop();
        }
        //top item on stack is guaranteed to be < num, or stack is empty
        if (previousStack.length > 0) {
            const previousSmallerNum = previousStack[previousStack.length -1];
            const distance = i - previousSmallerNum.index;
            previousSmallerDistances[i] = distance;
        }
        previousStack.push({ num: num, index: i });
    }

    for (let i = 0; i != heights.length; i += 1) {
        const limitingHeight = heights[i];

        //now that we have information about the next smaller element on both the left and right of the current element
        //if there isn't a smaller item to the left/right, this means we can take the whole distance to the left/right edge
        const leftDistance = previousSmallerDistances[i] != -1 ? previousSmallerDistances[i] : i + 1;
        const rightDistance = nextSmallerDistances[i] != -1 ? nextSmallerDistances[i] : heights.length - i;
        
        const width = leftDistance + rightDistance - 1;
        const area = width * limitingHeight;
        maxArea = Math.max(maxArea, area);
    }

    return maxArea;
}

console.log(largestRectangleArea([2,1,5,6,2,3]))