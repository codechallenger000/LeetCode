/**
 * @param {string} s
 * @return {string}
 */
var sortVowels = function(s) {
    const vowelSet = new Set("AEIOUaeiou");
    const vowels = [];

    for (let ch of s) {
        if (vowelSet.has(ch)) {
            vowels.push(ch);
        }
    }

    vowels.sort();

    let result = [];
    let vIndex = 0;

    for (let ch of s) {
        result.push(vowelSet.has(ch) ? vowels[vIndex++] : ch);
    }

    return result.join('');
};