//https://leetcode.com/problems/add-two-numbers/

/*
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}
*/

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const [list1, list2] = [convertLinkedListArray(l1).reverse(), convertLinkedListArray(l2).reverse()];
    const [num1, num2] = [BigInt(list1.join("")), BigInt(list2.join(""))];
    const result = num1 + num2;

    const resultReversedString = String(result).split("").reverse().join(""); //converting to string -> list -> reversed -> string
    const resultReversedArray = Array.from(String(resultReversedString), Number);

    return convertArrayToLinkedList(resultReversedArray);
};

const convertLinkedListArray = (li: ListNode | null) => {
    const array: number[] = [];

    let currentNode = li;
    while (true) {
        array.push(currentNode.val);
        if (currentNode.next == null) {
            break;
        }
        else {
            currentNode = currentNode.next;
        }
    }

    return array;
}

const convertArrayToLinkedList = (array: number[]) => {
    let linkedList = new ListNode(array[array.length - 1], null);
    for (let i = array.length - 2; i != -1; i -= 1) {
        const newLinkedList = new ListNode(array[i], linkedList);
        linkedList = newLinkedList;
    }

    return linkedList;
}