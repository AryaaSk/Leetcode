class MinStack {
    //as items get added, the current min is also updated, however if an item is removed, we can simply 'look back in history' for the previous min
    //can also initialise with values since pop(), top() and getMin() are only called with non-empty stacks
    stack: { num: number, currentMin: number }[] = [{ num: Infinity, currentMin: Infinity }];

    constructor() {}

    push(val: number): void {
        const currentMin = Math.min(this.stack[this.stack.length - 1].currentMin, val);
        this.stack.push( { num: val, currentMin: currentMin } );
    }

    pop(): void {
        this.stack.pop();
    }

    top(): number {
        return this.stack[this.stack.length - 1].num;
    }

    getMin(): number {
        return this.stack[this.stack.length - 1].currentMin; //return most recent (lowest) minimum
    }
}

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // return -3
minStack.pop();
console.log(minStack.top());    // return 0
console.log(minStack.getMin()); // return -2