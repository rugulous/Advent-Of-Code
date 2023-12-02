const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = input.split("\n");

const validChars = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9"
}

const words = Object.keys(validChars);

function tryParseInt(char){
    if(isNaN(parseInt(char))){
        return null;
    }

    return char;
}

let buffer = "";

function checkBuffer(){
    for(const word of words){
        const match = buffer.indexOf(word);
        if(match >= 0){
            //remove the first letter so this doesn't match again
            buffer = buffer.substring(match + 1);
            return validChars[word];
        }
    }

    return null;
}

function extractNumbers(line){
    let firstNum = null;
    let lastNum = null;
    buffer = "";

    for(const char of line){
        let val = tryParseInt(char);
        if(!val){
            buffer += char;
            val = checkBuffer();

            if(!val){
                continue;
            }
        } else {
            buffer = "";
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