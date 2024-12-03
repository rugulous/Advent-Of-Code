import { getPuzzleInput } from "../../utils";

const regex = /mul\((\d*),(\d*)\)/g

const memory = getPuzzleInput(__dirname).join("");
let total = 0;

let match: RegExpExecArray | null;
while(match = regex.exec(memory)){
    total += (parseInt(match[1]) * parseInt(match[2]));;
}

console.log(total);