import { Coordinate, Direction } from "../../type";
import { allDirs, getPuzzleInput, isOutOfBounds, mirroredMoves, move } from "../../utils";

const map = getPuzzleInput(__dirname).map(line => line.split("").map(x => parseInt(x)));

function getAccessibleSummits(prevNum: number, position: Coordinate, foundMoves: Set<string>, prevDir: Direction = null){
    const currNum = map[position.y][position.x];

    if(currNum != prevNum + 1){
        return;
    }

    if(currNum == 9){
        foundMoves.add(`${position.x},${position.y}`);
        return;
    }

    const availableDirections = allDirs.filter(x => x != mirroredMoves[prevDir]);
    for(const dir of availableDirections){
        const newPos = move[dir](position.x, position.y);
        if(!isOutOfBounds(newPos, map)){
            getAccessibleSummits(currNum, newPos, foundMoves, dir);
        }
    }
}

let total = 0;
//find a 0, then spawn a recursive function looking for 9s
for(let y = 0; y < map.length; y++){
    for(let x = 0; x < map[y].length; x++){
        if(map[y][x] != 0){
            continue
        }

        const availableMoves = new Set<string>();
        getAccessibleSummits(-1, {x, y}, availableMoves);
        total += availableMoves.size;
    }
}

console.log(total);