class Solution(object):
    def isValid(self, s):
        #use a stack, add open brackets to the top of the stack, and use close brackets to pop the corresponding item off the stack
        #if the popped item is not the complimentary bracket or if there aren't any items left in the stack then s isn't valid
        #additionally, if there are still items left in the stack once the loop completes then there are unclosed brackets and so s isn't valid

        stack = []
        bracketPairs = { "(": ")", "[": "]", "{": "}" }

        for bracket in s:
            if bracket in bracketPairs: #open bracket, add to stack
                stack.append(bracket)
            else: #closed bracket
                try:
                    mostRecentBracket = stack.pop()
                    if bracket != bracketPairs[mostRecentBracket]: #checking if bracket != compliment of most recent bracket -> wrong bracket -> s isn't valid
                        return False

                except IndexError: #thrown if there are no more items in stack -> too many closed brackets -> s isn't valid
                    return False

        if len(stack) > 0: #too many open brackets
            return False

        return True #if all checks are passed, s is valid
                    

