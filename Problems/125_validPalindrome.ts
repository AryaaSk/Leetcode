function isPalindrome(s: string): boolean {
    const allowedItems = new Set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

    let frontCounter = NextValidCharacter(0, s, allowedItems, 1);
    let backCounter = NextValidCharacter(s.length - 1, s, allowedItems, -1);

    while (frontCounter <= backCounter) { //continue until front counter is at or ahead of back counter
        if (s[frontCounter].toLowerCase() != s[backCounter].toLowerCase()) {
            return false;
        }

        frontCounter = NextValidCharacter(frontCounter + 1, s, allowedItems, 1);
        backCounter = NextValidCharacter(backCounter - 1, s, allowedItems, -1);
    }

    return true;
};

const NextValidCharacter = (i: number, s: string, allowedItems: Set<string>, direction: number) => {
    //returns the next valid character at or after i
    let currentI = i;
    while (!allowedItems.has(s[currentI]) && (currentI >= 0 && currentI < s.length)) { //increment front and back counter until they reach a valid item
        currentI += direction;
    }
    return currentI
}


console.log(isPalindrome("Live on evasions? No, I save no evil."));
//liveonevasionsnoisavenoevil

//amanaplanacanalpanama
