import { grid, getPuzzleInput } from "../../utils";

const lights = grid(1000, false);
const operations = {
    'on': (x: number, y: number) => true,
    'off': (x: number, y: number) => false,
    'toggle': (x: number, y: number) => !lights[x][y]
}

function buildRange(startCoord: string, endCoord: string){
    const [top, left] = startCoord.split(",").map(n => parseInt(n));
    const [bottom, right] = endCoord.split(",").map(n => parseInt(n));

    return {
        top,
        left,
        bottom,
        right
    };
}

function applyInstruction(instruction: string){
    const parts = instruction.split(" ");
    if(parts[0] == 'turn'){
        parts.shift();
    }

    const command = parts[0];
    const range = buildRange(parts[1], parts[3]); //parts[2] = "through"

    for(let x = range.left; x <= range.right; x++){
        for(let y = range.top; y <= range.bottom; y++){
            lights[x][y] = operations[command](x, y);
        }
    }
}

getPuzzleInput(__dirname).forEach(i => applyInstruction(i));

const litCount = lights.reduce((acc, val) => acc + val.filter(v => v).length, 0);
console.log(litCount);