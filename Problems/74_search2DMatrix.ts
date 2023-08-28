function searchMatrix(matrix: number[][], target: number): boolean {
    //treat matrix as a sorted list
    
    const length = matrix.length * matrix[0].length;
    const width = matrix[0].length;

    let [left, right] = [0, length - 1];
    while (left <= right) {
        const mid = (left + right + 1) >> 1;
        const [referenceRow, referenceCol] = IndexConverter(mid, width);
        const reference = matrix[referenceRow][referenceCol];

        if (target == reference) return true;
        else if (target < reference) right = mid - 1;
        else left = mid + 1;
    }

    return false;
};

const IndexConverter = (index: number, width: number) => {
    //e.g. in a matrix with width 4 and height 3
    //index 0: 0, 0
    //index 5: 5 // 4, 5 % 4 -> 1, 1
    return [(index / width) >> 0, index % width];
}

console.log(searchMatrix([[1]], 1));