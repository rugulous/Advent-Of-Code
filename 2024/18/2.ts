import { findShortestPath, getPuzzleInput, grid } from "../../utils";

const TARGET_SIZE = 71; //grid goes from 0-70, so 71 total
const NUM_TO_PROCESS = 1024;

const map = grid(TARGET_SIZE, true, TARGET_SIZE);

const input = getPuzzleInput(__dirname);

input.slice(0, NUM_TO_PROCESS).forEach(line => {
    const [x, y] = line.split(",").map(x => parseInt(x))
    map[y][x] = false;
});

let attempt = NUM_TO_PROCESS;
while(true){
    const minDist = findShortestPath(map, {x: 0, y: 0}, {x: TARGET_SIZE - 1, y: TARGET_SIZE - 1}); //start at top left corner and work to bottom right
    if(minDist < 0){
        break;
    }

    attempt++;
    const [x, y] = input[attempt].split(",").map(x => parseInt(x));
    map[y][x] = false;
}

console.log(attempt);
console.log(input[attempt]);