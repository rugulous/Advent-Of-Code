import {countOccurrencesInArray, getPuzzleInput} from "../../utils";

const left: number[] = [];
const right: number[] = [];

getPuzzleInput(__dirname).forEach(line => {
    const [l, r] = line.split("   ");
    left.push(parseInt(l.trim()));
    right.push(parseInt(r.trim()));
});

const found = {};
let total = 0;

left.forEach(num => {
    if(!found.hasOwnProperty(num)){
        found[num] = num * countOccurrencesInArray(right, num);
    }

    total += found[num];
});

console.log(total);