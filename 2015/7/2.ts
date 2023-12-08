import { ILooseObject } from "../../type";
import { getPuzzleInput } from "../../utils";

const rawWires: ILooseObject = {};
const solvedWires: ILooseObject = {};

const operations = {
    'AND': (a: number, b: number) => a & b,
    'OR': (a: number, b: number) => a | b,
    'RSHIFT': (a: number, b: number) => a >>> b,
    'LSHIFT': (a: number, b: number) => a << b
};

const opcodes = [...Object.keys(operations), 'NOT'];

function processWire(line: string) {
    const [input, output] = line.split(" -> ");
    rawWires[output] = input.split(" ");
}

function solve(wire: string, value: number) {
    solvedWires[wire] = value;
    delete rawWires[wire];
}

function getValueFor(wireOrNum: string): number | string | null {
    if(opcodes.includes(wireOrNum)){
        return wireOrNum;
    } 
    
    const attempt = parseInt(wireOrNum);
    if (!isNaN(attempt)) {
        return attempt;
    } 
    
    if (solvedWires.hasOwnProperty(wireOrNum)) {
        return solvedWires[wireOrNum];
    }

    return null;
}

function solveWires() {
    let keys = Object.keys(rawWires);

    while (keys.length > 0) {
        for (const wire of keys) {
            const parts = rawWires[wire].map(p => getValueFor(p));

            if (parts[0] === null) {
                continue;
            }

            if (parts.length == 1) {
                solve(wire, parts[0] as number);
                continue;
            }

            if (parts[1] === null) {
                continue;
            }

            if (parts.length == 2) { //NOT
                solve(wire, ~parts[1]);
                continue;
            }

            if (parts[2] === null) {
                continue;
            }

            solve(wire, operations[parts[1]](parts[0], parts[2]));
        }
        keys = Object.keys(rawWires);
    }
}

getPuzzleInput(__dirname).forEach(processWire);

solvedWires.b = 16076;
if(rawWires.hasOwnProperty("b")){
    delete rawWires.b;
}

solveWires();

console.log(solvedWires.a);