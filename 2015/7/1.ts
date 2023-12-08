import { ILooseObject } from "../../type";
import { getPuzzleInput } from "../../utils";

const rawWires: ILooseObject = {};
const solvedWires: ILooseObject = {};
const wireBackup: ILooseObject = {};

function processWire(line: string){
    const [input, output] = line.split(" -> ");

    const parts = input.split(" ");

    if(parts.length === 1){
        const parsedValue = parseInt(input)
        if(!isNaN(parsedValue)){ //hooray, we have a raw value!
            console.log(`Setting wire ${output} to ${parsedValue}`);
            solvedWires[output] = parsedValue;
            wireBackup[output] = [parsedValue];
            return;
        }
    }
    
    rawWires[output] = input.split(" ");
}

function solve(wire: string, value: number){
    solvedWires[wire] = value;
    wireBackup[wire] = rawWires[wire];
    delete rawWires[wire];

    //console.log(`Solved ${wire}`);
}

function getValueFor(wireOrNum: string): number | null{
    const attempt = parseInt(wireOrNum);
    if(!isNaN(attempt)){
        return attempt;
    }

    if(solvedWires.hasOwnProperty(wireOrNum)){
        return solvedWires[wireOrNum];
    }

    return null;
}

function solveWires(){
    let keys = Object.keys(rawWires);

    while(keys.length > 0){
        //console.log(keys);
        let solved = 0;

        for(const wire of keys){
            const parts = rawWires[wire];

            if(parts.length == 1){
                if(!solvedWires.hasOwnProperty(parts[0])){
                    //console.log(`Missing wire '${parts[0]} needed for ${wire}`);
                    continue;
                }

                solve(wire, solvedWires[parts[0]]);
                solved++;
            }

            for(let i = 0; i < parts.length; i++){
                const prev = (i == 0) ? null : getValueFor(parts[i - 1]);
                const part = parts[i];
                const next = (i == parts.length - 1) ? null : getValueFor(parts[i + 1]);

                if(part == "NOT"){
                    if(next === null){
                        //console.log(`Missing wire '${next}' needed for ${wire}`);
                        break; //we don't have the wire to solve this yet
                    }

                    solve(wire, ~next);
                    solved++;
                    break;
                }

                if(part == 'AND'){
                    if(prev === null || next === null){
                        //console.log(`Missing either wire '${prev}' or '${next}' needed for ${wire}`);
                        break; //we don't have the wires to solve this yet
                    }

                    solve(wire, prev & next);
                    solved++;
                    break;
                }

                if(part == 'OR'){
                    if(prev === null || next === null){
                        //console.log(`Missing either wire '${prev}' or '${next}' needed for ${wire}`);
                        break; //we don't have the wires to solve this yet
                    }

                    solve(wire, prev | next);
                    solved++;
                    break;
                }

                if(part == 'LSHIFT'){
                    if(prev === null){
                        //console.log(`Missing wire '${prev}' needed for ${wire}`);
                        break; //we don't have the wire to solve this
                    }

                    solve(wire, prev << next);
                    solved++;
                    break;
                }

                if(part == 'RSHIFT'){
                    if(prev === null){
                        //console.log(`Missing wire '${prev}' needed for ${wire}`);
                        break; //we don't have the wire to solve this
                    }

                    solve(wire, prev >>> next);
                    solved++;
                    break;
                }
            }
        }

        if(solved == 0){
            //this should never happen
            console.log(solvedWires);
            console.log(rawWires);
            throw new Error("Failed to solve ANY wires!");
        }

        keys = Object.keys(rawWires);
    }
}

const input = getPuzzleInput(__dirname);
input.forEach(processWire);

console.log(rawWires);

solveWires();

// const sortedKeys = Object.keys(solvedWires).sort();
// sortedKeys.forEach(k => console.log(`Wire ${k}: ${solvedWires[k]}`));

console.log("-------");
console.log();

console.log(solvedWires.a);

//retraceSolution();