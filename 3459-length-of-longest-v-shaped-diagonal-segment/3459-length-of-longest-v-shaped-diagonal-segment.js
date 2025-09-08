/**
 * @param {number[][]} grid
 * @return {number}
 */
var lenOfVDiagonal = function(grid) {
    const n = grid.length;
    const m = grid[0].length;

    const DIRS = [[1,1],[1,-1],[-1,-1],[-1,1]];

    const memo = Array.from({length: n}, () => Array.from({length: m}, () => Array(8).fill(0)));

    let ans = 0;


    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(grid[i][j] !== 1) continue; 
            const maxs = [n - i, j + 1, i + 1, m - j];

            for(let k = 0; k < 4; k++) {
                if(maxs[k] > ans) {
                
                    ans = Math.max(ans, dfs(i, j, k, 1, 2) + 1);
                }
            }
        }
    }
    return ans;
    function dfs(i, j, k, canTurn, target) {
        i += DIRS[k][0];
        j += DIRS[k][1];
        if(i < 0 || i >= n || j < 0 || j >= m || grid[i][j] !== target) {
            return 0;
        }
        const mask = (k << 1) | canTurn;
        if(memo[i][j][mask] > 0) return memo[i][j][mask];
        let res = dfs(i, j, k, canTurn, 2 - target);
        if(canTurn === 1) {
            const maxs = [n - i - 1, j, i, m - j - 1];
            const nk = (k + 1) % 4;
            if(maxs[nk] > res) {
                res = Math.max(res, dfs(i, j, nk, 0, 2 - target));
            }
        }

        return memo[i][j][mask] = res + 1;
    }
};