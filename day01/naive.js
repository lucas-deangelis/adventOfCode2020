const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8").split("\n").map(el => parseInt(el));

function part1(input) {
    let first = input;
    let second = input;
    let result = 0;

    loop:
    for (fst of first) {
        for (snd of second) {
            if (fst + snd == 2020) {
                result = fst * snd;
                break loop;
            }
        }
    }

    return result;
}

function part2(input) {
    let first = input;
    let second = input;
    let third = input;
    let result = 0;

    loop:
    for (fst of first) {
        for (snd of second) {
            for (thd of third) {
                if (fst + snd + thd == 2020) {
                    result = fst * snd * thd;
                    break loop;
                }
            }
        }
    }

    return result;
}

console.time("Start up");
console.log("Part 1: " + part1(input));
console.log("Part 2: " + part2(input));
console.timeEnd("Start up");