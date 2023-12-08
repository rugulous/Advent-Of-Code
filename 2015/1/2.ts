import { getPuzzleInput } from "../../utils";

const input = getPuzzleInput(__dirname)[0];

let pos = 0;
for(let i = 0; i < input.length; i++){
    if(input[i] == '('){
        pos++;
    } else {
        pos--;
    }

    if(pos < 0){
        console.log(i + 1);
        break;
    }
}