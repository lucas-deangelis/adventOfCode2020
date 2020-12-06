function union(setA, setB) {
    return new Set([...setA, ...setB]);
}

function intersection(setA, setB) {
    return new Set([...setA].filter(x => setB.has(x)));
}

function total(array) {
    return array.reduce((acc, el) => acc + el.size, 0);
}

const input = require("fs").readFileSync("input.txt", "utf-8");
const groups = input.split("\n\n");
const people = groups.map(el => el.split("\n"));

const sets = people.map(el => el.map(toto => {
    return new Set(toto.split(""));
}))

const part1 = sets.map(el => el.reduce((acc, el) => union(acc, el)));
console.log(total(part1));

const part2 = sets.map(el =>  el.reduce((acc, el) => intersection(acc, el)));
console.log(total(part2));