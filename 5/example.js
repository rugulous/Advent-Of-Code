const { getPuzzleInput } = require("../utils");

let currMap = null;
let allMap = {};

const order = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity'];

function processNewMap(line) {
    currMap = line.split(" ")[0].split("-")[0].trim();
    allMap[currMap] = {};
}

function processLine(line) {
    if(line == ""){
        return;
    }

    if (line.indexOf("map") > 0) {
        processNewMap(line);
        return;
    }

    const parts = line.split(" ").map(num => parseInt(num));
    buildMap(parts);
}

function buildMap(parts){
    for(let i = 0; i < parts[2]; i++){
        allMap[currMap][parts[1] + i] = parts[0] + i;
    }
}

function tryGetMapValue(map, val){
    if(!allMap[map].hasOwnProperty(val)){
        return val;
    }

    return allMap[map][val];
}

function getSeedLocation(seed){
    let index = seed;

    for(const key of order){
        index = tryGetMapValue(key, index);
    }

    return index;
}

const input = getPuzzleInput(__dirname, "example.txt");

input.slice(1).forEach(processLine);
const locations = input[0].split(":")[1].trim().split(" ").map(n => getSeedLocation(parseInt(n)));
console.log(Math.min(...locations));