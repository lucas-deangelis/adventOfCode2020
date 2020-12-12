console.time("Start up");
const input = require("fs")
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((el) => parseInt(el));
const inputTest = require("fs")
  .readFileSync("inputTest.txt", "utf-8")
  .split("\n")
  .map((el) => parseInt(el));

function weakness1(numbers, preambleLength) {
  for (let i = preambleLength; i < numbers.length; ++i) {
    let valid = false;

    for (let x = i - preambleLength; x < i; ++x) {
      for (let y = i - preambleLength + 1; y < i; ++y) {
        if (numbers[x] + numbers[y] == numbers[i]) {
          valid = true;
        }
      }
    }

    if (!valid) {
      return numbers[i];
    }
  }
}

function weakness2(numbers, number) {
  for (let i = 0; i < numbers.length; ++i) {
    let total = numbers[i];
    for (let j = i + 1; j < numbers.length; ++j) {
      total += numbers[j];
      if (total == number) {
        return (
          Math.min(...numbers.slice(i, j)) + Math.max(...numbers.slice(i, j))
        );
      }
    }
  }
}

const part1 = weakness1(input, 25);
console.log("Part 1: " + part1);
const part2 = weakness2(input, part1);
console.log("Part 2: " + part2);
console.timeEnd("Start up");
