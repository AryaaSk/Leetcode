function carFleet(target: number, position: number[], speed: number[]): number {
    //target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]

    //first combine position and speed into a single array
    const cars: { position: number, speed: number, arrivalTime: number }[] = [];
    let i = 0;
    while (i != position.length) {
        //time = distance / speed -> time = (target - position) / speed
        const arrivalTime = (target - position[i]) / speed[i]
        const car = { position: position[i], speed: speed[i], arrivalTime: arrivalTime };
        console.log(car, cars);

        cars.push(car);
        i += 1;
    };

    //then sort cars based on position
    cars.sort((a, b) => a.position - b.position);

    //loop from front of pack to back of pack
    //if a car arrives at time T, and the cars behind all arrive a time < T, then all these cars form 1 fleet
    //thus we need to keep track of the last car to arrive for each fleet, which is given by the greatest time within that fleet
    let fleets = 1;
    let currentFleetGreatestTime = cars.pop().arrivalTime;
    for (let i = cars.length - 1; i >= 0; i -= 1) {
        const currentCar = cars[i];
        if (currentCar.arrivalTime <= currentFleetGreatestTime) {
            //this currentCar is part of the same fleet
        }
        else {
            fleets += 1;
            currentFleetGreatestTime = currentCar.arrivalTime;
        }
    }
    
    return fleets;
}

console.log(carFleet(10, [0,4,2], [2,1,3]))