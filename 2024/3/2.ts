import { getPuzzleInput } from "../../utils";

const regex = /mul\((\d*),(\d*)\)/g

let memory = getPuzzleInput(__dirname).join("");

//preprocess so we only get the enabled chunks
//we are enabled from the start so need to find the next don't()
while(true){
    const disablePos = memory.indexOf("don't()");
    if(disablePos == -1){
        break;
    }

    const enablePos = memory.indexOf("do()", disablePos);
    if(enablePos == -1){
        memory = memory.substring(0, disablePos);
        break;
    }

    memory = memory.substring(0, disablePos) + memory.substring(enablePos + 4);
}

let total = 0;

let match: RegExpExecArray | null;
while(match = regex.exec(memory)){
    //console.log(match);
    total += (parseInt(match[1]) * parseInt(match[2]));;
}

console.log(total);