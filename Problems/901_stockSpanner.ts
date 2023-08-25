//brute force: simply store all prior prices, and for each next() call, go backwards for as long as possible
//slow because we need to check all items in list going backwards

//for each price, we are looking to see how far backwards we can go before encountering a prior price greater than it
//therefore we are looking for the previous greater element, specifically the distance to this element

//e.g. in prices: [[Infinity], [100], [80], [60], [70], [60], [75], [85]]
//we are looking for result: [null, 1, 1, 1, 2, 1, 4, 6]

//this is done by keeping track of the current index and using a monotonically decreasing stack
//stack: [infinity]
//100 -> [inf, 100], previous greater value for 100 is inf
//80 -> [inf, 100, 80], pgv for 80 is 100
//60 -> [inf, 100, 80, 60], pgv for 60 is 80
//70 -> [inf, 100, 80, 70], pgv for 70 is 80
//60 -> [inf, 100, 80, 70, 60], pgv for 60 is 70
//75 -> [inf, 100, 80, 75], pgv for 75 is 80
//85 -> [inf, 100, 85], pgv for 85 is 100
//stack.length is always >= 1 since no number is >= inf
//keep track of indexes for each number, as well as current index as if we were looping through list, and return distance between them

class StockSpanner {
    decreasingPriceStack: { num: number, index: number }[] = [{ num: Infinity, index: 0 }];
    currentIndex: number = 0;

    constructor() {}

    next(price: number): number {
        this.currentIndex += 1;
        while (this.decreasingPriceStack.length > 0 && price >= this.decreasingPriceStack[this.decreasingPriceStack.length - 1].num) this.decreasingPriceStack.pop();
        const previousGreaterPrice = this.decreasingPriceStack[this.decreasingPriceStack.length - 1];

        const distance = this.currentIndex - previousGreaterPrice.index;
        this.decreasingPriceStack.push({ num: price, index: this.currentIndex });

        return distance;
    }
}

const stockSpanner = new StockSpanner();
console.log(stockSpanner.next(100)); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
console.log(stockSpanner.next(75));  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6