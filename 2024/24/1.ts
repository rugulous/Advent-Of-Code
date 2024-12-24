import { getPuzzleInput } from "../../utils";

const operations = {
    "AND": (a: number, b: number) => (a == b && a == 1) ? 1 : 0,
    "OR": (a: number, b: number) => (a == 1 || b == 1) ? 1 : 0,
    "XOR": (a: number, b: number) => (a != b) ? 1 : 0
}

const values: { [key: string]: number } = {};
const wireRegex = /(.*) (AND|OR|XOR) (.*) -> (.*)/

const input = getPuzzleInput(__dirname, "example-2.txt");
let settingValues = true;
const toProcess = [];

for (const line of input) {
    if (line.trim() == "") {
        settingValues = false;
        continue;
    }

    if (settingValues) {
        const [wire, value] = line.split(": ");
        values[wire] = parseInt(value);
    } else {
        const parts = wireRegex.exec(line);

        const [left, right] = [values[parts[1]], values[parts[3]]];

        if (left == undefined || right == undefined) {
            toProcess.push(parts);
        } else {
            values[parts[4]] = operations[parts[2]](left, right);
        }

    }
}

while (toProcess.length > 0) {
    const parts = toProcess.shift();
    const [left, right] = [values[parts[1]], values[parts[3]]];

    if (left == undefined || right == undefined) {
        toProcess.push(parts);
    } else {
        values[parts[4]] = operations[parts[2]](left, right);
    }
}

const keys = Object.keys(values).filter(k => k.startsWith("z")).toSorted((a, b) => a.localeCompare(b));
let total = 0;

for (let i = 0; i < keys.length; i++) {
    if (values[keys[i]] == 1) {
        total += Math.pow(2, i);
    }
}

console.log(total);