function isValid1(passport) {
    const matches = passport.match(/[\n\s]/g);
    if (matches.length == 6) {
        return !passport.includes("cid:");
    } else {
        return matches.length >= 7;
    }
}

function validateYear(year, least, most) {
    if (year.length != 4) {
        return false;
    }

    try {
        const num = parseInt(year);
        return num >= least && num <= most;
    } catch (error) {
        return false;
    }
}

function birthYear(byr) {
    return validateYear(byr, 1920, 2002);
}

function issueYear(iyr) {
    return validateYear(iyr, 2010, 2020);
}

function expirationYear(eyr) {
    return validateYear(eyr, 2020, 2030);
}

function height(hgt) {
    try {
        if (hgt.includes("cm")) {
            const num = parseInt(hgt.slice(0, -2));
            return num >= 150 && num <= 193;
        } else if (hgt.includes("in")) {
            const num = parseInt(hgt.slice(0, -2));
            return num >= 59 && num <= 76;
        } else {
            return false;
        }
    } catch(e) {
        return false;
    }
}

function hairColor(hcl) {
    if (!(hcl.startsWith("#"))) {
        return false;
    }

    return hcl.slice(1, hcl.length).match(/[0-9|a-f]/g).length == 6;
}

function eyeColor(ecl) {
    return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl);
}

function passportId(pid) {
    return pid.length == 9 && pid.match(/[0-9]/g).length == 9;
}

function isValid2(passText) {
    if (!(isValid1(passText))) {
        return false;
    }

    let valid = true;

    const fields = passText.split("\n").map(el => el.split(" ")).flat().map(el => el.split(":"));
    const obj = Object.fromEntries(fields);

    if ("byr" in obj) {
        valid = valid && birthYear(obj["byr"]);
    }
    if ("iyr" in obj) {
        valid = valid && issueYear(obj["iyr"]);
    }
    if ("eyr" in obj) {
        valid = valid && expirationYear(obj["eyr"]);
    }
    if ("hgt" in obj) {
        valid = valid && height(obj["hgt"]);
    }
    if ("hcl" in obj) {
        valid = valid && hairColor(obj["hcl"]);
    }
    if ("ecl" in obj) {
        valid = valid && eyeColor(obj["ecl"]);
    }
    if ("pid" in obj) {
        valid = valid && passportId(obj["pid"]);
    }

    return valid;
}

const input = require("fs").readFileSync("input.txt", "utf-8");
const passports = input.split("\n\n");
const part1 = passports.filter(passport => isValid1(passport)).length;
const part2 = passports.filter(passport => isValid2(passport)).length;

console.time("Part 1");
console.log(part1);
console.timeEnd("Part 1");
console.time("Part 2");
console.log(part2);
console.timeEnd("Part 2");