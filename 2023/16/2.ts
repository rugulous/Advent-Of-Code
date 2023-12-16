import { Coordinate, Direction, ILooseObject } from "../../type";
import { getPuzzleInput, grid, move, sleep } from "../../utils";

function travel(position: Coordinate, direction: Direction) {
    const mirror1: Record<Direction, Direction> = { "DOWN": "LEFT", "RIGHT": "UP", "UP": "RIGHT", "LEFT": "DOWN" };
    const mirror2: Record<Direction, Direction> = { "DOWN": "RIGHT", "RIGHT": "DOWN", "UP": "LEFT", "LEFT": "UP" };
    //const prevPosition = {...position};
    let timeSinceEnergised = 0;

    while (true) {
        if ((position.x < 0 || position.x >= input[0].length) || (position.y < 0 || position.y >= input.length)) { //|| (position.x == prevPosition.x && position.y == prevPosition.y)){
            //we fell off the map :(
            break;
        }

        if (!energized[position.y][position.x]) {
            energized[position.y][position.x] = true;
        } else {
            timeSinceEnergised++;
        }

        // if(timeSinceEnergised >= input.length){
        //     break;
        // }

        const tile = input[position.y][position.x];
        if (tile == ".") {
        }

        if (tile == "/") {
            direction = mirror1[direction];
        }

        if (tile == "\\") {
            direction = mirror2[direction];
        }

        if (tile == "-") {
            if (['DOWN', 'UP'].includes(direction)) {
                if(splittersHit[`${position.x}-${position.y}`]){
                    break;
                }

                splittersHit[`${position.x}-${position.y}`] = true;
                travel(move["LEFT"](position.x, position.y), "LEFT");
                travel(move["RIGHT"](position.x, position.y), "RIGHT");
                break;
            }
        }

        if (tile == "|") {
            if (['LEFT', 'RIGHT'].includes(direction)) {
                if(splittersHit[`${position.x}-${position.y}`]){
                    break;
                }

                splittersHit[`${position.x}-${position.y}`] = true;
                travel(move["UP"](position.x, position.y), "UP");
                travel(move["DOWN"](position.x, position.y), "DOWN");
                break;
            }
        }

        position = move[direction](position.x, position.y);
    }
}

function outputEnergised() {
    for (const line of energized) {
        let str = "";

        for (const bit of line) {
            str += (bit ? "#" : ".");
        }

        console.log(str);
    }
}

function tryRun(x: number, y: number, direction: Direction): number{
    energized = grid(input[0].length, false, input.length);
    splittersHit = {};

    travel({ x, y }, direction);
    const score = energized.reduce((acc, val) => acc + val.reduce((a, v) => a + (+v), 0), 0);  
    return score;
}

const input = getPuzzleInput(__dirname);
let energized: boolean[][] = [];
let splittersHit: ILooseObject = {};

let bestScore = 0;

for(let i = 0; i < input[0].length; i++){
    let score = tryRun(i, 0, "DOWN");
    if(score > bestScore){
        bestScore = score;
    }

    score = tryRun(i, input.length - 1, "UP");
    if(score > bestScore){
        bestScore = score;
    }
}

for(let i = 0; i < input.length; i++){
    let score = tryRun(0, i, "RIGHT");
    if(score > bestScore){
        bestScore = score;
    }

    score = tryRun(input[0].length - 1, i, "LEFT");
    if(score > bestScore){
        bestScore = score;
    }
}

console.log(bestScore);