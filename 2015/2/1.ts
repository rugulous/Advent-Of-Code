import { getPuzzleInput } from "../../utils";

function getSurfaceArea([length = 1, width = 1, height = 1]: number[]){
    return (2 * length * width) + (2 * width * height) + (2 * height * length);
}

function calculatePaper(line: string){
    const dimensions = line.split("x").map(n => parseInt(n));

    const surfaceArea = getSurfaceArea(dimensions);
    const slack = dimensions.sort((a, b) => b - a).splice(1).reduce((acc, val) => acc * val, 1);

    return surfaceArea + slack;
}

const input = getPuzzleInput(__dirname);
const totalPaper = input.map(l => calculatePaper(l)).reduce((acc, val) => acc + val, 0);

console.log(totalPaper);