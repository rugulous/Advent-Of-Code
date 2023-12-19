import { Coordinate, Direction } from "../../type";
import { getPuzzleInput, move } from "../../utils";

type Instruction = {
    direction: Direction,
    number: number
};

function mapDirection(shortDir: string): Direction{
    if(shortDir == "U"){
        return "UP";
    }

    if(shortDir == "D"){
        return "DOWN";
    }

    if(shortDir == "L"){
        return "LEFT";
    }

    return "RIGHT";
}

function parseInstructions(line: string): Instruction{
    const [rawDir, rawNum] = line.split(" ");
    return {
        direction: mapDirection(rawDir),
        number: parseInt(rawNum)
    };
}

function getArea(instructions: Instruction[]){
    let currPos: Coordinate = {x: 0, y: 0};
    let perimeter = 0;
    const points = [currPos];

    for(const instruction of instructions){
        currPos = move[instruction.direction](currPos.x, currPos.y, instruction.number);
        points.push(currPos);
        perimeter += instruction.number;
    }

    return shoelaceArea(points) + perimeter / 2 + 1;
}

function shoelaceArea(coordinates: Coordinate[]){
    let area = 0;
    
    for(let i = 0; i < coordinates.length - 1; i++){
        area += coordinates[i].x * coordinates[i + 1].y - coordinates[i + 1].x * coordinates[i].y;
    }

    return Math.abs(area + coordinates[coordinates.length - 1].x * coordinates[0].y - coordinates[0].x * coordinates[coordinates.length - 1].y) / 2;
}

const instructions = getPuzzleInput(__dirname, "example.txt").map(l => parseInstructions(l));
console.log(getArea(instructions));