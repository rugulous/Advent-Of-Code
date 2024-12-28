import { getPuzzleInput } from "../../utils";

const input = getPuzzleInput(__dirname);

const keys = [];
const locks = [];
let curr = [];

let isLock = false;

function getHeights(item: string[][]){
    const heights = [];

    for(let x = 0; x < item[0].length; x++){
        let count = 0;

        for(let y = 0; y < item.length; y++){
            if(item[y][x] == "#"){
                count++;
            }
        }

        heights.push(count - 1);
    }

    return heights;
}

function areLockAndKeyCompatible(lock: number[], key: number[]){
    for(let i = 0; i < lock.length; i++){
        if(lock[i] + key[i] > 5){
            return false;
        }
    }

    return true;
}

for(const line of input){
    if(line.trim() == ""){
        if(curr[0][0] == "#"){
            locks.push(getHeights(curr));
        } else {
            keys.push(getHeights(curr));
        }

        curr = [];
        continue;
    }

    curr.push(line);
}

if(curr.length > 0){
    if(curr[0][0] == "#"){
        locks.push(getHeights(curr));
    } else {
        keys.push(getHeights(curr));
    }
}

let combinations = 0;
for(const key of keys){
    for(const lock of locks){
        if(areLockAndKeyCompatible(lock, key)){
            combinations++;
        }
    }
}

console.log(combinations);