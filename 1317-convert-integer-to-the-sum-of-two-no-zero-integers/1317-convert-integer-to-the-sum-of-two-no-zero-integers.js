var getNoZeroIntegers = function(n) {
    function containsZero(num) {
        while (num > 0) {
            if (num % 10 === 0) return true;
            num = Math.floor(num / 10);
        }
        return false;
    }

    for (let i = 1; i < n; i++) {
        let j = n - i;
        if (!containsZero(i) && !containsZero(j)) {
            return [i, j];
        }
    }
    return [];
};