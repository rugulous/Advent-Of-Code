import { getPuzzleInput } from "../../utils";
import { IRace } from "./type";

function extractNumbers(line: string){
    return [parseInt(line.split(":")[1].replaceAll(" ", ""))];
}

function translateInput(){
    const time = extractNumbers(input[0])
    const distance = extractNumbers(input[1]);
    const races: IRace[] = [];
    
    for(let i = 0; i < time.length; i++){
        races.push({
            time: time[i],
            distance: distance[i]
        });
    }

    return races;
}

function getMultiples(target: number, limit: number){
    let multiples = 0;

    for(let i = 1; i < limit; i++){
        const attempt = limit - i;
        const result = i * attempt;

        if(result > target){
            console.log(`${i} x ${attempt} = ${result} (target ${target})`);
            return (limit + 1) - (i * 2);
        }
    }

    console.log(multiples);
    return multiples;
}

const input = getPuzzleInput(__dirname);
const races = translateInput();

const result = races.reduce((acc, r) => acc * getMultiples(r.distance, r.time), 1);
console.log(result);