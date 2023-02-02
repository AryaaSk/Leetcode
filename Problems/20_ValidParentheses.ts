function isValid(s: string): boolean {
    const pairs = {
        "(" : ")",
        "[" : "]",
        "{" : "}",
    };

    const complimentaryOrder: string[] = [];
    let orderBroken = false;
    for (const digit of s) {
        if (pairs[digit] != undefined) {
            //this is an opening bracket, since it has a complimentary value in the pairs
            complimentaryOrder.push(pairs[digit]);
        }
        else {
            if (digit == complimentaryOrder[complimentaryOrder.length - 1]) {
                //needs to be the most recent digit to close off the newest bracket
                complimentaryOrder.pop();
            }
            else {
                orderBroken = true;
                break;
            }
        }
    }

    if (complimentaryOrder.length != 0) { //indicates that the brackets were not fully closed off before the string ended
        orderBroken = true;
    }

    return !(orderBroken);
};