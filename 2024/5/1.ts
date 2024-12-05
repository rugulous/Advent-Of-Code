import { getPuzzleInput } from "../../utils";

function parseInput(input: string[]){
    const rules: ((x: number[]) => boolean | null)[] = [];
    const toCheck: number[][] = [];

    let firstStage = true;
    for(const line of input){
        if(line == ""){
            firstStage = false;
            continue;
        }

        if(firstStage){
            const [page, before] = line.split("|").map(x => parseInt(x));
            rules.push((x: number[]) => {
                const pageIndex = x.indexOf(page);
                const afterIndex = x.indexOf(before);

                if(pageIndex == -1 || afterIndex == -1){
                    return null;
                }

                return x.indexOf(page) < x.indexOf(before);
            });
        } else {
            toCheck.push(line.split(",").map(x => parseInt(x)));
        }
    }

    return {rules, toCheck}
}

const input = getPuzzleInput(__dirname);
const {rules, toCheck} = parseInput(input);

const valid = toCheck.filter(arr => !rules.some(fn => fn(arr) === false));

let total = 0;
for(const arr of valid){
    total += arr[Math.floor(arr.length / 2)];
}

console.log(total);