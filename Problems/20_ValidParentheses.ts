function isValid(s: string): boolean {
    if (s.length % 2 == 1) return false; //for valid must have many pairs of brackets

    //use a stack, if its an open bracket, then add to stack, otherwise if its a close bracket, try to close stack
    const bracketPairs = { "}" : "{", "]" : "[", ")" : "(" };

    const bracketStack = [];
    for (const bracket of s) {
        if (bracketPairs[bracket] == undefined) bracketStack.push(bracket); //open bracket
        else {
            //close bracket
            const finalBracket = bracketStack.pop();
            if (bracketPairs[bracket] != finalBracket) return false;
        }
    }

    if (bracketStack.length != 0) return false;
    
    return true;
};

console.log(isValid("(}"))