import { getPuzzleInput } from "../../utils";

console.log(getPuzzleInput(__dirname).reduce((acc, val) => acc + (JSON.stringify(val).length - val.length), 0));
