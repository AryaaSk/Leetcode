function getPermutation(n: number, k: number): string {
    const perms: number[][] = [];

    for (let i = 1; i <= n; i += 1) {
        
    }

    const availableNums = [1, 2, 3];
    AddPermutation(perms, [], availableNums, 3);
    console.log(perms);

    return "";
};

const AddPermutation = (perms: number[][], currentPerm: number[], availableNums: number[], n: number) => {
    while (availableNums.length > 0) {
        currentPerm.push(availableNums[0]);
        availableNums.splice(0, 1);
    };
    perms.push(currentPerm);
}

console.log(getPermutation(3, 2));

//return the kth permutation of the set [1 2 3 ... n]

//e.g. if n = 3:
//1, 2, 3
//1, 3, 2
//2, 1, 3
//2, 3, 1
//3, 1, 2
//3, 2, 1