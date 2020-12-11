const input = require("fs").readFileSync("input.txt", "utf-8").split("\n");
const inputTest = require("fs")
  .readFileSync("inputTest.txt", "utf-8")
  .split("\n");

function advanceState(map) {
  let newMap = [];
  for (x = 0; x < map[0].length; ++x) {
    let newLine = "";

    for (y = 0; y < map.length; ++y) {
      if (map[y][x] == ".") {
        newLine += ".";
      } else {
        let around = [];
        for (a = -1; a <= 1; ++a) {
          for (b = -1; b <= 1; ++b) {
            if (!(a == 0 && b == 0)) {
              if (y + b >= 0 && y + b < map.length) {
                if (x + a >= 0 && x + a < map[0].length) {
                  around.push(map[y + b][x + a]);
                }
              }
            }
          }
        }
        let taken = around.filter((el) => el === "#").length;

        if (map[y][x] == "#" && taken >= 4) {
          newLine += "L";
        } else if (map[y][x] == "L" && taken == 0) {
          newLine += "#";
        } else {
          newLine += map[y][x];
        }
      }
    }

    newMap.push(newLine);
  }

  let totalTaken = newMap.reduce(
    (acc, el) => acc + el.split("").filter((seat) => seat === "#").length,
    0
  );

  return { seats: totalTaken, newMap };
}

function advanceState2(map) {
  let newMap = [];
  for (let x = 0; x < map[0].length; ++x) {
    let newLine = "";

    for (let y = 0; y < map.length; ++y) {
      if (map[y][x] == ".") {
        newLine += ".";
      } else {
        let around = [];
        for (let a = -1; a <= 1; ++a) {
          for (let b = -1; b <= 1; ++b) {
            if (!(a == 0 && b == 0)) {
              let oldA = a;
              let oldB = b;

              if (
                y + oldB >= 0 &&
                y + oldB < map.length &&
                x + oldA >= 0 &&
                x + oldA < map[0].length
              ) {
                while (
                  y + oldB >= 0 &&
                  y + oldB < map.length &&
                  x + oldA >= 0 &&
                  x + oldA < map[0].length &&
                  map[y + oldB][x + oldA] == "."
                ) {
                  oldA = a + oldA;
                  oldB = b + oldB;
                }
                if (
                  y + oldB >= 0 &&
                  y + oldB < map.length &&
                  x + oldA >= 0 &&
                  x + oldA < map[0].length
                ) {
                  around.push(map[y + oldB][x + oldA]);
                } else {
                  around.push(".");
                }
              } else {
                around.push(".");
              }
            }
          }
        }
        let taken = around.filter((el) => el === "#").length;

        if (map[y][x] == "#" && taken >= 5) {
          newLine += "L";
        } else if (map[y][x] == "L" && taken == 0) {
          newLine += "#";
        } else {
          newLine += map[y][x];
        }
      }
    }
    newMap.push(newLine);
  }

  let totalTaken = newMap.reduce(
    (acc, el) => acc + el.split("").filter((seat) => seat === "#").length,
    0
  );

  return { seats: totalTaken, newMap };
}

let oldSeats = -1;
let newMap = input;
console.log(newMap);

let seats = -1;

while (true) {
  let toto = advanceState2(newMap);
  newMap = toto.newMap;
  seats = toto.seats;
  console.log(newMap);

  if (oldSeats == seats) {
    console.log("Part 2: " + seats);

    break;
  }

  oldSeats = seats;
}
