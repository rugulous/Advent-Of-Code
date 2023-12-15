import { getPuzzleInput } from "../../utils";

function hash(string: string){
    let value = 0;

    for(const char of string){
        const ascii = char.charCodeAt(0);
        value += ascii;
        value *= 17;
        value %= 256;
    }

    return value;
}

const input = getPuzzleInput(__dirname, "example.txt")[0].split(",");
console.log(input.reduce((acc, val) => acc + hash(val), 0));