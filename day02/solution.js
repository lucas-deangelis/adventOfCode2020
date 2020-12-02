const fs = require("fs");

function transformLine(line) {
    let fst = line[0];
    let snd = line[1];
    fst = fst.split("-");
    fst = fst.map(Number);
    snd = snd[0];
    return [fst, snd, line[2]];
}

function validatePassword1(limit, letter, password) {
    let number = password.split(letter).length - 1;
    return number >= limit[0] && number <= limit[1];
}

function validatePassword2(limit, letter, password) {
    return password[limit[0] - 1] == letter ^ password[limit[1] - 1] == letter;
}

let input = fs.readFileSync("input.txt", "utf-8").split("\n").map(el => el.split(" "));
let newArray = input.map(transformLine);
let result1 = newArray.map(el => validatePassword1(...el)).filter(el => el === true).reduce((el, acc) => el + acc);
let result2 = newArray.map(el => validatePassword2(...el)).filter(el => el === 1).reduce((el, acc) => el + acc);

console.log(result1);
console.log(result2);