const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = input.split("\n");

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

const total = lines.reduce((acc, line) => {
    return acc + extractNumbers(line);
}, 0);

console.log(total);