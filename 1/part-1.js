const {getPuzzleInput} = require("../utils");

function tryParseInt(char){
    if(isNaN(parseInt(char))){
        return null;
    }

    return char;
}

function extractNumbers(line){
    let firstNum = null;
    let lastNum = null;

    for(const char of line){
        const val = tryParseInt(char);
        if(!val){
            continue;
        }

        if(!firstNum){
            firstNum = val;
        } else {
            lastNum = val;
        }
    }

    if(!lastNum){
        lastNum = firstNum;
    }

    return parseInt(firstNum + lastNum);
}

const lines = getPuzzleInput(__dirname);
const total = lines.reduce((acc, line) => {
    return acc + extractNumbers(line);
}, 0);

console.log(total);