import { replaceAt, getBoolPermutations, getPuzzleInput, arraysEqual } from "../../utils";

const regExp = /((?<=^|\.)#+(?=\.|$))/g;

function removeCompleted(line: string, targets: number[]): [string, number[]]{
    const matchCounts = {};

    for(let match of line.matchAll(regExp)){
        const length = match[0].length;

        if(!matchCounts.hasOwnProperty(length)){
            matchCounts[length] = {
                count: 0,
                positions: []
            }
        }
        matchCounts[length].count++;
        matchCounts[length].positions.push(match.index);

        if(targets.filter(t => t == length).length == matchCounts[length].count){
            targets = targets.filter(t => t != length);

            for(const position of matchCounts[length].positions){
                line = line.substring(0, position) + "-".repeat(length) + line.substring(position + length);
            }
        }
    }

    line = line.replaceAll(/-+/g, "");
    return [line, targets];
}

function parseLine(line: string){
    let [puzzle, rawSprings] = line.split(" ");
    let springs = rawSprings.split(",").map(n => parseInt(n));

    [puzzle, springs] = removeCompleted(puzzle, springs);
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
    console.log(targets);
    let numPermutations = 0;
    const replaceable = [...line.matchAll(/\?/g)];
    const permutations = getBoolPermutations(replaceable.length).map(p => p.map(q => q ? "#" : "."));

    for(let i = 0; i < permutations.length; i++){
        let startStr = (' ' + line).slice(1);
        
        for(let j = 0; j < replaceable.length; j++){
            startStr = replaceAt(startStr, replaceable[j].index, permutations[i][j]);
        }

        if(checkMatch(startStr, targets)){
            console.log(`${startStr} is a match!`);
            numPermutations++;
        }
    }

    return numPermutations;
}

const input = getPuzzleInput(__dirname, "example.txt");

//console.log(parseLine(input[1]));

console.log(input.map(parseLine).reduce((acc, val) => acc + val, 0));