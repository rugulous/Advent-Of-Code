import { findShortestPath, getPuzzleInput, grid, iterateNodes } from "../../utils";

function calculatePath(){
    const endNode = findShortestPath(map, {x: 0, y: 0}, {x: TARGET_SIZE - 1, y: TARGET_SIZE - 1});

    if(!endNode){
        return null;
    }

    let path = new Set<string>();

    iterateNodes(endNode, (node) => {
        path.add(`${node.coordinate.x},${node.coordinate.y}`);
    });

    return path;
}

const TARGET_SIZE = 71; //grid goes from 0-70, so 71 total
const NUM_TO_PROCESS = 1024;

const map = grid(TARGET_SIZE, true, TARGET_SIZE);

const input = getPuzzleInput(__dirname);

input.slice(0, NUM_TO_PROCESS).forEach(line => {
    const [x, y] = line.split(",").map(x => parseInt(x))
    map[y][x] = false;
});

let attempt = NUM_TO_PROCESS;
let path = calculatePath();

while(true){
    attempt++;
    const [x, y] = input[attempt].split(",").map(x => parseInt(x));
    map[y][x] = false;

    if(!path.has(`${x},${y}`)){
        continue;
    }

    path = calculatePath();
    if(!path){
        break;
    }
}

console.log(attempt);
console.log(input[attempt]);