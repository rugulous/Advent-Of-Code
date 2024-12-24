import { getPuzzleInput } from "../../utils";

const operations = {
    "AND": (a: number, b: number) => (a == b && a == 1) ? 1 : 0,
    "OR": (a: number, b: number) => (a == 1 || b == 1) ? 1 : 0,
    "XOR": (a: number, b: number) => (a != b) ? 1 : 0
}

const values: {[key: string]: number} = {};
const wireRegex = /(.*) (AND|OR|XOR) (.*) -> (.*)/

const input = getPuzzleInput(__dirname, "example.txt");
let settingValues = true;
const output = {};

for(const line of input){
    if(line.trim() == ""){
        settingValues = false;
        continue;
    }

    if(settingValues){
        const [wire, value] = line.split(": ");
        values[wire] = parseInt(value);
    } else {
        const parts = wireRegex.exec(line);
        
        output[parts[4]] = operations[parts[2]](values[parts[1]], values[parts[3]]);
    }
}

const keys = Object.keys(output).filter(k => k.startsWith("z")).toSorted((a, b) => a.localeCompare(b));
let total = 0;

for(let i = 0; i < keys.length; i++){
    if(output[keys[i]] == 1){
        total += Math.pow(2, i);
    }
}

console.log(total);