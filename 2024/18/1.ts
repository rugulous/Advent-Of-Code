import { findShortestPath, getPuzzleInput, grid } from "../../utils";

const TARGET_SIZE = 71; //grid goes from 0-70, so 71 total
const NUM_TO_PROCESS = 1024;

const map = grid(TARGET_SIZE, true, TARGET_SIZE);

getPuzzleInput(__dirname).slice(0, NUM_TO_PROCESS).forEach(line => {
    const [x, y] = line.split(",").map(x => parseInt(x))
    map[y][x] = false;
});


const minDist = findShortestPath(map, {x: 0, y: 0}, {x: TARGET_SIZE - 1, y: TARGET_SIZE - 1}).distanceToStart; //start at top left corner and work to bottom right

console.log(minDist);