import {getPuzzleInput} from "../../utils";

function isNumeric(char: string){
    return !isNaN(parseInt(char));
}

function parseLine(line: string, lineIndex: number){
    let currNumString = "";
    let position: number[][] | null = null;
    
    for(let i = 0; i < line.length; i++){
        const char = line[i];

        if(!isNumeric(char)){
            if(currNumString != "" && position){
                setGear(position, currNumString);
            }

            currNumString = "";
            position = null;
            continue;
        }

        
        currNumString += char;
        if(!position){
            position = checkGear(i, lineIndex);
        }
    }

    if(currNumString != "" && position){
        setGear(position, currNumString);
    }
}

function checkGear(xPos: number, yPos: number){
    const minX = Math.max(0, xPos - 1);
    const maxX = Math.min(input[0].length - 1, xPos + 1);
    const minY = Math.max(0, yPos - 1);
    const maxY = Math.min(input.length - 1, yPos + 1);

    const matches: number[][] = [];

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

function setGear(matches: number[][], valueStr: string){
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
const gears: {[key:string]: {[key:string]: number[]}} = {};
input.forEach((line, index) => parseLine(line, index));
console.log(gears);

console.log(sumGears());