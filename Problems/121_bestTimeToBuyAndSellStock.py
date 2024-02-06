class Solution(object):
    def maxProfit(self, prices):
        """
        :type prices: List[int]
        :rtype: int
        """

        #keep track of lowest price, and check if current price would provide greatest profit if sold at
        greatestProfit = 0
        lowestPriceSoFar = prices[0]
        for price in prices:
            if price < lowestPriceSoFar:
                lowestPriceSoFar = price
                continue

            profit = price - lowestPriceSoFar
            if profit > greatestProfit:
                greatestProfit = profit
            
        return greatestProfit