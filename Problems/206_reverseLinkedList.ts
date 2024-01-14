class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function reverseList(head: ListNode | null): ListNode | null {
    //a linked list is simply a collection of nodes with arrows between them pointing to the next node
    //therefore if we start at the head and want to reverse the list, we can simply reverse the direction of each arrow
    //once we reach the end, we would've reversed all the arrows, and hence reversed the direction of the entire list, therefore reversing the list

    if (head == null || head.next == null) return head; //handle edge cases, we now know there must be at least 2 items in the list

    let stored = head.next;
    head.next = null;

    while (true) {
        //for the first node in stored, change its pointer to point to the head of the head
        //since we remove the pointer to the rest of stored, we need to keep the data somewhere
        const remainingNodesInStored = stored.next;
        stored.next = head;
        head = stored; //reset for the next iteration
        stored = remainingNodesInStored;

        if (stored == null) { //no more items to store, so we are done
            return head;
        }
    }
};

const linkedList = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null)))));
console.log(reverseList(linkedList));