import { getPuzzleInput, grid } from "../../utils";

class Brick {
    left: number;
    right: number;
    top: number;
    bottom: number;
    front: number;
    back: number;

    constructor(start: [number, number, number], end: [number, number, number]){
        [this.front, this.back] = [start[0], end[0]].sort();
        [this.left, this.right] = [start[1], end[1]].sort();
        [this.top, this.bottom] = [start[2], end[2]].sort();
    }
}

function mapBlock(grid, block){

}

function parseInput(line: string){
    const [start, end] = line.split("~").map(c => c.split(",").map(d => parseInt(d))) as [[number, number, number], [number, number, number]];
    return new Brick(start, end);
}

const input = getPuzzleInput(__dirname, "example.txt").map(parseInput);
console.log(input);

const topDown = grid(input.length, [0, 0], input.length);