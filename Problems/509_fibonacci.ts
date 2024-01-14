/*
//Can improve speed even further by pre-computing these values
//const PHI = (1 + Math.sqrt(5)) / 2;
const PHI = 1.618033988749895;
const PHI_NEGATIVE_RECIPRICOL = -0.6180339887498948;
const ROOT5 = 2.23606797749979;

function fib(n: number): number {
    //Generalisation of Fibonacci sequence using generator functions
    //return Math.trunc((PHI**n - (-1/PHI)**n) / Math.sqrt(5));
    return Math.trunc((PHI**n - PHI_NEGATIVE_RECIPRICOL**n) / ROOT5);
};
*/

//Can also implement using classic memoisation and recursion
function fib(n: number): number {
    return FIB_WITH_CACHE({}, n);
};

const FIB_WITH_CACHE = (cache: { [n: number] : number }, n: number) => {
    //recursion with caching
    if (n == 0 || n == 1) return n;
    if (cache[n] != undefined) return cache[n];

    const output = FIB_WITH_CACHE(cache, n - 1) + FIB_WITH_CACHE(cache, n - 2);
    cache[n] = output; //if cache did contain output for n then code execution wouldn't reach here

    return output
}

console.log(fib(523));