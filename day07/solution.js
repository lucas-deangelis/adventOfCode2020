const input = require("fs").readFileSync("input.txt", "utf-8")
    .replace(/bags/g, "").replace(/bag/g, "") // Removing the mentions of bags since they're useless
    .split("\n").map(line => line.split("  contain ")) // Splitting to have each line
    .map(line => [line[0], line[1].replace(" .", "").split(" , ")]) // Splitting the difference bags
    .map(line => [line[0], line[1].map(el => el.slice(2).trim())]);

let theMap = new Map();
for (const [key, value] of input) {
    theMap.set(key, value);
}

function find(map, key) {
    if (map.has(key)) {
        if (map.get(key).find(el => el == "shiny gold")) {
            return true;
        } else {
            return Array.from(map.get(key)).reduce((acc, el) => acc || find(map, el), false);
        }
    }
}

const total = Array.from(theMap.keys()).map(key => find(theMap, key)).reduce((acc, el) => {
    if (el === true) {
        return acc + 1;
    } else {
        return acc;
    }
}, 0);

console.log("Part 1: " + total);

const input2 = require("fs").readFileSync("input.txt", "utf-8")
    .replace(/bags/g, "").replace(/bag/g, "") // Removing the mentions of bags since they're useless
    .split("\n").map(line => line.split("  contain ")) // Splitting to have each line
    .map(line => [line[0], line[1].replace(" .", "").split(" , ")]) // Splitting the difference bags
    .map(line => [line[0], line[1].map((el) => {
        let num = el[0];
        if (num == "n") {
            num = 0;
        } else {
            num = parseInt(num);
        }
        return { num, color: el.slice(2).trim()};
    })]);

let theMap2 = new Map();
for (const [key, value] of input2) {
    theMap2.set(key, value);
}

function findBags(map, key) {
    if (map.has(key)) {
        console.log(Array.from(map.get(key)));
        const toto = Array.from(map.get(key)).map(el => {
            if (el.color == "other") {
                return el.num;
            } else {
                return el.num + el.num * findBags(map, el.color);
            }
        }).reduce((acc, el) => acc + el, 0);
        console.log(toto);
        return toto;
    } else {
        return 0;
    }
}

const total2 = findBags(theMap2, "shiny gold");
console.log(total2);