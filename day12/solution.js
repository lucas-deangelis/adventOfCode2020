const assert = require("assert");
const input = parse(require("fs").readFileSync("input.txt", "utf-8"));
const inputTest = parse(require("fs").readFileSync("inputTest.txt", "utf-8"));

function parse(puzzleInput) {
  return puzzleInput.split("\n").map((el) => {
    return { action: el[0], value: parseInt(el.slice(1)) };
  });
}

assert.strictEqual(part1(input), 439, "Part 1 fails");
assert.strictEqual(part2(input), 12385, "Part 2 fails");
console.log("All tests pass");

function part1(actions) {
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

function newOrientation(oldOrientation, moveDirection, degrees) {
  let num = 0;
  if (moveDirection == "R") {
    num = modulo(orientationToNum(oldOrientation) + degrees / 90, 4);
  } else if (moveDirection == "L") {
    num = modulo(orientationToNum(oldOrientation) - degrees / 90, 4);
  }
  return numToOrientation(num);
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

function modulo(a, n) {
  return ((a % n) + n) % n;
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

function part2(actions) {
  let position = { north: 0, east: 0 };
  let waypoint = { north: 1, east: 10 };
  let orientation = "E";

  for (const action of actions) {
    switch (action.action) {
      case "F":
        position = moveWithWaypoint(position, waypoint, action.value);
        break;
      case "E":
      case "W":
      case "N":
      case "S":
        waypoint = move(waypoint, action.action, action.value);
        break;
      case "L":
      case "R":
        waypoint = moveWaypoint(
          orientation,
          action.action,
          action.value,
          waypoint
        );
        break;
    }
  }
  return Math.abs(position.north) + Math.abs(position.east);
}

function moveWithWaypoint(position, waypoint, times) {
  return {
    north: position.north + times * waypoint.north,
    east: position.east + times * waypoint.east,
  };
}

function moveWaypoint(orientation, moveDirection, degrees, waypoint) {
  const newOri = newOrientation(orientation, moveDirection, degrees);

  switch (distanceOrientation(orientation, newOri)) {
    case 0:
      return waypoint;
    case 1:
      return { north: -waypoint.east, east: waypoint.north };
    case 2:
      return { north: -waypoint.north, east: -waypoint.east };
    case 3:
      return { north: waypoint.east, east: -waypoint.north };
  }
}

function distanceOrientation(orientationA, orientationB) {
  return modulo(
    orientationToNum(orientationB) - orientationToNum(orientationA),
    4
  );
}
