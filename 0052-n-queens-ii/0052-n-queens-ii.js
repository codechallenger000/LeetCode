var totalNQueens = function(n) {
    let count = 0;
    let arr = new Array(n).fill(-1);

    function helper(row) {
        if (row === n) {
            count++;
            return;
        }
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                arr[row] = col;
                helper(row + 1);
            }
        }
    }

    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            if (arr[i] === col || Math.abs(row - i) === Math.abs(col - arr[i]))
                return false;
        }
        return true;
    }

    helper(0);
    return count;
};