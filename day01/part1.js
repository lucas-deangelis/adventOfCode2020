const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8").split("\n").map(Number);

let first = input;
let second = input;

loop:
for (fst of first) {
    for (snd of second) {
        if (fst + snd == 2020) {
            console.log(fst * snd);
            break loop;
        }
    }
}