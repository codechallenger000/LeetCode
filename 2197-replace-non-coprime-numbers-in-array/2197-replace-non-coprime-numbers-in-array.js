var gcd = function(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var replaceNonCoprimes = function(nums) {
    let result = [];
    for (let num of nums) {
        result.push(num);
        while (result.length > 1) {
            let a = result[result.length - 1];
            let b = result[result.length - 2];
            let g = gcd(a, b);
            if (g > 1) {
                result.pop();
                result.pop();
                let lcm = Math.floor(a / g * b);
                result.push(lcm);
            } else {
                break;
            }
        }
    }
    return result;
};