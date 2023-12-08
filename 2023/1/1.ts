import {getPuzzleInput} from "../../utils";

function tryParseInt(char: string): string | null{
    if(isNaN(parseInt(char))){
        return null;
    }

    return char;
}

function extractNumbers(line: string){
    let firstNum: string | null = null;
    let lastNum: string | null = null;

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