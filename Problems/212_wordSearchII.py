class TrieNode(object):
    def __init__(self):
        self.next = {}
        self.isLeafNode = "" #instead of using true and false, we will use "" or the actual word; this saves us from having to store the word separately in the dfs call

class Solution(object):
    def findWords(self, board, words):
        """
        :type board: List[List[str]]
        :type words: List[str]
        :rtype: List[str]
        """
        
        #backtracking + trie
        foundWords = []

        #first initialise trie as dictionary with words to search for
        root = TrieNode()

        for word in words:
            current = root
            for letter in word:
                if letter not in current.next:
                    current.next[letter] = TrieNode()
                current = current.next[letter]

            current.isLeafNode = word

        #useful constants
        boardHeight = len(board)
        boardWidth = len(board[0])

        visitedSquares = set() #keeps track of all squares visited in the current depth first search
        def SearchSquare(node, row, col):
            #check if we are in a valid row and col
            if row < 0 or row >= boardHeight or col < 0 or col >= boardWidth or (row, col) in visitedSquares:
                return

            visitedSquares.add((row, col))

            #we take in the previous node of the tree to check whether the current letter is a possible next path - if it isn't then the current search doesn't have any matches so we cancel
            letter = board[row][col]
            if letter in node.next:
                lettersNode = node.next[letter]
                #this could be the final letter of the path; i.e. we've found a word
                if lettersNode.isLeafNode != "":
                    foundWords.append(lettersNode.isLeafNode)
                    lettersNode.isLeafNode = ""

                    #todo: if letter node doesn't contain any nodes underneath it, then prune it to effectively remove this word from the trie

                #the current square is also prefix within the trie; so we continue the search
                SearchSquare(lettersNode, row + 1, col)
                SearchSquare(lettersNode, row - 1, col)
                SearchSquare(lettersNode, row, col + 1)
                SearchSquare(lettersNode, row, col - 1)

            visitedSquares.remove((row, col)) #once all calls from current square are complete, we 'retreat'

        for row in range(boardHeight):
            for col in range(boardWidth):
                SearchSquare(root, row, col)

        return foundWords