import { getPuzzleInput } from "../../utils";

type LensData = {
    label: string,
    length: number | null
};

function hash(string: string){
    let value = 0;

    for(const char of string){
        const ascii = char.charCodeAt(0);
        value += ascii;
        value *= 17;
        value %= 256;
    }

    return value;
}

function getLensInfo(instruction: string): LensData{
    if(instruction.indexOf("=") > 0){
        const parts = instruction.split("=");
        return {
            label: parts[0],
            length: parseInt(parts[1])
        }
    }

    return {
        label: instruction.substring(0, instruction.length - 1),
        length: null
    };
}

function removeLens(box: number, label: string, replacmentFocalLength?: number): boolean{
    const pos = hashmap[box]?.findIndex((a: LensData) => a.label == label);
    if(pos < 0){
        return false;
    }

    if(replacmentFocalLength){
        hashmap[box].splice(pos, 1, {
            label,
            length: replacmentFocalLength
        });
    } else {
        hashmap[box].splice(pos, 1);
    }

    return true;
}

function addLens(box: number, lens: LensData): void{
    if(!hashmap[box]){
        hashmap[box] = [lens];
        return;
    }

    if(removeLens(box, lens.label, lens.length)){
        return;
    }

    hashmap[box].push(lens);
}

function processLens(instruction: string): void{
    const lens = getLensInfo(instruction);
    const box = hash(lens.label);
    
    if(!lens.length){
        removeLens(box, lens.label);
        return;
    }

    addLens(box, lens);
}

function getLensPower(): number{
    let total = 0;
    const keys = Object.keys(hashmap);

    for(const key of keys){
        if(hashmap[key].length == 0){
            continue;
        }

        const boxScore = parseInt(key) + 1;
        for(let i = 0; i < hashmap[key].length; i++){
            total += boxScore * (i + 1) * hashmap[key][i].length;
        }
    }

    return total;
}

const input = getPuzzleInput(__dirname, "example.txt")[0].split(",");
const hashmap: {[key: number]: LensData[]} = {};

input.forEach(processLens);
console.log(getLensPower());