const fs = require("fs");

function slope(rightSlope, downSlope) {
    // Yes, relying on grid and width being defined before the function is a bit ugly but 
    // it allow me to do the cool reduce at the end, so there's that
    let height = 1;
    let right = 0;
    let trees = 0;

    while (height < grid.length) {
        height += downSlope;
        right = (right + rightSlope) % width;
        
        if (grid[height - 1][right] == "#") {
            trees += 1;
        }
    }

    return trees;
}

let input = fs.readFileSync("input.txt", "utf-8");
let grid = input.split("\n");
let width = grid[0].length;

console.time("Start up");
console.log("Part 1: " + slope(3, 1));
console.log("Part 2: " + ([[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]].map(el => slope(...el)).reduce((el, acc) => el * acc)));
console.timeEnd("Start up");