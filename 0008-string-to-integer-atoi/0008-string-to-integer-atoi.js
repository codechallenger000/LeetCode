/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    if (!s) return 0;
    
    // Constants for 32-bit signed integer range
    const INT_MAX = 2**31 - 1;
    const INT_MIN = -(2**31);
    
    let i = 0;
    const n = s.length;
    
    // Step 1: Skip leading whitespace
    while (i < n && s[i] === ' ') {
        i++;
    }
    
    // Check if we've reached the end
    if (i === n) return 0;
    
    // Step 2: Check for sign
    let sign = 1;
    if (s[i] === '+') {
        i++;
    } else if (s[i] === '-') {
        sign = -1;
        i++;
    }
    
    // Step 3: Read digits and convert
    let res = 0;
    while (i < n && s[i] >= '0' && s[i] <= '9') {
        const digit = parseInt(s[i]);
        res = res * 10 + digit;
        
        if (sign * res <= INT_MIN) {
            return INT_MIN;
        }
        if (sign * res >= INT_MAX) {
            return INT_MAX;
        }
        
        i++;
    }
    
    // Step 4: Apply sign and return
    return res * sign;    
};