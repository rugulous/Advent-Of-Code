import { Coordinate, Direction } from "../../type";
import { getPuzzleInput, grid, move, sleep } from "../../utils";

async function travel(position: Coordinate, direction: Direction){
    const mirror1: Record<Direction, Direction> = {"DOWN": "LEFT", "RIGHT": "UP", "UP": "RIGHT", "LEFT": "DOWN"};
    const mirror2: Record<Direction, Direction> = {"DOWN": "RIGHT", "RIGHT": "DOWN", "UP": "LEFT", "LEFT": "UP"};
    const prevPosition = {...position};
    let timeSinceEnergised = 0;

    while(true){
        if(!energized[position.y][position.x]){
            energized[position.y][position.x] = true;
        } else {
            timeSinceEnergised++;
        }

        if(timeSinceEnergised >= 5){
            break;
        }

        position = move[direction](position.x, position.y);

        if((position.x < 0 || position.x >= input[0].length) || (position.y < 0 || position.y >= input.length) || (position.x == prevPosition.x && position.y == prevPosition.y)){
            //we fell off the map :(
            break;
        }
        
        const tile = input[position.y][position.x];
        if(tile == "."){
            continue;
        }

        if(tile == "/"){
            console.log(`Hitting ${tile} from ${direction}`);
            direction = mirror1[direction];
            console.log(`New direction: ${direction}`);
            continue
        }

        if(tile == "\\"){
            direction = mirror2[direction];
            continue;
        }

        if(tile == "-"){
            if(['LEFT', 'RIGHT'].includes(direction)){
                continue;
            }

            travel(position, "LEFT");
            travel(position, "RIGHT");
            break;
        }

        if(tile == "|"){
            if(['UP', 'DOWN'].includes(direction)){
                continue;
            }

            travel(position, "UP");
            travel(position, "DOWN");
            break;
        }

        throw new Error(`Unsure how to deal with ${tile}`);
    }
}

function outputEnergised(){
    for(const line of energized){
        let str = "";

        for(const bit of line){
            str += (bit ? "#" : ".");
        }

        console.log(str);
    }
}

const input = getPuzzleInput(__dirname, "example.txt");
const energized = grid(input[0].length, false, input.length);

travel({x: 0, y: 0}, "RIGHT");

outputEnergised();
console.log(energized.reduce((acc, val) => acc + val.reduce((a, v) => a + (+v), 0), 0));