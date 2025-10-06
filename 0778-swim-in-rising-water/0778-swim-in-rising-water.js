/**
 * Corrected version: define MinHeap inside the function scope
 * to avoid "Identifier ... has already been declared" on repeated runs.
 *
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function(grid) {
    const n = grid.length;
    const visited = Array.from({length: n}, () => Array(n).fill(false));

    class MinHeap {
        constructor() { this.heap = []; }
        size() { return this.heap.length; }
        peek() { return this.heap[0]; }
        push(val) {
            this.heap.push(val);
            this._bubbleUp(this.heap.length - 1);
        }
        pop() {
            if (this.heap.length === 0) return undefined;
            const top = this.heap[0];
            const last = this.heap.pop();
            if (this.heap.length > 0) {
                this.heap[0] = last;
                this._bubbleDown(0);
            }
            return top;
        }
        _bubbleUp(i) {
            const h = this.heap;
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (h[p][0] <= h[i][0]) break;
                [h[p], h[i]] = [h[i], h[p]];
                i = p;
            }
        }
        _bubbleDown(i) {
            const h = this.heap;
            const len = h.length;
            while (true) {
                let smallest = i;
                const l = 2 * i + 1, r = 2 * i + 2;
                if (l < len && h[l][0] < h[smallest][0]) smallest = l;
                if (r < len && h[r][0] < h[smallest][0]) smallest = r;
                if (smallest === i) break;
                [h[smallest], h[i]] = [h[i], h[smallest]];
                i = smallest;
            }
        }
    }

    const heap = new MinHeap();
    heap.push([grid[0][0], 0, 0]); // [time, r, c]
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

    while (heap.size() > 0) {
        const [t, r, c] = heap.pop();
        if (visited[r][c]) continue;
        visited[r][c] = true;
        if (r === n - 1 && c === n - 1) return t;
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
                heap.push([Math.max(t, grid[nr][nc]), nr, nc]);
            }
        }
    }
    return -1;
};