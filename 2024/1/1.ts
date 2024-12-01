import {getPuzzleInput} from "../../utils";

const left: number[] = [];
const right: number[] = [];

getPuzzleInput(__dirname, "example.txt").forEach(line => {
    const [l, r] = line.split("   ");
    left.push(parseInt(l.trim()));
    right.push(parseInt(r.trim()));
});

left.sort((a,b) => a - b);
right.sort((a,b) => a - b);

const result = left.reduce((acc, _, i) => acc + (right[i] - left[i]), 0);
console.log(result);