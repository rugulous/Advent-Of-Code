import { getPuzzleInput } from "../../utils";

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
    console.log(puzzle);
    console.log(springs);
}

const input = getPuzzleInput(__dirname, "example.txt").forEach(parseLine);