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
output(input);