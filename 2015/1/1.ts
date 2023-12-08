import {getPuzzleInput} from "../../utils";

const input = getPuzzleInput(__dirname)[0];

const open = input.split("(").length;
const close = input.split(")").length;

console.log(open - close);