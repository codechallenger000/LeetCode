/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {

    const n = nums.length;
    nums.sort((a, b) => a - b); // we sort to handle duplicates
    const result = [];
    const used = new Array(nums.length).fill(false);

    const backtrack = (path) => {
        if (path.length === n) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < n; i++) {
            if (used[i]) continue;

            // we skip duplics. only use the first occurrence unless the prev. one was used
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

            used[i] = true;
            path.push(nums[i]);
            backtrack(path);
            path.pop();
            used[i] = false;
        }
    };

    backtrack([]);
    return result;
};