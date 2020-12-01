const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8").split("\n").map(Number);

let first = input;
let second = input;
let third = input;

loop:
for (fst of first) {
    for (snd of second) {
        for (thd of third) {
            if (fst + snd + thd == 2020) {
                console.log(fst * snd * thd);
                break loop;
            }
        }
    }
}