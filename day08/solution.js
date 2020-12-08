const input = require("fs").readFileSync("input.txt", "utf-8");
const inputTest = require("fs").readFileSync("inputTest.txt", "utf-8");

const lines = input.split("\n").map((line) => line.split(" "));
const instructions = lines.map((line) => {
  return {
    code: line[0],
    op: line[1][0],
    number: parseInt(line[1].slice(1)),
    exec: false,
  };
});

function replace(instructions, spot) {
  const newInstructions = instructions.map((el) => ({ ...el }));

  for (let i = 0; i <= newInstructions.length; ++i) {
    if (i == spot) {
      if (newInstructions[i].code === "nop") {
        newInstructions[i].code = "jmp";
      } else if (newInstructions[i].code === "jmp") {
        newInstructions[i].code = "nop";
      }
    }
  }

  return newInstructions;
}

function emulate(instructions) {
  let pointer = 0;
  let accumulator = 0;
  let visited = [];
  while (true) {
    if (visited.includes(pointer)) {
      return { part2: false, value: accumulator };
    } else if (pointer == instructions.length) {
      return accumulator;
    } else {
      visited.push(pointer);
      if (instructions[pointer].code === "nop") {
        pointer += 1;
      } else if (instructions[pointer].code === "acc") {
        if (instructions[pointer].op === "+") {
          accumulator += instructions[pointer].number;
        } else if (instructions[pointer].op === "-") {
          accumulator -= instructions[pointer].number;
        }
        pointer += 1;
      } else if (instructions[pointer].code === "jmp") {
        if (instructions[pointer].op === "+") {
          pointer += instructions[pointer].number;
        } else if (instructions[pointer].op === "-") {
          pointer -= instructions[pointer].number;
        }
      }
    }
  }
}

function part2(instructions) {
  let spot = 0;

  while (spot <= instructions.length) {
    let newInstructions = replace(instructions, spot);

    if (emulate(newInstructions, 0, 0).part2 !== false) {
      return emulate(newInstructions);
    }

    spot += 1;
  }
}

// 2 hours lost here because I ran emulate(instructions, 1, 0)
const result = emulate(instructions);
const result2 = part2(instructions);
console.log(result.value);
console.log(result2);
