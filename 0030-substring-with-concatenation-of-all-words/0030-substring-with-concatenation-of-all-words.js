/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {

    const wordLen = words[0].length;
    const numWords = words.length;
    const totalLen = wordLen * numWords;
    const n = s.length;
    const res = [];

    if (n < totalLen) return [];

    const wordCount = new Map();
    for (let word of words) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }

    // we loop over wordLen offsets
    for (let offset = 0; offset < wordLen; offset++) {
        let left = offset, count = 0;
        const seen = new Map();

        for (let right = offset; right + wordLen <= n; right += wordLen) {
            const word = s.slice(right, right + wordLen);

            if (wordCount.has(word)) {
                seen.set(word, (seen.get(word) || 0) + 1);
                count++;

                // we shrink window if word is overused
                while (seen.get(word) > wordCount.get(word)) {
                    const leftWord = s.slice(left, left + wordLen);
                    seen.set(leftWord, seen.get(leftWord) - 1);
                    left += wordLen;
                    count--;
                }

                // Valid window
                if (count === numWords) {
                    res.push(left);
                    const firstWord = s.slice(left, left + wordLen);
                    seen.set(firstWord, seen.get(firstWord) - 1);
                    left += wordLen;
                    count--;
                }
            } else {
                seen.clear();
                count = 0;
                left = right + wordLen;
            }
        }
    }

    return res;
};