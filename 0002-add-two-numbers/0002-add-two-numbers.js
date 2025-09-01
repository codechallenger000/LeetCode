const addTwoNumbers = (l1, l2, carry = 0) => {
    if (!l1 && !l2 && carry === 0) return null;

    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;

    const sum = val1 + val2 + carry;
    const node = new ListNode(sum % 10);
    const newCarry = Math.floor(sum / 10);

    const next1 = l1 ? l1.next : null;
    const next2 = l2 ? l2.next : null;

    node.next = addTwoNumbers(next1, next2, newCarry);
    return node;
};