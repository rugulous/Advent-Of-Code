const { getPuzzleInput } = require("../utils");

function isNumeric(char){
    return !isNaN(parseInt(char));
}

function parseLine(line, lineIndex){
    console.log(`Parsing line ${lineIndex}...`);
    console.log(line);
    console.log();

    let currNumString = "";
    let isAdjacent = false;
    let lineTotal = 0;
    
    for(let i = 0; i < line.length; i++){
        const char = line[i];

        if(!isNumeric(char)){
            if(currNumString != "" && isAdjacent){
                console.log(`Adding ${currNumString}`);
                lineTotal += parseInt(currNumString);
            }

            currNumString = "";
            isAdjacent = false;
            continue;
        }

        
        currNumString += char;
        if(!isAdjacent){
            isAdjacent = checkAdjacent(i, lineIndex);
        }
    }

    if(currNumString != "" && isAdjacent){
        lineTotal += parseInt(currNumString);
    }

    console.log();
    console.log(`Line total: ${lineTotal}`);
    console.log();

    return lineTotal;
}

function checkAdjacent(xPos, yPos){
    const minX = Math.max(0, xPos - 1);
    const maxX = Math.min(input[0].length - 1, xPos + 1);
    const minY = Math.max(0, yPos - 1);
    const maxY = Math.min(input.length - 1, yPos + 1);

    for(let y = minY; y <= maxY; y++){
        for(let x = minX; x <= maxX; x++){
            if(y === yPos && x === xPos){
                continue;
            }

            const char = input[y][x];
            if(char != "." && !isNumeric(char)){
                return true;
            }
        }
    }

    return false;
}

const input = getPuzzleInput(__dirname);
let total = 0
input.forEach((line, index) => total += parseLine(line, index));
console.log(total);

//parseLine(input[17], 17);