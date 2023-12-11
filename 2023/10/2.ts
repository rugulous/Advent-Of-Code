import { arrayHasSameValue, columnHasSameValue, getPuzzleInput, grid } from "../../utils";

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

function findStartPoint() {
    for (let y = 0; y < rawMap.length; y++) {
        const line = rawMap[y];

        for (let x = 0; x < line.length; x++) {
            if (line[x] == "S") {
                return [y, x];
            }
        }
    }
};

function tryMove(direction: number, newY: number = y, newX: number = x): boolean {
    const symbol = rawMap[newY][newX];

    return !map[newY][newX] && allowedMoves[direction] && pieces[symbol][flippedDirections[direction]];
}

function trimMap(){
    for(let i = map.length - 1; i >= 0; i--){
        if(arrayHasSameValue(map[i]) && !map[i][0]){
            map.splice(i, 1);
        }
    }

    for(let x = map[0].length - 1; x >= 0; x--){
        if(columnHasSameValue(map, x) && !map[0][x]){
            for(let y = 0; y < map.length; y++){
                map[y].splice(x, 1);
            }
        }
    }
}

function applyDirt() {
    let x;
    for (x = 0; x < map[0].length; x++) {
        if (!map[0][x]) {
            map[0][x] = null;
        }

        if (!map[map.length - 1][x]) {
            map[map.length - 1][x] = null;
        }
    }

    for (y = 0; y < map.length; y++) {
        if (!map[y][0]) {
            map[y][0] = null;
        }

        if (!map[y][map[y].length - 1]) {
            map[y][map[y].length - 1] = null;
        }
    }

    let changed: number;
    do {
        changed = 0;
        for (y = 1; y < rawMap.length - 1; y++) {
            for (x = 1; x < rawMap[0].length - 1; x++) {
                if (map[y][x] || map[y][x] === null) { //bit of pipe, or already outside dirt
                    continue;
                }

                if ([map[y - 1][x], map[y + 1][x], map[y][x - 1], map[y][x + 1]].includes(null)) { //if touching outside dirt
                    console.log(`${y}, ${x} touching outside dirt!`);
                    map[y][x] = null;
                    changed++;
                    continue;
                }
            }
        }
    } while (changed > 0);
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

function isInsidePipe(y: number, x: number){
    if(map[y][x]){
        return true;
    }

    let inPipe = false;
    for(let yPos = 0; yPos < y; yPos++){
        if(map[yPos][x]){
            inPipe = !inPipe;
        }
    }

    if(!inPipe){
        return false;
    }

    inPipe = false;

    for(let xPos = 0; xPos < x; xPos++){
        if(map[y][xPos]){
            inPipe = !inPipe;
        }
    }

    return inPipe;
}

function checkInsidePipes(){
    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map[y].length; x++){
            if(map[y][x] === null){
                continue;
            }

            if(!isInsidePipe(y, x)){
                map[y][x] = null;
            }
        }
    }
}

const rawMap = getPuzzleInput(__dirname, "example-2.3.txt");
const map = grid(rawMap.length, false, rawMap[0].length);

let [y, x] = findStartPoint();
map[y][x] = true;

while (true) {
    if (y - 1 >= 0 && tryMove(0, y - 1)) {
        y--;
    } else if (y + 1 < rawMap.length && tryMove(2, y + 1)) {
        y++;
    } else if (x - 1 >= 0 && tryMove(3, y, x - 1)) {
        x--;
    } else if (x + 1 < rawMap[0].length && tryMove(1, y, x + 1)) {
        x++;
    } else {
        break;
    }

    allowedMoves = pieces[rawMap[y][x]];
    map[y][x] = true;
}

output();
applyDirt();
output();
trimMap();
output();
checkInsidePipes();
output();

console.log(map.flat().filter(t => t === false).length);