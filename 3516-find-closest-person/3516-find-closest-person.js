const findClosest = (x, y, z) => {
    let d = (x - y) * (x + y - 2 * z);
    return (d != 0) << (d > 0);
};