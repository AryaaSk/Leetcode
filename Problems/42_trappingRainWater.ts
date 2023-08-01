function trap(height: number[]): number {
    //front and back pointer, will attempt to fill optimally

    let [front, back] = [0, height.length - 1];

    let [frontMaxHeight, backMaxHeight] = [0, 0]; //could also be height[front], height[back]

    let totalArea = 0;

    while (front < back) {
        const [frontHeight, backHeight] = [height[front], height[back]];

        //now if there was nothing between front and back, we could fill to a max height of min(front, back)
        //therefore to fill optimatlly we must look at the limiting height
        if (frontHeight < backHeight) {
            //front height is limiting
            //now the max height we can fill from this point is upto the maximum prior left height
            if (frontHeight < frontMaxHeight) { //there was a 'dip'
                totalArea += frontMaxHeight - frontHeight;
            }
            else {
                //otherwise there was no dip, and therefore no area can be filled
                frontMaxHeight = frontHeight
            }
            front += 1;
        }
        else { // back height is limiting
            //similar idea to front height, and by only moving the limiting height, we ensure we won't reach a situation where the front pointer is filling to a greater height than the back pointer or vice versa

            if (backHeight < backMaxHeight) {
                totalArea += backMaxHeight - backHeight;
            }
            else {
                backMaxHeight = backHeight;
            }
            back -= 1;
        }
    }

    return totalArea;
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));