function romanToInt(s: string): number {
    const valueTable = {
        "I" : 1,
        "V" : 5,
        "X" : 10,
        "L" : 50,
        "C" : 100,
        "D" : 500,
        "M" : 1000
    }
    s += "I" //for standardisation

    //M,CM,XC,IV
    let total = 0;
    let i = 0;
    while (i != s.length) {
        const currentValue = valueTable[s[i]];
        const nextValue = valueTable[s[i + 1]];

        if (currentValue < nextValue) {
            total += (nextValue - currentValue);
            i += 1;
        }
        else {
            total += currentValue;
        }

        i += 1; 
    }
    total -= 1;

    return total;
};