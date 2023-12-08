import { countAllCharacters } from "../../utils";

function sayWhatYouSee(value: string){
    let curr = null;
    let output = "";

    for(const char of value){
        if(char != curr?.char){
            if(curr != null){
                output += curr.count.toString() + curr.char;
            }

            curr = {
                char,
                count: 0
            };
        }

        curr.count++;
    }

    if(curr != null){
        output += curr.count.toString() + curr.char;
    }

    return output;
}

const startingValue = "3113322113";
let currVal = startingValue;

for(let i = 0; i < 40; i++){
    currVal = sayWhatYouSee(currVal);
    console.log(currVal);
}

console.log(currVal.length);