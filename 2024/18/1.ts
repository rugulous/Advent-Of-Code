import { getPuzzleInput, grid, isOutOfBounds } from "../../utils";

const TARGET_SIZE = 7; //grid goes from 0-6, so 7 total
const NUM_TO_PROCESS = 12;

const destination = {
    x: TARGET_SIZE - 1,
    y: TARGET_SIZE - 1
}

const moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
];

function isSafe(x: number, y: number){
    return !isOutOfBounds({x, y}, map) && map[y][x] && !visited[y][x];
}

let minDist = Infinity;

function findShortestPath(x: number, y: number, currDist: number){
    if(x == destination.x && y == destination.y){
        minDist = Math.min(minDist, currDist);
        return;
    }

    visited[y][x] = true;

    for(const [moveX, moveY] of moves){
        if(isSafe(x + moveX, y + moveY)){
            findShortestPath(x + moveX, y + moveY, currDist + 1);
        }
    }

    visited[y][x] = false;
}

const map = grid(TARGET_SIZE, true, TARGET_SIZE);
const visited = grid(TARGET_SIZE, false, TARGET_SIZE);

getPuzzleInput(__dirname, "example.txt").slice(0, NUM_TO_PROCESS).forEach(line => {
    const [x, y] = line.split(",").map(x => parseInt(x))
    map[y][x] = false;
});


findShortestPath(0, 0, 0); //start at top left corner and work to bottom right
console.log(minDist);