import { arrayHasSameValue, columnHasSameValue, getPuzzleInput } from "../../utils";

function expandHorizontally(universe: string[][]){
    const toAdd = [];

    for(let i = 0; i < universe.length; i++){
        if(arrayHasSameValue(universe[i], ".")){
            toAdd.push(i);
        }
    }

    for(let i = 0; i < toAdd.length; i++){
        universe.splice(i + toAdd[i], 0, [...universe[i + toAdd[i]]]);
    }
}

function expandVertically(universe: string[][]){
    const toAdd = [];

    for(let i = 0; i < universe[0].length; i++){
        if(columnHasSameValue(universe, i, ".")){
            toAdd.push(i);
        }
    }

    for(let i = 0; i < toAdd.length; i++){
        for(let y = 0; y < universe.length; y++){
            universe[y].splice(i + toAdd[i], 0, ".");
        }
    }
}

function expandUniverse(universe: string[][]){
    expandHorizontally(universe);
    expandVertically(universe);

    return universe;
}

function locateGalaxies(universe: string[][]){
    const galaxies = [];

    for(let y = 0; y < universe.length; y++){
        for(let x = 0; x < universe[0].length; x++){
            if(universe[y][x] == "#"){
                galaxies.push({y, x});
            }
        }
    }

    return galaxies;
}

function output(universe: string[][]){
    for(const line of universe){
        let row = "";
        for(const char of line){
            row += char;
        }
        console.log(row);
    }
}

const input = getPuzzleInput(__dirname, "example.txt").map(l => l.split(""));
expandUniverse(input);
//output(input);

let total = 0;
const galaxies = locateGalaxies(input);
for(let i = 0; i < galaxies.length; i++){
    for(let j = i + 1; j < galaxies.length; j++){
        const distance = Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y);
        total += distance;
    }
}

console.log(total);