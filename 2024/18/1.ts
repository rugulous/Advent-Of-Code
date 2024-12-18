import { Coordinate } from "../../type";
import { allDirs, getPuzzleInput, grid, isOutOfBounds, move } from "../../utils";

class NodePos {
    coordinate: Coordinate;
    distance: number;

    constructor(coord: Coordinate, dist: number){
        this.coordinate = coord;
        this.distance = dist;
    }
}

const TARGET_SIZE = 71; //grid goes from 0-70, so 71 total
const NUM_TO_PROCESS = 1024;

const destination = {
    x: TARGET_SIZE - 1,
    y: TARGET_SIZE - 1
}

function findShortestPath(startPos: Coordinate){
    const queue = [new NodePos(startPos, 0)];

    while(queue.length > 0){
        const curr = queue.shift();

        if(curr.coordinate.x == destination.x && curr.coordinate.y == destination.y){
            return curr.distance;
        }

        for(const dir of allDirs){
            const pos = move[dir](curr.coordinate.x, curr.coordinate.y);

            if(!isOutOfBounds(pos, map) && map[pos.y][pos.x] && !visited[pos.y][pos.x]){
                visited[pos.y][pos.x] = true;
                queue.push(new NodePos(pos, curr.distance + 1));
            }
        }
    }

    return -1;
}

const map = grid(TARGET_SIZE, true, TARGET_SIZE);
const visited = grid(TARGET_SIZE, false, TARGET_SIZE);

getPuzzleInput(__dirname).slice(0, NUM_TO_PROCESS).forEach(line => {
    const [x, y] = line.split(",").map(x => parseInt(x))
    map[y][x] = false;
});


const minDist = findShortestPath({x: 0, y: 0}); //start at top left corner and work to bottom right
console.log(minDist);