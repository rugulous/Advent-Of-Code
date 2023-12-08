import { getPuzzleInput } from "../../utils";

function isHex(char: string){
    return !isNaN(parseInt(char)) || ['a', 'b', 'c', 'd', 'e', 'f'].includes(char);
}

function scoreLine(line: string){
    let inMemChars = 0; 
    for(let i = 1; i < line.length - 1; i++){
        inMemChars++;

        if(line[i] == "\\"){
            if(["\\", '"'].includes(line[i + 1])){
                i++;
                continue;
            }

            if(line[i + 1] == "x" && isHex(line[i + 2]) && isHex(line[i + 3])){
                i += 3;
            }
        }
    }

    console.log(`Score for ${line} is ${line.length} - ${inMemChars} = ${line.length - inMemChars}`);
    return line.length - inMemChars;
}

const input = getPuzzleInput(__dirname, "example.txt");
const total = input.reduce((acc, val) => acc + scoreLine(val), 0);
console.log(total);
