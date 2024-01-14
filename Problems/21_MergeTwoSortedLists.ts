class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    let merged = new ListNode(-Infinity, null);
    let current = merged; //current is the pointer which travels through merged

    //the reason why merged still gets updated when current changes is because of object assignment being reference-based rather than value-based
    while (true) {
        if (list1 == null) {
            current.next = list2; //add on remaining values in list2
            break;
        }
        if (list2 == null) {
            current.next = list1;
            break;
        }

        if (list1.val < list2.val) {
            current.next = list1; //attach the whole of list1 to current
            list1 = list1.next; //increment list1
        }
        else {
            current.next = list2;
            list2 = list2.next;
        }

        current = current.next; //move current along
    }

    return merged.next;
};

const list1 = new ListNode(1, new ListNode(2, new ListNode(4, null)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4, null)));

console.log(mergeTwoLists(list1, list2));