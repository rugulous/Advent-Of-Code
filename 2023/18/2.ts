import { Coordinate, Direction } from "../../type";
import { getPuzzleInput, move } from "../../utils";

type Instruction = {
    direction: Direction,
    number: number
};

function mapDirection(shortDir: string): Direction{
    if(shortDir == "3"){
        return "UP";
    }

    if(shortDir == "1"){
        return "DOWN";
    }

    if(shortDir == "2"){
        return "LEFT";
    }

    return "RIGHT";
}

function parseInstructions(line: string): Instruction{
    const [,, hex] = line.replace("(", "").replace(")", "").replace("#", "").split(" ");

    const number = parseInt(hex.substring(0, 5), 16);
    const direction = mapDirection(hex[5]);

    return {
        direction,
        number
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

const instructions = getPuzzleInput(__dirname).map(l => parseInstructions(l));
console.log(getArea(instructions));