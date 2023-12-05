const { getPuzzleInput } = require("../utils");

function isNumeric(char){
    return !isNaN(parseInt(char));
}

function parseLine(line, lineIndex){
    let currNumString = "";
    let isAdjacent = false;
    let position = null;
    let lineTotal = 0;
    
    for(let i = 0; i < line.length; i++){
        const char = line[i];

        if(!isNumeric(char)){
            if(currNumString != "" && isAdjacent){
                setGear(position, currNumString);
            }

            currNumString = "";
            isAdjacent = false;
            position = null;
            continue;
        }

        
        currNumString += char;
        if(!isAdjacent){
            position = checkGear(i, lineIndex);
            if(position.length > 0){
                isAdjacent = true;
            }
        }
    }

    if(currNumString != "" && isAdjacent){
        setGear(position, currNumString);
    }
}

function checkGear(xPos, yPos){
    const minX = Math.max(0, xPos - 1);
    const maxX = Math.min(input[0].length - 1, xPos + 1);
    const minY = Math.max(0, yPos - 1);
    const maxY = Math.min(input.length - 1, yPos + 1);

    const matches = [];

    for(let y = minY; y <= maxY; y++){
        for(let x = minX; x <= maxX; x++){
            if(y === yPos && x === xPos){
                continue;
            }

            const char = input[y][x];
            if(char == "*"){
                matches.push([y, x]);
            }
        }
    }

    return matches;
}

function setGear(matches, valueStr){
    for(const [y, x] of matches){

    if(!gears.hasOwnProperty(y)){
        gears[y] = {};
    }

    if(!gears[y].hasOwnProperty(x)){
        gears[y][x] = []
    }

        gears[y][x].push(parseInt(valueStr));
    }
}

function sumGears(){
    let total = 0;

    Object.keys(gears).forEach(y => {
        Object.keys(gears[y]).forEach(x => {
            if(gears[y][x].length != 2){
                return;
            }

            total += (gears[y][x][0] * gears[y][x][1]);
        });
    });

    return total;
}

const input = getPuzzleInput(__dirname);
const gears = {};
let total = 0
input.forEach((line, index) => total += parseLine(line, index));
console.log(gears);

console.log(sumGears());

// parseLine(input[38], 38);
// console.log(gears);