import { getPuzzleInput, getSmallestN } from "../../utils";

function calculateRibbon(line: string){
    const dimensions = line.split("x").map(n => parseInt(n));

    const smallestSides = getSmallestN(dimensions, 2);
    const perimeter = (smallestSides[0] + smallestSides[1]) * 2;
    const area = dimensions.reduce((acc, val) => acc * val, 1);

    return area + perimeter;
}

const input = getPuzzleInput(__dirname);
const ribbon = input.map(l => calculateRibbon(l)).reduce((acc, val) => acc + val, 0);
console.log(ribbon);