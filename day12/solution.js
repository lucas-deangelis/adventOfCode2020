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

function orientationToNum(orientation) {
  switch (orientation) {
    case "N":
      return 0;
    case "E":
      return 1;
    case "S":
      return 2;
    case "W":
      return 3;
  }
}

function numToOrientation(num) {
  switch (num) {
    case 0:
      return "N";
    case 1:
      return "E";
    case 2:
      return "S";
    case 3:
      return "W";
  }
}

function modulo(a, n) {
  return ((a % n) + n) % n;
}

function newOrientation(oldOrientation, moveDirection, degrees) {
  let num = 0;
  if (moveDirection == "R") {
    num = modulo(orientationToNum(oldOrientation) + degrees / 90, 4);
  } else if (moveDirection == "L") {
    num = modulo(orientationToNum(oldOrientation) - degrees / 90, 4);
  }
  return numToOrientation(num);
}

console.log(newOrientation("N", "R", 0));
console.log(newOrientation("N", "R", 90));
console.log(newOrientation("N", "R", 180));
console.log(newOrientation("N", "R", 270));
console.log(newOrientation("N", "L", 0));
console.log(newOrientation("N", "L", 90));
console.log(newOrientation("N", "L", 180));
console.log(newOrientation("N", "L", 270));

function moveShip(actions) {
  let position = { north: 0, east: 0 };
  let orientation = "E";

  for (const action of actions) {
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
      case "R":
        orientation = newOrientation(orientation, action.action, action.value);
        break;
    }
  }

  return Math.abs(position.north) + Math.abs(position.east);
}

console.log(moveShip(parse(input)));
