import { getPuzzleInput, rotate, transpose } from "../../utils";

function output(map: string[][]) {
    for (const row of map) {
        console.log(row.join(""));
    }

    console.log();
}

function tilt(input: string[][]) {
    input = transpose(input);
    for (const line of input) {
        for (let x = 1; x < line.length; x++) {
            if (line[x] != 'O') {
                continue;
            }

            for (let newX = x - 1; newX >= 0; newX--) {
                const blocked = ['#', 'O'].includes(line[newX]);
                if (blocked || newX == 0) {
                    if (blocked) {
                        newX++;
                    }

                    line[newX] = 'O';

                    if (newX != x) {
                        line[x] = '.';
                    }

                    break;
                }
            }
        }
    }

    return transpose(input);
}

function doCycle(input: string[][]) {
    for (let i = 0; i < 4; i++) {
        input = tilt(input);
        input = rotate(input, true);
    }

    return input;
}

const encountered = {};

let input = getPuzzleInput(__dirname).map(line => line.split(""));
const totalRuns = 1_000_000_000;

for(let i = 1; i < totalRuns; i++){
    input = doCycle(input);
    const key = input.map(i => i.join("")).join("");
    if (!encountered.hasOwnProperty(key)) {
        encountered[key] = i;
    } else if((totalRuns - i) % (i - encountered[key]) == 0){
        console.log(`i: ${i}`);
        console.log(`We saw this at run ${encountered[key]}`);
        console.log(`${(totalRuns - i)} mod ${(i - encountered[key])} = 0!`);
        break;
    }
}

output(input);

console.log(input.reduce((acc, val, line) => {
    const score = input.length - line;
    return acc + val.reduce((a, v) => a + (v == "O" ? score : 0), 0)
}, 0));