import { Direction } from "../../type";
import { findShortestPath, getPuzzleInput, inputMap, outputMap, rotatedMoves } from "../../utils";

let startPos = null;
let endPos = null;

function getTotalRotations(prevDir: Direction, currDir: Direction){
    let rotations = 0;

    while(prevDir != currDir){
        prevDir = rotatedMoves[prevDir];
        rotations++;
    }

    if(rotations == 3){ //R / R / R === L
        rotations = 1;
    }

    return rotations;
}

const map = inputMap(getPuzzleInput(__dirname, "example.txt"), (char, x, y) => {
    if(char == "S"){
        startPos = {x,y};
    } else if(char == "E"){
        endPos = {x,y};
    } else {
        return false;
    }

    return true;
});

console.log(startPos);
console.log(endPos);
const end = findShortestPath(map, startPos, endPos, (from, to, prevDir, currDir) => 1 + (getTotalRotations(prevDir, currDir) * 1000));
console.log(end);