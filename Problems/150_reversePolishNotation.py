import math

class Solution(object):
    def evalRPN(self, tokens):
        #use a stack while looping through tokens: if token is a number add it to the stack, if token is an operator then check if there are 2 numbers already in the stack
        #if so then 'cut' the stack down

        stack = []
        
        operatorFunctions = {
            "+": lambda a, b: a + b,
            "-": lambda a, b: a - b,
            "*": lambda a, b: a * b,
            "/": lambda a, b: int(float(a) / b) #convert at least 1 num to a float, otherwise integer division will be performed which will round down even for negative values (we want to round towards 0)
        }

        for token in tokens:
            if token not in operatorFunctions:
                stack.append(int(token))
            else:
                #since tokens is a valid RPN string, there will always be 2 numbers behind a token, so we don't have to actually check
                num2 = stack.pop()
                num1 = stack.pop()
                stack.append(operatorFunctions[token](num1, num2))

        return stack[0]

solution = Solution()
print(solution.evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]))