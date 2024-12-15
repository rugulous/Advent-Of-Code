import { Direction } from "../../type";
import { getPuzzleInput, mirroredMoves, move } from "../../utils";

const dirMap: Record<string, Direction> = {
    "^": "UP",
    ">": "RIGHT",
    "v": "DOWN",
    "<": "LEFT"
};

const input = getPuzzleInput(__dirname);
let robot = {x: -1, y: -1};
let mapCutoff = -1;

//find the blank separator line and also initialise the robot
for(let y = 0; y < input.length; y++){
    if(input[y].trim() == ""){
        mapCutoff = y;
        break;
    }

    for(let x = 0; x < input[y].length; x++){
        if(input[y][x] == "@"){
            robot = {x, y};
        }
    }
}

const map = input.slice(0, mapCutoff).map(line => line.split(""));
map[robot.y][robot.x] = "."; //as we're tracking the robot separately, don't display the @ too
const directions = input.slice(mapCutoff + 1).join("").split(""); //put multiline on one line and split by chars

for(const rawDir of directions){
    const dir = dirMap[rawDir];

    const targetMove = move[dir](robot.x, robot.y);
    let chosenCell = map[targetMove.y][targetMove.x];

    if(chosenCell == "#"){
        //wall, denied
        continue;
    } else if(chosenCell == "O"){
        //there's a crate there. let's keep checking until we find something
        let nextCell = {...targetMove};
        let cellValue = null;

        while(true){
            nextCell = move[dir](nextCell.x, nextCell.y);
            cellValue = map[nextCell.y][nextCell.x];

            if(cellValue == "." || cellValue == "#"){
                break;
            }
        }

        if(cellValue == "#"){
            continue; //can't move
        }

        const reverseDir = mirroredMoves[dir];
        
        while(nextCell.y != targetMove.y || nextCell.x != targetMove.x){
            map[nextCell.y][nextCell.x] = "O";
            nextCell = move[reverseDir](nextCell.x, nextCell.y);
        }

        map[targetMove.y][targetMove.x] = ".";
    }

    robot = targetMove;
}

let total = 0;
for(let y = 0; y < map.length; y++){
    let line = "";

    for(let x = 0; x < map[y].length; x++){
        if(y == robot.y && x == robot.x){
            line += "@";
        } else {
            line += map[y][x];

            if(map[y][x] == "O"){
                total += (y * 100) + x;
            }
        }
    }

    console.log(line);
}

console.log(total);