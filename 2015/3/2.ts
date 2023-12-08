import { ILooseObject } from "../../type";
import { getPuzzleInput } from "../../utils";

const input = getPuzzleInput(__dirname)[0];

const santas = [{
    x: 0,
    y: 0
}, {
    x: 0,
    y: 0
}];

const visits: ILooseObject = {
    0: {
        0: 1
    }
};

let isSanta = true;
for(const char of input){
    const pos = santas[+isSanta];

    if(char == "^"){
        pos.y++;
    } else if(char == "v"){
        pos.y--;
    } else if(char == ">"){
        pos.x++;
    } else if(char == "<"){
        pos.x--;
    }

    if(!visits.hasOwnProperty(pos.x)){
        visits[pos.x] = {};
    } 

    if(!visits[pos.x].hasOwnProperty(pos.y)){
        visits[pos.x][pos.y] = 0;
    }

    isSanta = !isSanta;
}

console.log(visits);
const totalVisits = Object.keys(visits).reduce((acc: number, val: string) => acc + Object.keys(visits[val]).length, 0);
console.log(totalVisits);