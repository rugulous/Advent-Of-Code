import { getPuzzleInput, grid } from "../../utils";

const flippedDirections = [2, 3, 0, 1];

const pieces = { //north, east, south, west
    "|": [true, false, true, false],
    "-": [false, true, false, true],
    "L": [true, true, false, false],
    "J": [true, false, false, true],
    "7": [false, false, true, true],
    "F": [false, true, true, false],
    ".": [false, false, false, false], //ground - no entry
    "S": [true, true, true, true] //start pos - assume all access
};

let allowedMoves = pieces.S;

function findStartPoint(){
    for(let y = 0; y < rawMap.length; y++){
        const line = rawMap[y];

        for(let x = 0; x < line.length; x++){
            if(line[x] == "S"){
                return [y, x];
            }
        }
    }
};

function tryMove(direction: number, newY: number = y, newX:number = x): boolean{
    const symbol = rawMap[newY][newX];

    return !map[newY][newX] && allowedMoves[direction] && pieces[symbol][flippedDirections[direction]];
}

function output() {
    map.forEach(r => {
        let str = "";
        for (const obj of r) {
            if (obj === null) {
                str += "   ";
            } else if (!obj) {
                str += " 0 ";
            } else {
                str += " 1 ";
            }

        }
        console.log(str);
    });

    console.log();
}

const rawMap = getPuzzleInput(__dirname);
const map = grid(rawMap[0].length, null, rawMap.length);

let [y, x] = findStartPoint();
map[y][x] = true;

while(true){
    if(y - 1 >= 0 && tryMove(0, y - 1)){
        y--;
    } else if(y + 1 < rawMap.length && tryMove(2, y + 1)){
        y++;
    } else if(x - 1 >= 0 && tryMove(3, y, x - 1)){
        x--;
    } else if(x + 1 < rawMap[0].length && tryMove(1, y, x + 1)){
        x++;
    } else {
        break;
    }

    allowedMoves = pieces[rawMap[y][x]];
    map[y][x] = true;
}

output();

console.log(map.flat().filter(m => m).length / 2);