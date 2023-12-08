import { getPuzzleInput } from "../../utils";

//true short-circuits, so true = failed rule, false = passed
const rules = [
    (str: string) => { //pair of two letters that appear at least twice without overlapping
        for(let i = 0; i < str.length; i++){
            const pair = str[i] + str[i + 1];

            if(str.indexOf(pair, i + 2) > -1){
                return false;
            }
        }

        return true;
    }, 
    (str: string) => { //one letter which repeats with exactly one letter inbetween
        for(let i = 0; i < str.length; i++){
            if(str[i] == str[i + 2]){
                return false;
            }
        }

        return true;
    }
];

console.log(getPuzzleInput(__dirname).filter(l => !rules.some(r => r(l))).length);