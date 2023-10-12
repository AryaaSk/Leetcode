//[7,1,5,3,6,4]

//keep track of lowest stock so far, then for each price after, calculate profit and keep track of max profit

function maxProfit(prices: number[]): number {
    let lowestPrice = prices[0];
    let maxProfit = 0;

    for (const price of prices) {
        //max profit from current price will be achieved by (current price - lowest previous price)
        const currentProfit = price - lowestPrice;
        if (currentProfit > maxProfit) maxProfit = currentProfit;

        if (price < lowestPrice) lowestPrice = price;
    }

    return maxProfit;
};