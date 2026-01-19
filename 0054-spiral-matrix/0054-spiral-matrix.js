var spiralOrder = function(matrix) {
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    let spiral = [];

    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++)
            spiral.push(matrix[top][i]);
        top++;

        for (let j = top; j <= bottom; j++)
            spiral.push(matrix[j][right]);
        right--;

        if (top <= bottom) {
            for (let k = right; k >= left; k--)
                spiral.push(matrix[bottom][k]);
            bottom--;
        }

        if (left <= right) {
            for (let l = bottom; l >= top; l--)
                spiral.push(matrix[l][left]);
            left++;
        }
    }

    return spiral;
};