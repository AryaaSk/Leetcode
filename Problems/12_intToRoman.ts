function intToRoman(num: number): string {
    //split number into the basic Roman parts:
    const numeralMap = { 
        1: "I",
        5: "V",
        10: "X",
        50: "L",
        100: "C",
        500: "D",
        1000: "M"
    }
    //similar to coin denominations, split into fewest number of denominations possible
    const denominations = [1, 5, 10, 50, 100, 500, 1000].reverse();

    const currentDenominations: number[] = [];
    let value = num;
    while (true) {
        for (const denomination of denominations) {
            if (denomination <= value) {
                value -= denomination;
                currentDenominations.push(denomination);
                break;
            }
        }

        if (value == 0) {
            break;
        }
    }

    //now need a mechanism to convert numbers such as 4 from [1, 1, 1, 1] to [5, 1]
    //this is because 4 would not be IIII, but instead IV

    let i = 0;
    while (i < currentDenominations.length - 3) {
        //check for quadruple repeats
        const [a, b, c, d] = [currentDenominations[i], currentDenominations[i + 1], currentDenominations[i + 2], currentDenominations[i + 3]];
        if (a == b && b == c && c == d) {
            //find current denomination and above denomination
            const currentDenomination = a;
            let higherDenomination = -1;
            for (let a = 0; a != denominations.length; a += 1) {
                if (denominations[a] == currentDenomination) {
                    higherDenomination = denominations[a - 1];
                }
            }

            currentDenominations.splice(i, 4, currentDenomination, higherDenomination);
            i -= 2;
        }
        else {
            i += 1;
        }
    }

    //similarly, need to convert numbers like 9 from [5, 4] to [10, 1]
    //or 90 from [50, 40] to [100, 10]

    //this would be identified in the current stucture, as 90 = [50, 10, 50], so look for 2 repeating elements which start with 5
    i = 0;
    while (i < currentDenominations.length - 2) {
        const currentLetter = currentDenominations[i];
        const letter2Infront = currentDenominations[i + 2];
        if (currentLetter == letter2Infront && String(currentLetter)[0] == "5") {
            //e.g. [500, 100, 500] -> [100, 1000]
            currentDenominations[i] = currentDenominations[i + 1]
            currentDenominations[i + 1] = currentLetter * 2;
            currentDenominations.splice(i + 2, 1);

            i += 2; //since we removed 1 item, and the next item was affected by this change
        }
        else {
            i += 1;
        }
    }
    console.log(currentDenominations);

    let returnNumeral = "";
    for (const denomination of currentDenominations) {
        returnNumeral = returnNumeral + numeralMap[denomination];
    }
    return returnNumeral;
};