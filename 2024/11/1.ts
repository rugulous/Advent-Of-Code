import { getPuzzleInput } from "../../utils";

const rules: {
    applies: (num: number) => boolean,
    execute: (num: number) => number[]
}[] = [
        {
            applies: (num) => num == 0,
            execute: (_) => [1]
        }, {
            applies: (num) => num.toString().length % 2 == 0,
            execute: (num) => {
                const numStr = num.toString();
                const mid = numStr.length / 2;
                return [parseInt(numStr.substring(0, mid)), parseInt(numStr.substring(mid))]
            }
        }, {
            applies: (_) => true,
            execute: (num) => [num * 2024]
        }
    ]

let input = getPuzzleInput(__dirname)[0].split(" ").map(x => parseInt(x));

for (let i = 0; i < 25; i++) {
    let results = [];
    //console.log(`Iteration ${i}`);

    for (const num of input) {
        //console.log(`Found ${num}`);

        for (const rule of rules) {
            if (!rule.applies(num)) {
                continue;
            }

            const output = rule.execute(num);
            //console.log('Rule execution yields ', output)
            results.push(...output);
            break;
        }
    }

    input = results;
    //console.log(`Input is now ${input.length} long`);
}

console.log(input.length);