import { ILooseObject } from "../../type";
import { fromBinary, getPuzzleInput, toBinary, invert } from "../../utils";

const wires: ILooseObject = {};

function processWire(line: string){
    const [input, output] = line.split(" -> ");
    wires[output] = input;
}

const input = getPuzzleInput(__dirname, "example.txt");
input.forEach(processWire);

console.log(wires);


const bits = toBinary(123, 16);
console.log(bits);
invert(bits);
console.log(fromBinary(bits));