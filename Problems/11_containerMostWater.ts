function maxArea(height: number[]): number {
    //Will use 2 pointers (front and back) and compare in O(n) time
    let maxArea = 0;

    let [front, back] = [0, height.length - 1];
    while (front < back) {
        const area = Math.min(height[front], height[back]) * (back - front); //height * width
        if (area > maxArea) maxArea = area;

        //increment to get larger area, move the limiting factor
        if (height[front] < height[back]) front += 1;
        else back -= 1;
    }

    return maxArea;
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]))