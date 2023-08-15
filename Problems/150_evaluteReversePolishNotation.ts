function evalRPN(tokens: string[]): number {
    //https://en.wikipedia.org/wiki/Reverse_Polish_notation

    const operators: { [operator: string] : (a: number, b: number) => number } = {
        "+" : (a: number, b: number) => a + b,
        "-" : (a: number, b: number) => a - b,
        "*" : (a: number, b: number) => a * b,
        "/" : (a: number, b: number) => { const result = a / b; if (result < 0) return Math.ceil(result); else return Math.floor(a / b)}
    };
    
    //loop through, once a opertor token has been found, gather the 2 previous terms and apply the operator
    while (tokens.length > 1) {
        let i = 0;
        while (i < tokens.length) {
            if (operators[tokens[i]] != undefined) {
                const [token1, token2] = [Number(tokens[i - 2]), Number(tokens[i - 1])];
                const result = (operators[tokens[i]])(token1, token2)
                tokens[i] = String(result);
                tokens.splice(i - 2, 2);

                i -= 2;
            }
            i += 1;
        }
    }

    return Number(tokens[0])
};

console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]))