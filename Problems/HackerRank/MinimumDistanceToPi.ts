//JS simply isn't precise enough and doesn't have large decimal support, will switch to python

const min = 309814880690843;
const max = 309815865022793;

//Running into issues regarding accuracy
//Plan: Remove all floating points and multiply all numbers by 10*30.
//This will allow me to get 30 d.p. of accuracy
//Big int is too slow, will try using regular number type

const PI = 3.1415926535897931797658451191693855162368;
const SCALAR = 10**40
//Out of all all possible fractions a/b with b between min and max inclusive, we want the 2 either side of pi

const CompareFractionToPI = (a: number, b: number): number => {
    //return highly accurate difference between pi and number
    //the returned difference doesn't need to be the true difference, it just needs to be consistent across values

    const fraction = a * SCALAR / b;
    const scaledPi = PI * SCALAR;
    const scaledDifference = scaledPi > fraction ? scaledPi - fraction : fraction - scaledPi;

    //console.log(scaledDifference, fraction, PI);
    return scaledDifference;
}

const lowestDifference: { difference: number, a: number, b: number } = { difference: 1000*SCALAR, a: 1, b: 1 };
for (let b = min; b <= max; b += 1) {
    //multiply pi by b, then find integers either side (these are lower and upper bound for a); the closest one will be the integer which piMultiplied rounds to
    const piMultiplied = PI * b;
    const closestInteger = Math.round(piMultiplied); //a

    const difference = CompareFractionToPI(closestInteger, b);

    if (difference < lowestDifference.difference) {
        lowestDifference.difference = difference;
        lowestDifference.a = closestInteger;
        lowestDifference.b = b;
    }
}

console.log(lowestDifference)
console.log(`${lowestDifference.a}/${lowestDifference.b}`);