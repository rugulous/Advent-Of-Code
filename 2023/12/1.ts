import { replaceAt, getBoolPermutations, getPuzzleInput, arraysEqual } from "../../utils";

function parseLine(line: string){
    let [puzzle, rawSprings] = line.split(" ");
    let springs = rawSprings.split(",").map(n => parseInt(n));

    return generatePermutations(puzzle, springs);
}

function checkMatch(solvedLine: string, targets: number[]){
    let count = 0;
    const counts = [];

    for(const char of solvedLine){
        if(char == '#'){
            count++;
        } else if(count > 0){
            counts.push(count);
            count = 0;
        }
    }

    if(count > 0){
        counts.push(count);
    }

    return arraysEqual(counts, targets);
}

function generatePermutations(line: string, targets: number[]){
    let numPermutations = 0;
    const replaceable = [...line.matchAll(/\?/g)];
    const permutations = getBoolPermutations(replaceable.length).map(p => p.map(q => q ? "#" : "."));

    for(let i = 0; i < permutations.length; i++){
        let startStr = (' ' + line).slice(1);
        
        for(let j = 0; j < replaceable.length; j++){
            startStr = replaceAt(startStr, replaceable[j].index, permutations[i][j]);
        }

        if(checkMatch(startStr, targets)){
            numPermutations++;
        }
    }

    return numPermutations;
}

const input = getPuzzleInput(__dirname);

//console.log(parseLine(input[1]));

console.log(input.map(parseLine).reduce((acc, val) => acc + val, 0));