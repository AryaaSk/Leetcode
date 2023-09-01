//[3,6,7,11], h = 8

//we have 8 hours to finish all bananas
//h must always be >= number of piles, therefore maximum k = maximum pile
//we want to see how many 'ticks' each pile requires for a k

//let p be any pile; the number of ticks this pile requires is ceil(p / k)
//start with k = max pile, e.g. 11

//ticks: [1, 1, 1, 1]; we want to increase the total number of ticks so that it equals h

//try to half k (choose lower bound): 5
//ticks: [1, 2, 2, 3], total ticks: 8
//current bounds: [1, 5]

//try to half again, k = 3
//ticks: [1, 2, 3, 4] -> now the total ticks > h, so this is invalid
//current bounds: [4, 5]

//k = 4
//ticks: [1, 2, 2, 3], total ticks: 8 -> valid
//current bounds [4, 4]

//break, return 4

//clear binary search pattern: we have a lower and upper bound for k: initially [1, max]
//continuously narrow search until upper bound == lower bound

function minEatingSpeed(piles: number[], h: number): number {
    const maxK = Math.max(...piles);
    let [lowerBound, upperBound] = [1, maxK];
    while (lowerBound < upperBound) {
        const midK = (lowerBound + upperBound) >> 1;
        const totalTicks = CountTicks(piles, midK);

        if (totalTicks <= h) { //we know the current k is valid, so bring upper bound down
            upperBound = midK
        }
        else { //current k is invalid, so bring lower bound to k + 1
            lowerBound = midK + 1;
        }
    }

    return lowerBound; //lowerBound = upperBound
};

const CountTicks = (piles: number[], k: number) => {
    let totalTicks = 0;
    for (const pile of piles) {
        const pileTicks = Math.ceil(pile / k)
        totalTicks += pileTicks;
    }
    return totalTicks;
}

console.log(minEatingSpeed([30,11,23,4,20], 6));