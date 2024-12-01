import {countOccurrences, getPuzzleInput} from "../../utils";

const left: number[] = [];
const right: number[] = [];

getPuzzleInput(__dirname).forEach(line => {
    const [l, r] = line.split("   ");
    left.push(parseInt(l.trim()));
    right.push(parseInt(r.trim()));
});

const found = {};
let total = 0;
const strRight = right.join("--");

left.forEach(num => {
    if(!found.hasOwnProperty(num)){
        found[num] = num * countOccurrences(strRight, num.toString());
    }

    total += found[num];
});

console.log(total);