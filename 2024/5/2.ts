import { getPuzzleInput } from "../../utils";

class Rule {
    before: number;
    after: number;

    constructor(before: number, after: number){
        this.before = before;
        this.after = after;
    }

    validate(arr: number[]){
        const beforeIndex = arr.indexOf(this.before);
        const afterIndex = arr.indexOf(this.after);

        if(beforeIndex == -1 || afterIndex == -1){
            return null;
        }

        return beforeIndex < afterIndex;
    }

    repair(arr: number[]){
        const beforeIndex = arr.indexOf(this.before);
        const afterIndex = arr.indexOf(this.after);

        if(beforeIndex > afterIndex){
            arr.splice(beforeIndex, 0, arr.splice(afterIndex, 1)[0]);
        }
    }
};

function parseInput(input: string[]){
    const rules: Rule[] = [];
    const toCheck: number[][] = [];

    let firstStage = true;
    for(const line of input){
        if(line == ""){
            firstStage = false;
            continue;
        }

        if(firstStage){
            const [page, before] = line.split("|").map(x => parseInt(x));
            rules.push(new Rule(page, before));
        } else {
            toCheck.push(line.split(",").map(x => parseInt(x)));
        }
    }

    return {rules, toCheck}
}

const input = getPuzzleInput(__dirname);
const {rules, toCheck} = parseInput(input);

const invalid = toCheck.filter(arr => rules.some(rule => rule.validate(arr) === false));

do {
for(const datum of invalid){
    for(const rule of rules){
        if(rule.validate(datum) !== false){
            continue;
        }

        rule.repair(datum);
        break;
    }
}
} while(invalid.some(arr => rules.some(rule => rule.validate(arr) === false)));

let total = 0;
for(const arr of invalid){
    total += arr[Math.floor(arr.length / 2)];
}

console.log(total);