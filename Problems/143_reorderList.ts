class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function reorderList(head: ListNode | null): void {
    if (head == null || head.next == null || head.next.next == null) return;

    //get 'second half' of list in slow
    let fast = head;
    let slow = head;
    while (fast.next != null && fast.next.next != null) { //fast is the foresight, to ensure slow only goes upto the middle/previous middle
        fast = fast.next.next;
        slow = slow.next;
    }

    //reverse slow
    let storage = slow.next;
    slow.next = null;
    slow = null;
    while (storage != null) {
        const temp = storage.next;
        storage.next = slow;
        slow = storage;
        storage = temp;
    }

    //'interlace' slow with head
    while (slow != null) {
        const temp = head.next;
        head.next = slow;
        head = head.next;
        slow = temp;
    }

    //we lose track of the pointer head, however the original variable has now been modified
};

const testList1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, null))));
const testList2 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null)))));
console.log(reorderList(testList2));
console.log(testList2);