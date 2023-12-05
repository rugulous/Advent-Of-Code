const { getPuzzleInput } = require("../utils");

function extractNumbers(line){
    const nums = [];
    const strings = line.split(" ");
    for(const string of strings){
        const result = parseInt(string);
        if(!isNaN(result)){
            nums.push(result);
        }
    }

    return nums;
}

function parseLine(line){
    let [winning, yours] = line.split(":")[1].split("|");
    winning = extractNumbers(winning);
    yours = extractNumbers(yours);

    let matches = 0;

    for(const num of yours){
        if(winning.includes(num)){
            matches++;
        }
    }

    if(matches === 0){
        return 0;
    }
    
    return Math.pow(2, matches - 1);
}

const total = getPuzzleInput(__dirname).reduce((acc, val) => acc += parseLine(val), 0);
console.log(total);
