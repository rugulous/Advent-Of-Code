import { getPuzzleInput, rotate, transpose } from "../../utils";

function output(map: string[][]){
    for(const row of map){
        console.log(row.join(""));
    }

    console.log();
}

function doCycle(input: string[][]) {
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

let input = getPuzzleInput(__dirname, "example.txt").map(line => line.split(""));

for(let i = 0; i < 4; i++){
    input = doCycle(input);
    output([...input]);
    input = rotate(input, true);
}

output(input);

console.log(input.reduce((acc, val) => acc + val.reduce((a, v, i) => a + (v == 'O' ? val.length - i : 0), 0), 0));