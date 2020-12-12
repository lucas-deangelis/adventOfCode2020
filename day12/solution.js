const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

const input = require("fs").readFileSync("input.txt", "utf-8");
const inputTest = require("fs").readFileSync("inputTest.txt", "utf-8");

console.log(inputTest);

function parse(puzzleInput) {
  return puzzleInput.split("\n").map((el) => {
    return { action: el[0], value: parseInt(el.slice(1)) };
  });
}

function move(currentPosition, orientation, value) {
  let position = currentPosition;

  switch (orientation) {
    case "E":
      position = {
        north: position.north,
        east: position.east + value,
      };
      break;
    case "W":
      position = {
        north: position.north,
        east: position.east - value,
      };
      break;
    case "N":
      position = {
        north: position.north + value,
        east: position.east,
      };
      break;
    case "S":
      position = {
        north: position.north - value,
        east: position.east,
      };
      break;
  }

  return position;
}

function moveShip(actions) {
  let position = { north: 0, east: 0 };
  let orientation = "E";

  let oriToNum = new Map();
  oriToNum.set("N", 0);
  oriToNum.set("E", 1);
  oriToNum.set("S", 2);
  oriToNum.set("W", 3);
  let numToOri = new Map();
  numToOri.set(0, "N");
  numToOri.set(1, "E");
  numToOri.set(2, "S");
  numToOri.set(3, "W");

  for (const action of actions) {
    console.log(action);
    switch (action.action) {
      case "F":
        position = move(position, orientation, action.value);
        break;
      case "E":
      case "W":
      case "N":
      case "S":
        position = move(position, action.action, action.value);
        break;
      case "L":
        let move = action.value / 90;
        orientation = numToOri.get((oriToNum.get(orientation) - move + 4) % 4);
        break;
      case "R":
        let move1 = action.value / 90;
        console.log(move1);

        orientation = numToOri.get((oriToNum.get(orientation) + move1) % 4);
        break;
    }
    console.log(orientation);
  }
  console.log(position);

  return Math.abs(position.north) + Math.abs(position.east);
}

console.log(moveShip(parse(input)));
