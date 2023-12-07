const { getPuzzleInput } = require("../utils");

function extractNumbers(line: string) {
    const nums: number[] = [];
    const strings = line.split(" ");
    for (const string of strings) {
        const result = parseInt(string);
        if (!isNaN(result)) {
            nums.push(result);
        }
    }

    return nums;
}

function parseLine(line: string, index: number) {
    const parts = line.split(":")[1].split("|");
    const winning = extractNumbers(parts[0]);
    const yours = extractNumbers(parts[1]);

    let matches = 0;

    for (const num of yours) {
        if (winning.includes(num)) {
            matches++;
        }
    }

    const numCopies = (copies[index] ?? 0) + 1;
    for(let i = 0; i < matches; i++){
        const linePos = index + i + 1;
        addCopy(linePos, numCopies);
    }
}

function addCopy(line: number, numToAdd: number = 1){
    if(!copies.hasOwnProperty(line)){
        copies[line] = 0;
    }

    copies[line] += numToAdd;
}

const copies: {[key: string]: number} = {};
const input = getPuzzleInput(__dirname)
input.forEach((val: string, i: number) => parseLine(val, i));

console.log(Object.keys(copies).reduce((acc, val) => acc + copies[val], input.length));