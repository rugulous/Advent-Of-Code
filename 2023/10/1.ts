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
    console.log(`Found ${symbol} at ${newY}, ${newX}`);

    if(map[newY][newX]){
        console.log("We've already visited this place!");
        return false;
    }

    if(!allowedMoves[direction]){
        console.log(`We can't move in direction ${direction}`);
        return false;
    }

    if(!pieces[symbol][flippedDirections[direction]]){
        console.log(`Piece ${symbol} does not allow entry from direction ${flippedDirections[direction]}`);
        return false;
    }

    return true;
}

const rawMap = getPuzzleInput(__dirname, "example-1.1.txt");
const map = grid(rawMap[0].length, false, rawMap.length);

let [y, x] = findStartPoint();
const startPos = {y, x};
map[y][x] = true;

while(true){
    console.log(y, x);
    console.log(allowedMoves);

    if(y - 1 >= 0 && tryMove(0, y - 1)){
        y--;
    } else if(y + 1 < rawMap.length && tryMove(2, y + 1)){
        y++;
    } else if(x - 1 >= 0 && tryMove(3, y, x - 1)){
        x--;
    } else if(x + 1 < rawMap[0].length && tryMove(1, y, x + 1)){
        x++;
    } else {
        console.log("I think we're done?");
        break;
    }

    allowedMoves = pieces[rawMap[y][x]];
    map[y][x] = true;
}

console.log(map);
console.log(map.flat().filter(m => m).length / 2);