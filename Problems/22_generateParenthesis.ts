function generateParenthesis(n: number): string[] {
    //generate all valid combinations of n pairs of parenthesis
    const completedList: string[] = [];
    GenerateNewStrands(completedList, "", 0, 0, n);
    return completedList;
};

const GenerateNewStrands = (list: string[], current: string, open: number, close: number, n: number) => { //each recursion thread will continue until it gets added to the list
    if (open == n && close == n) { //string building is over
        list.push(current);
        return;
    }

    //if we can add an open then add it (as this will always be valid)
    if (open < n) GenerateNewStrands(list, current + "(", open + 1, close, n);

    //we never want close > open, so only create a new close branch if close < open
    if (close < open) GenerateNewStrands(list, current + ")", open, close + 1, n);
}

console.log(generateParenthesis(8));