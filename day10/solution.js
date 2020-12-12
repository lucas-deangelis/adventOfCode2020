const input = require("fs").readFileSync("input.txt", "utf-8");
const inputTest = require("fs").readFileSync("inputTest.txt", "utf-8");

let jolt = input
  .split("\n")
  .map((el) => parseInt(el))
  .sort((a, b) => a - b);

jolt.unshift(0);

jolt.push(Math.max(...jolt) + 3);

console.log(jolt);

let diff1 = 0;
let diff3 = 0;
let previousJolt = 0;

for (let j of jolt) {
  console.log(j + " " + previousJolt);

  if (j - previousJolt === 1) {
    diff1 += 1;
  } else if (j - previousJolt === 3) {
    diff3 += 1;
  }
  previousJolt = j;
}
console.log(diff1);
console.log(diff3);
console.log(diff1 * (diff3 + 1));

jolt.shift();

let toto = new Map();
toto.set(0, 1);

for (const j of jolt) {
  let total = 0;
  for (let i = 1; i <= 3; ++i) {
    if (toto.has(j - i)) {
      total += toto.get(j - i);
    } else {
      total += 0;
    }
  }
  toto.set(j, total);
}

console.log(Math.max(...jolt));
console.log(jolt.slice(10));

console.log(toto.get(Math.max(...jolt)));
