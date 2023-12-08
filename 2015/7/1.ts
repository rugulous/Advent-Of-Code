import { ILooseObject } from "../../type";
import { fromBinary, getPuzzleInput, toBinary, invert } from "../../utils";

const rawWires: ILooseObject = {};
const solvedWires: ILooseObject = {};

function processWire(line: string){
    const [input, output] = line.split(" -> ");

    const parsedValue = parseInt(input)
    if(!isNaN(parsedValue)){ //hooray, we have a raw value!
        console.log(`Setting wire ${output} to ${parsedValue}`);
        solvedWires[output] = parsedValue;
    } else {
        rawWires[output] = input.split(" ");
    }
}

function solve(wire: string, value: number){
    solvedWires[wire] = value;
    delete rawWires[wire];

    console.log(`Solved ${wire}`);
}

function solveWires(){
    let keys = Object.keys(rawWires);
    while(keys.length > 0){
        console.log(keys);

        for(const wire of keys){
            const parts = rawWires[wire];

            for(let i = 0; i < parts.length; i++){
                const prev = (i == 0) ? null : parts[i - 1];
                const part = parts[i];
                const next = (i == parts.length - 1) ? null : parts[i + 1];

                if(part == "NOT"){
                    if(!solvedWires.hasOwnProperty(next)){
                        console.log(`Missing wire '${next}' needed for ${wire}`);
                        break; //we don't have the wire to solve this yet
                    }

                    const bits = toBinary(solvedWires[next], 16);
                    invert(bits);
                    solve(wire, fromBinary(bits));
                    break;
                }

                if(part == 'AND'){
                    if(!solvedWires.hasOwnProperty(prev) || !solvedWires.hasOwnProperty(next)){
                        console.log(`Missing either wire '${prev}' or '${next}' needed for ${wire}`);
                        break; //we don't have the wires to solve this yet
                    }

                    solve(wire, solvedWires[prev] & solvedWires[next]);
                    break;
                }

                if(part == 'OR'){
                    if(!solvedWires.hasOwnProperty(prev) || !solvedWires.hasOwnProperty(next)){
                        console.log(`Missing either wire '${prev}' or '${next}' needed for ${wire}`);
                        break; //we don't have the wires to solve this yet
                    }

                    solve(wire, solvedWires[prev] | solvedWires[next]);
                    break;
                }

                if(part == 'LSHIFT'){
                    if(!solvedWires.hasOwnProperty(prev)){
                        console.log(`Missing wire '${prev}' needed for ${wire}`);
                        break; //we don't have the wire to solve this
                    }

                    solve(wire, solvedWires[prev] << parseInt(next));
                    break;
                }

                if(part == 'RSHIFT'){
                    if(!solvedWires.hasOwnProperty(prev)){
                        console.log(`Missing wire '${prev}' needed for ${wire}`);
                        break; //we don't have the wire to solve this
                    }

                    solve(wire, solvedWires[prev] >> parseInt(next));
                    break;
                }
            }
        }

        keys = Object.keys(rawWires);
    }
}

const input = getPuzzleInput(__dirname, "example.txt");
input.forEach(processWire);


console.log(rawWires);
solveWires();
console.log(solvedWires);