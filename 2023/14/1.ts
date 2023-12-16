import { getPuzzleInput, transpose } from "../../utils";

function output(map: string[][]){
    for(const row of map){
        let line = "";

        for(const char of row){
            line += char;
        }

        console.log(line);
    }
}

const input = transpose(getPuzzleInput(__dirname).map(line => line.split("")), true);

for(const line of input){
    for(let x = 1; x < line.length; x++){
        if(line[x] != 'O'){
            continue;
        }

        for(let newX = x - 1; newX >= 0; newX--){
            const blocked = ['#', 'O'].includes(line[newX]);
            if(blocked || newX == 0){
                if(blocked){
                    newX++;
                }

                line[newX] = 'O';

                if(newX != x){
                    line[x] = '.';
                }

                break;
            }
        }
    }
}

console.log(input.reduce((acc, val) => acc + val.reduce((a, v, i) => a + (v == 'O' ? val.length - i : 0), 0), 0));