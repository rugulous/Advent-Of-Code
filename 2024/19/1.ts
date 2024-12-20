import { getPuzzleInput } from "../../utils";

const input = getPuzzleInput(__dirname);

const regex = new RegExp("^(" + input[0].split(", ").map(p => p.trim()).join("|") + ")+$");

let total = 0;
for(let i = 2; i < input.length; i++){
    const result = regex.exec(input[i]);
    if(result){
        total++;
    }
}

console.log(total);