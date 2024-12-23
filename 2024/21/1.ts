import { Coordinate } from "../../type";
import { getPuzzleInput, move } from "../../utils";

const movesToDirs = {
    ">": "RIGHT",
    "<": "LEFT",
    "^": "UP",
    "v": "DOWN"
};

const codes = getPuzzleInput(__dirname, "example.txt");

function areCoordsEqual(p1: Coordinate, p2: Coordinate){
    return p1.x == p2.x && p1.y == p2.y;
}

function getPosition(keypad: (string | null)[], button: string) {
    const charIndex = keypad.findIndex(x => x == button);
    const x = charIndex % 3;
    const y = Math.floor(charIndex / 3);

    return { x, y };
}

function getMovesTo(startPos: Coordinate, { x, y }: Coordinate, toAvoid: Coordinate) {
    let directions: string[] = [];
    const currPos = {...startPos};

    while (!areCoordsEqual(currPos, {x,y})) {
        if (currPos.x < x && !areCoordsEqual(toAvoid, {x: currPos.x + 1, y: currPos.y})) {
            directions.push(">");
            currPos.x++;
        } else if (currPos.x > x && !areCoordsEqual(toAvoid, {x: currPos.x - 1, y: currPos.y})) {
            directions.push("<")
            currPos.x--;
        } else if (currPos.y < y && !areCoordsEqual(toAvoid, {x: currPos.x, y: currPos.y + 1})) {
            directions.push("v");
            currPos.y++;
        } else if (currPos.y > y && !areCoordsEqual(toAvoid, {x: currPos.x, y: currPos.y - 1})) {
            directions.push("^");
            currPos.y--;
        } else {
            console.log("SKIPPED!");
            console.log(currPos);
            console.log(toAvoid);
            console.log({x, y});
            throw '';
        }
    }

    directions = tryToFixDirections(directions, startPos, toAvoid);

    startPos.x = x;
    startPos.y = y;

    return directions;
}

function tryToFixDirections(directions: string[], startPos: Coordinate, toAvoid: Coordinate){
    const hDirs = ['<', '>'];
    const yDirs = ['^', 'v'];

    if(directions.some(x => hDirs.includes(x)) && directions.some(y => yDirs.includes(y))){
        //we're moving horizontally AND vertically, so there must be some combination that avoids the null square!
        const targetDirs = directions.toSorted();     
        if(doMovesStillWork(targetDirs, {...startPos}, toAvoid)){
            return targetDirs
        }
        
        targetDirs.reverse();
        if(doMovesStillWork(targetDirs, {...startPos}, toAvoid)){
            return targetDirs
        }
    }

    return directions;
}

function doMovesStillWork(moves: string[], pos: Coordinate, toAvoid: Coordinate){
    for(const dir of moves){
        const targetMove = movesToDirs[dir];
        if(!targetMove){
            continue;
        }

        pos = move[targetMove](pos.x, pos.y);

        if(areCoordsEqual(pos, toAvoid)){
            return false;
        }
    }

    return true;
}

const dirKeypad = [null, '^', 'A', '<', 'v', '>'];
const dirGap = {x: 0, y: 0};

const numKeypad = ['7', '8', '9', '4', '5', '6', '1', '2', '3', null, '0', 'A'];
const numGap = {x:0, y: 3};

let codeBot: Coordinate = { x: 2, y: 3 };
let dirBot: Coordinate = { x: 2, y: 0 };
let thirdBot: Coordinate = { x: 2, y: 0 };

let total = 0;

for (const code of codes) {

    const directions: string[] = [];
    let numStr = "";

    for (const char of code) {
        if (char != "A") {
            numStr += char;
        }

        const target = getPosition(numKeypad, char);

        directions.push(...getMovesTo(codeBot, target, numGap));

        directions.push("A");
    }

    console.log(directions);

    const actualDirections: string[] = [];

    for (const dir of directions) {
        const target = getPosition(dirKeypad, dir);

        actualDirections.push(...getMovesTo(dirBot, target, dirGap));
        actualDirections.push("A");
    }

    console.log(actualDirections);

    const myDirections: string[] = [];

    for (const dir of actualDirections) {
        const target = getPosition(dirKeypad, dir);

        myDirections.push(...getMovesTo(thirdBot, target, dirGap));
        myDirections.push("A");
    }

    console.log(myDirections);

    const num = parseInt(numStr);
    total += (num * myDirections.length);

    console.log(`${code} = ${num}`);
    console.log(`${myDirections.length} total directions`);
    console.log("Score of ", num * myDirections.length);
}

console.log(total);