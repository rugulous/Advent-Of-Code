import { replaceAt, getBoolPermutations, getPuzzleInput, arraysEqual, countOccurrences } from "../../utils";

function parseLine(line: string){
    let [puzzle, rawSprings] = line.split(" ");
    let springs = rawSprings.split(",").map(n => parseInt(n));

    return generatePermutations(puzzle, springs);
}

function checkMatch(solvedLine: string, targets: number[]){
    const origTargets = [...targets];
    let count = 0;
    let currentTarget = targets.shift();
    const counts = [];

    for(const char of solvedLine){
        if(char == '#'){
            count++;
        } else if(count > 0){
            if(count != currentTarget){
                return false;
            }

            counts.push(count);
            count = 0;
            currentTarget = targets.shift();
        }
    }

    if(count > 0){
        counts.push(count);
    }

    return arraysEqual(counts, origTargets);
}

function generatePermutations(line: string, targets: number[]){
    const numHash = targets.reduce((acc, val) => acc + val, 0) - countOccurrences(line, "#");
    let numPermutations = 0;

    const replaceable = [...line.matchAll(/\?/g)];
    const permutations = getBoolPermutations(replaceable.length).filter(p => p.filter(x => x).length == numHash).map(p => p.map(q => q ? "#" : "."));

    for(let i = 0; i < permutations.length; i++){
        let startStr = (' ' + line).slice(1);
        
        for(let j = 0; j < replaceable.length; j++){
            startStr = replaceAt(startStr, replaceable[j].index, permutations[i][j]);
        }

        if(checkMatch(startStr, [...targets])){
            numPermutations++;
        }
    }

    return numPermutations;
}

const input = getPuzzleInput(__dirname);
console.log(input.map(parseLine).reduce((acc, val) => acc + val, 0));