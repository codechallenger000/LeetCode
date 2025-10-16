    var findSmallestInteger = function(nums, value) {
        const remainderCount = new Array(value).fill(0);

        for (const num of nums) {
            const rem = ((num % value) + value) % value;
            remainderCount[rem]++;
        }

        let result = 0;
        while (remainderCount[result % value] > 0) {
            remainderCount[result % value]--;
            result++;
        }

        return result;
    };