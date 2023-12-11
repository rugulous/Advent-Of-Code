import { arrayHasSameValue, columnHasSameValue, getPuzzleInput } from "../../utils";

function expandVertically(universe: string[][]) {
    const offsets = [];
    let currOffset = 0;

    for (let i = 0; i < universe.length; i++) {
        offsets.push(currOffset);
        
        if (arrayHasSameValue(universe[i], ".")) {
            currOffset++;
        }
    }

    return offsets;
}

function expandHorizontally(universe: string[][]) {
    const offets = [];
    let currOffset = 0;

    for (let i = 0; i < universe[0].length; i++) {
        offets.push(currOffset);
        
        if (columnHasSameValue(universe, i, ".")) {
            currOffset++;
        }
    }

    return offets;
}

function getOffsetCoordinate(y: number, x:number){
    return {
        y: y + offsets.y[y], 
        x: x + offsets.x[x]
    };
}

function expandUniverse(universe: string[][]) {
    const y = expandVertically(universe);
    const x = expandHorizontally(universe);

    return {x, y};
}

function locateGalaxies(universe: string[][]) {
    const galaxies = [];

    for (let y = 0; y < universe.length; y++) {
        for (let x = 0; x < universe[0].length; x++) {
            if (universe[y][x] == "#") {
                galaxies.push(getOffsetCoordinate(y, x));
            }
        }
    }

    return galaxies;
}

const input = getPuzzleInput(__dirname).map(l => l.split(""));
const offsets = expandUniverse(input);

let total = 0;
const galaxies = locateGalaxies(input);
for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        const distance = Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y);
        total += distance;
    }
}

console.log(total);