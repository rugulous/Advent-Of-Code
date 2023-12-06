const {getPuzzleInput} = require("../utils");

function extractNumbers(line){
    return line.split(":")[1].trim().split(" ").filter(c => c.trim().length > 0).map(n => parseInt(n)); //cheeky multi-space splitting!
}

function translateInput(){
    const time = extractNumbers(input[0])
    const distance = extractNumbers(input[1]);
    const races = [];
    
    for(let i = 0; i < time.length; i++){
        races.push({
            time: time[i],
            distance: distance[i]
        });
    }

    return races;
}

function getMultiples(target, limit){
    let multiples = 0;

    for(let i = 1; i < limit; i++){
        const attempt = limit - i;
        const result = i * attempt;

        if(result > target){
            console.log(`${i} x ${attempt} = ${result} (target ${target})`);
            multiples++;
        }
    }

    console.log(multiples);
    return multiples;
}

const input = getPuzzleInput(__dirname, "example.txt");
const races = translateInput();

const result = races.reduce((acc, r) => acc * getMultiples(r.distance, r.time), 1);
console.log(result);