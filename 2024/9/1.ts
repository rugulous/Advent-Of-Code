import { getPuzzleInput } from "../../utils";

const input = getPuzzleInput(__dirname)[0];

//first, expand blocks
let memory: (number | ".")[] = [];
let isBlank = false;
let memoryId = 0;

for(const char of input){
    const amount = parseInt(char);

    for(let i = 0; i < amount; i++){
        memory.push(isBlank ? "." : memoryId);
    }

    isBlank = !isBlank;
    if(!isBlank){
        memoryId++;
    }
}

//then, swap out free/allocated memory
let swapEnd = memory.length - 1;
let swapStart = 0;

while(swapEnd > swapStart){
    if(memory[swapEnd] == "."){
        swapEnd--;
        continue;
    }

    for(swapStart; swapStart < swapEnd; swapStart++){
        if(memory[swapStart] == "."){
            memory[swapStart] = memory[swapEnd];
            memory[swapEnd] = ".";
            break;
        }
    }
}

//finally, calculate total
let total = 0;
for(let pos = 0; pos < memory.length; pos++){
    if(memory[pos] == "."){
        break;
    }

    total += pos * (memory[pos] as number);
}

console.log(total);