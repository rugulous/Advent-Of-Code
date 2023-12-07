import {getPuzzleInput} from "../utils";

const validChars: {[key: string]: string} = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9"
};

const words = Object.keys(validChars);

function tryParseInt(char: string): string | null{
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

function extractNumbers(line: string){
    let firstNum: string | null = null;
    let lastNum: string | null = null;
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

    if(!firstNum){
        return 0;
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