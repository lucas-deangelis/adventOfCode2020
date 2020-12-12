const fs = require("fs");

let day = process.argv[2];

if (day.length == 1) {
  day = "0" + day;
}

fs.mkdirSync("day" + day);
fs.writeFileSync("day" + day + "/" + "input.txt", "");
fs.writeFileSync("day" + day + "/" + "inputTest.txt", "");
fs.writeFileSync(
  "day" + day + "/" + "solution.js",
  `const input = require("fs").readFileSync("input.txt", "utf-8");
const inputTest = require("fs").readFileSync("inputTest.txt", "utf-8");`
);
