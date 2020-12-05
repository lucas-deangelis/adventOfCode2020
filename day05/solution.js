function binary(characters, character, start) {
    let current = start;
    let value = 0;

    for (const char of characters) {
        if (char == character) {
            value += current;
        }
        current /= 2;
    }

    return value;
}

function row(characters) {
    return binary(characters, "B", 64)
}

function seat(characters) {
    return binary(characters, "R", 4);
}

function seatID(pass) {
    return row(pass.slice(0, 7)) * 8 + seat(pass.slice(7, 10));
}

const passes = require("fs").readFileSync("input.txt", "utf-8").split("\n");
const part1 = passes.map(pass => seatID(pass)).reduce((acc, el) => Math.max(acc, el));
console.log("Part 1: " + part1);

const seatsID = new Set(passes.map(pass => seatID(pass)));
const other = new Set(Array.from({length:part1},(v,k)=>k+1));
const difference = new Set([...other].filter(x => !seatsID.has(x)));
console.log(difference);
// Here inspect the result. For me there was only one number really different from the rest
