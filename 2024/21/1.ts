import { Coordinate } from "../../type";
import { getPuzzleInput, move } from "../../utils";

const movesToDirs = {
    ">": "RIGHT",
    "<": "LEFT",
    "^": "UP",
    "v": "DOWN"
};

//left is furthest from A (v<<)
//then down (v<)
//up (<) and right (v) are equidistant
const movementWeights = {
    "<": 3,
    "v": 2,
    "^": 1,
    ">": 1
};

const codes = getPuzzleInput(__dirname);

function areCoordsEqual(p1: Coordinate, p2: Coordinate) {
    return p1.x == p2.x && p1.y == p2.y;
}

function getPosition(keypad: (string | null)[], button: string) {
    const charIndex = keypad.findIndex(x => x == button);
    const x = charIndex % 3;
    const y = Math.floor(charIndex / 3);

    return { x, y };
}

function getMovesTo(startPos: Coordinate, { x, y }: Coordinate, toAvoid: Coordinate, prevMove = null) {
    let directions: string[] = [];
    const currPos = { ...startPos };

    while (!areCoordsEqual(currPos, { x, y })) {
        if (currPos.x < x && !areCoordsEqual(toAvoid, { x: currPos.x + 1, y: currPos.y })) {
            directions.push(">");
            currPos.x++;
        } else if (currPos.x > x && !areCoordsEqual(toAvoid, { x: currPos.x - 1, y: currPos.y })) {
            directions.push("<")
            currPos.x--;
        } else if (currPos.y < y && !areCoordsEqual(toAvoid, { x: currPos.x, y: currPos.y + 1 })) {
            directions.push("v");
            currPos.y++;
        } else if (currPos.y > y && !areCoordsEqual(toAvoid, { x: currPos.x, y: currPos.y - 1 })) {
            directions.push("^");
            currPos.y--;
        } else {
            throw new Error("We are stuck and unable to move!");
        }
    }

    directions = tryToFixDirections(directions, startPos, toAvoid, prevMove);

    //need to overwrite this too as behaviour prior to refactor was expecting modification in place
    startPos.x = x;
    startPos.y = y;

    return directions;
}

function tryToFixDirections(directions: string[], startPos: Coordinate, toAvoid: Coordinate, prevMove: string | null) {
    const hDirs = ['<', '>'];
    const yDirs = ['^', 'v'];

    //we're moving horizontally AND vertically, so there must be some combination that avoids the null square!
    if (directions.some(x => hDirs.includes(x)) && directions.some(y => yDirs.includes(y))) {
        const targetDirs = directions.toSorted((a, b) => a == prevMove ? 1 : movementWeights[b] - movementWeights[a]);
        if (doMovesStillWork(targetDirs, { ...startPos }, toAvoid)) {
            return targetDirs
        }

        targetDirs.sort((a, b) => a == prevMove ? 1 : movementWeights[a] - movementWeights[b])
        if (doMovesStillWork(targetDirs, { ...startPos }, toAvoid)) {
            return targetDirs
        }
    }

    return directions;
}

function doMovesStillWork(moves: string[], pos: Coordinate, toAvoid: Coordinate) {
    for (const dir of moves) {
        const targetMove = movesToDirs[dir];
        if (!targetMove) {
            continue;
        }

        pos = move[targetMove](pos.x, pos.y);

        if (areCoordsEqual(pos, toAvoid)) {
            return false;
        }
    }

    return true;
}

const dirKeypad = [null, '^', 'A', '<', 'v', '>'];
const dirGap = { x: 0, y: 0 };

const numKeypad = ['7', '8', '9', '4', '5', '6', '1', '2', '3', null, '0', 'A'];
const numGap = { x: 0, y: 3 };

let codeBot: Coordinate = { x: 2, y: 3 };
let dirBot: Coordinate = { x: 2, y: 0 };

let total = 0;

for (const code of codes) {
    let directions: string[] = [];
    let numStr = "";

    for (const char of code) {
        if (char != "A") {
            numStr += char;
        }

        const target = getPosition(numKeypad, char);
        directions.push(...getMovesTo(codeBot, target, numGap));
        directions.push("A");
    }

    for(let i = 0; i < 2; i++){
        let moves = []; //moves is just intermediate directions (great naming i know...)
        let prevDir = null;

        for (const dir of directions) {
            const target = getPosition(dirKeypad, dir);
    
            moves.push(...getMovesTo(dirBot, target, dirGap, prevDir), "A");
            prevDir = moves[moves.length - 2];
        }

        directions = moves;
    }

    const num = parseInt(numStr);
    total += (num * directions.length);
}

console.log(total);