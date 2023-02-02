class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

const list1 = new ListNode(1, new ListNode(2, new ListNode(4, null)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4, null)));

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    //traverse both lists in parallel, add the lowest number on each one
    const head = new ListNode(null, null);
    let headPointer = head;
    let list1Pointer = list1;
    let list2Pointer = list2;

    if (list1Pointer == null) {
        return list2Pointer;
    }
    else if (list2Pointer == null) {
        return list1Pointer;
    }

    while (true) {
        const [val1, val2] = [list1Pointer.val, list2Pointer.val];
        //console.log(val1, val2);

        if (val1 < val2) {
            headPointer.val = val1;
            headPointer.next = new ListNode(val2, new ListNode(null, null));
        }
        else {
            headPointer.val = val2;
            headPointer.next = new ListNode(val1, new ListNode(null, null));
        }
        
        [list1Pointer, list2Pointer] = [list1Pointer.next, list2Pointer.next];
        if (list1Pointer == null && list2Pointer == null) {
            //both lists have ended together, this means the headPointer will be at the final value, need to remove it
            headPointer = headPointer.next;
            headPointer.next = null;
            break;
        }
        else {
            if (list1Pointer == null) {
                //Add all the remaining terms in list2
                headPointer.next = list2Pointer;
                break;
            }
            else if (list2Pointer == null) {
                headPointer.next = list1Pointer;
                break;
            }
            else {
                headPointer = headPointer.next.next; //continue
            }
        }
    }

    return head;
};