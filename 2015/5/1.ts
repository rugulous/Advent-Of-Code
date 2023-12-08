import { countOccurrences, getPuzzleInput } from "../../utils";

const vowels = ['a','e','i','o','u'];
const blocked = ['ab', 'cd', 'pq', 'xy'];

//true short-circuits, so true = failed rule, false = passed
const rules = [
    (str: string) => vowels.reduce((acc: number, v: string) => acc + countOccurrences(str, v), 0) < 3, //at least 3 vowels
    (str: string) => {
        for(let i = 0; i < str.length - 1; i++){
            if(str[i] == str[i + 1]){
                return false;
            }
        }

        return true;
    }, //repeating chars
    (str: string) => blocked.some(x => str.indexOf(x) >= 0), //no blocked strings
];

console.log(getPuzzleInput(__dirname).filter(l => !rules.some(r => r(l))).length);