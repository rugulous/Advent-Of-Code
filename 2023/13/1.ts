import { arraysEqual, getPuzzleInput } from "../../utils";

function splitMaps(fullMap: string[]){
    const maps = [];
    let parts = [];

    for(const line of fullMap){
        if(line.length == 0){
            if(parts.length > 0){
                maps.push(parts);
                parts = [];
            }

            continue;
        }

        parts.push(line.split(""));
    }

    if(parts.length > 0){
        maps.push(parts);
    }

    return maps;
}

function hasVerticalReflection(map: string[][], column: number){
    for(let i = 0; i <= map[0].length / 2; i++){
        const srcCol = column - i;
        const destCol = column + i - 1;

        if(srcCol < 0 || destCol >= map[0].length){
            continue;
        }

        for(const element of map){
            if(element[srcCol] != element[destCol]){
                return false;
            }
        }
    }

    return true;
}

function hasHorizontalReflection(map: string[][], row: number){
    for(let i = 0; i <= map.length / 2; i++){
        const srcRow = row - i;
        const destRow = row + i - 1;

        if(srcRow < 0 || destRow >= map.length || srcRow == destRow){
            continue;
        }

        if(!arraysEqual(map[srcRow], map[destRow])){
            return false;
        }
    }

    return true;
}

const input = getPuzzleInput(__dirname, "example.txt");
const maps = splitMaps(input);

let score = 0;

for(const map of maps){
    for(let i = 0; i <= map[0].length; i++){
        if(hasVerticalReflection(map, i)){
            score += i;
            break;
        }
    
        if(hasHorizontalReflection(map, i)){
            score += (100 * i);
            break;
        }
    }
}

console.log(score);