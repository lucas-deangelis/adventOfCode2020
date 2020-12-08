const fs = require("fs");

const day = process.argv[2];
console.log(day);
if (day.size == 1) {
    day = "0" + day;
}

fs.mkdirSync("day" + day);
fs.writeFileSync("day" + day + "/" + "input.txt", "");
fs.writeFileSync("day" + day + "/" + "inputTest.txt", "");
fs.writeFileSync("day" + day + "/" + "solution.js", 
`const input = require("fs").readFileSync("input.txt");
const inputTest = require("fs").readFileSync("inputTest.txt");`);