const { getPuzzleInput } = require("../utils");

function extractNumbers(line) {
    const nums = [];
    const strings = line.split(" ");
    for (const string of strings) {
        const result = parseInt(string);
        if (!isNaN(result)) {
            nums.push(result);
        }
    }

    return nums;
}

function parseLine(line, index) {
    let [winning, yours] = line.split(":")[1].split("|");
    winning = extractNumbers(winning);
    yours = extractNumbers(yours);

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

function addCopy(line, numToAdd = 1){
    if(!copies.hasOwnProperty(line)){
        copies[line] = 0;
    }

    copies[line] += numToAdd;
}

const copies = {};
const input = getPuzzleInput(__dirname)
input.forEach((val, i) => parseLine(val, i));

console.log(Object.keys(copies).reduce((acc, val) => acc += copies[val], input.length));