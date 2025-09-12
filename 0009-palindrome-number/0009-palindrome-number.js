/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

    let temp = x;
    let rev = 0;

    while (temp > 0) {
        let digit = temp % 10;
        rev = rev * 10 + digit;
        temp = Math.floor(temp / 10);
    }

    return rev === x;
};