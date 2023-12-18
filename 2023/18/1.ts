import { Coordinate, Direction } from "../../type";
import { fill, getPuzzleInput, grid, isOutOfBounds, move } from "../../utils";


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

function parseInstructions(line: string){
    const [rawDir, rawNum] = line.split(" ");
    return {
        direction: mapDirection(rawDir),
        number: parseInt(rawNum)
    };
}

function extendGrid<T>(grid: T[][], width: number, height: number, defaultValue: T | null = null){
    let yOffset = 0;
    while(grid.length <= height){
        grid.push(fill(grid[0].length, defaultValue));
        yOffset++;
    }

    let xOffset = 0;
    while(grid[0].length <= width){
        for(const row of grid){
            row.push(defaultValue);
        }
        xOffset++;
    }

    return [xOffset, yOffset];
}

function fillInsides(map: boolean[][]){
    for(let y = 0; y < map.length; y++){
        let inside = false;
        let prevEmpty = true;
        for(let x = 0; x < map[y].length; x++){
            if(map[y][x]){
                if(prevEmpty){
                    inside = !inside;
                }
                
                prevEmpty = false;
            } else {
                map[y][x] = inside;
                prevEmpty = true;
            }
        }
    }
}

function output(map: boolean[][]) {
    for (const row of map) {
        console.log(row.map(l => l ? "#" : ".").join(""));
    }

    console.log();
}

const instructions = getPuzzleInput(__dirname, "example.txt").map(l => parseInstructions(l));
const map = grid(1, false, 1);

let position: Coordinate = {x: 0, y: 0};

for(const instuction of instructions){
    console.log();
    console.log(position);
    console.log(instuction);
    const newPosition = move[instuction.direction](position.x, position.y, instuction.number);
    console.log(newPosition);

    if(isOutOfBounds(newPosition, map)){
        extendGrid(map, newPosition.x, newPosition.y, false);
    }

    if(newPosition.x != position.x){
        const minX = Math.min(position.x, newPosition.x);
        const maxX = Math.max(position.x, newPosition.x);

        for(let x = minX; x <= maxX; x++){
            map[position.y][x] = true;
        }
    }

    if(newPosition.y != position.y){
        const minY = Math.min(position.y, newPosition.y);
        const maxY = Math.max(position.y, newPosition.y);

        for(let y = minY; y <= maxY; y++){
            map[y][position.x] = true;
        }
    }

    position = newPosition;
}

output(map);

fillInsides(map);
output(map);

console.log(map.flat().reduce((acc, val) => acc + +val, 0));