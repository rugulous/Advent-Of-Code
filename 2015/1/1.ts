import {getPuzzleInput, countOccurrences} from "../../utils";

const input = getPuzzleInput(__dirname)[0];

const open = countOccurrences(input, "(");
const close = countOccurrences(input, ")");

console.log(open - close);