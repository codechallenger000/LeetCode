// LeetCode 21. Merge Two Sorted Lists
function mergeTwoLists(l1, l2) {
    let dummy = new ListNode(0);
    let prev = dummy;
    while (l1 !== null && l2 !== null) {
        if (l1.val < l2.val) {
            prev.next = l1;
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }
    prev.next = l1 !== null ? l1 : l2;
    return dummy.next;
}

var mergeKLists = function(lists) {
    if (lists.length === 0) return null;
    
    while (lists.length > 1) {
        let mergedLists = [];
        for (let i = 0; i < lists.length; i += 2) {
            let l1 = lists[i];
            let l2 = (i + 1 < lists.length) ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(l1, l2));
        }
        lists = mergedLists;
    }
    
    return lists[0];
}