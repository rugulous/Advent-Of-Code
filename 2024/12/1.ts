import { Coordinate } from "../../type";
import { allDirs, getPuzzleInput, isOutOfBounds, move } from "../../utils";

const input = getPuzzleInput(__dirname).map(row => row.split(""));
const patches = [];

function getAllTouchingofType(type: string, currPos: Coordinate, found: Coordinate[] = []){
    if(isOutOfBounds(currPos, input) || input[currPos.y][currPos.x] != type){
        return found;
    }

    found.push(currPos);
    input[currPos.y][currPos.x] = null;
    
    for(const dir of allDirs){
        getAllTouchingofType(type, move[dir](currPos.x, currPos.y), found);
    }

    return found;
}

for(let y = 0; y < input.length; y++){
    for(let x = 0; x < input[y].length; x++){
        const char = input[y][x];
        if(char != null){
            patches.push(getAllTouchingofType(char, {x,y}));
        }
    }
}

//console.log(patches);

let total = 0;
for(const patch of patches){
    const area = patch.length;
    let perimeter = 0;


        for(const pos of patch){
            let sides = 4;

            for(const check of patch){
                if(check.x == pos.x){
                    if(check.y == pos.y - 1){
                        sides -= 1;
                    } else if(check.y == pos.y + 1){
                        sides -= 1;
                    }
                } else if(check.y == pos.y){
                    if(check.x == pos.x - 1){
                        sides -= 1;
                    } else if(check.x == pos.x + 1){
                        sides -= 1;
                    }
                }
            }

            perimeter += sides;
        }
    
        const price = area * perimeter;
    total += price
}

console.log(total);