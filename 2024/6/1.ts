import { Coordinate, Direction } from "../../type";
import { getPuzzleInput, grid, isOutOfBounds, move, rotatedMoves } from "../../utils";

const input = getPuzzleInput(__dirname);

const map = grid(input[0].length, true, input.length);
const visited = grid(input[0].length, false, input.length);

let guardPos: Coordinate = {x: -1, y: -1};
let direction: Direction = "UP";

for(let y = 0; y < input.length; y++){
    for(let x = 0; x < input[y].length; x++){
        if(input[y][x] == '#'){
            map[y][x] = false;
        } else if (input[y][x] == '^'){
            guardPos.x = x;
            guardPos.y = y;
            visited[y][x] = true;
        }
    }
}

while(true){
    const targetPos = move[direction](guardPos.x, guardPos.y);

    if(isOutOfBounds(targetPos, map)){
        break;
    }

    if(!map[targetPos.y][targetPos.x]){
        direction = rotatedMoves[direction];
        continue;
    }

    guardPos = targetPos;
    visited[guardPos.y][guardPos.x] = true;
}

const total = visited.flat().filter(x => x).length;
console.log(total);
