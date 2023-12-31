import { Coordinate } from "../../type";
import { allDirs, getPuzzleInput, grid, isOutOfBounds, move } from "../../utils";

function coordsToMap(coords: Coordinate[]): [{ [key: number]: { [key: number]: number } }, number] {
    let unique = 0;

    const visited = {};
    for (const c of coords) {
        if (!visited.hasOwnProperty(c.y)) {
            visited[c.y] = {};
        }

        if (!visited[c.y].hasOwnProperty(c.x)) {
            visited[c.y][c.x] = 0;
            unique++;
        }

        visited[c.y][c.x]++;
    }

    return [visited, unique];
}

function output(map: boolean[][], coords: Coordinate[]) {
    const [visited, unique] = coordsToMap(coords);

    for (let y = 0; y < map.length; y++) {
        console.log(map[y].map((v, x) => {
            if (visited.hasOwnProperty(y) && visited[y][x]) {
                return "O";
            }

            return v ? "#" : ".";
        }).join(""));
    }

    console.log();
    console.log(`Unique: ${unique}`);
    console.log();
}

function parseInput(input: string[]): [Coordinate | null, boolean[][]] {
    let startPos: Coordinate | null = null;
    const map = grid(input[0].length, false, input.length);

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] == "S") {
                startPos = { x, y };
            }

            map[y][x] = (input[y][x] == "#");
        }
    }

    return [startPos, map];
}

function doStep(map: boolean[][], pos: Coordinate) {
    const possibleMoves = [];

    for (const direction of allDirs) {
        const newCoords = move[direction](pos.x, pos.y);
        if (!isOutOfBounds(newCoords, map) && !map[newCoords.y][newCoords.x]) {
            possibleMoves.push(newCoords);
        }
    }

    return possibleMoves;
}

function calculateAllSteps(map: boolean[][], currentPositions: Coordinate[]){
    const startingPositions = currentPositions.length;

    for(let i = 0; i < startingPositions; i++){
        const coord = currentPositions.shift();
        const results = doStep(map, coord);

        for(const res of results){
        if(!currentPositions.some(p => p.x == res.x && p.y == res.y))
        
        currentPositions.push(res);
        }
    }
}

const [start, map] = parseInput(getPuzzleInput(__dirname));
const coords = [start];

for(let i = 0; i < 64; i++){
    //output(map, coords);
    calculateAllSteps(map, coords);
}

output(map, coords);
