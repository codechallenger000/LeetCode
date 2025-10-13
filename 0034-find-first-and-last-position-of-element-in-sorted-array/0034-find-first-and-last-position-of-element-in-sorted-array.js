var searchRange = function(nums, target) {
    return [binary(nums, target, true), binary(nums, target, false)];
};

function binary(nums, target, findFirst) {
    let s = 0, e = nums.length - 1, ans = -1;
    while (s <= e) {
        const mid = Math.floor((s + e) / 2);
        if (target > nums[mid]) {
            s = mid + 1;
        } else if (target < nums[mid]) {
            e = mid - 1;
        } else {
            ans = mid;
            if (findFirst) e = mid - 1;
            else s = mid + 1;
        }
    }
    return ans;
}