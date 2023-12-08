import { ILooseObject } from '../type';
import { getPuzzleInput } from '../utils';

const nodes: ILooseObject = {};

function parseInput(line: string) {
    const parts = line.split(" = ");
    const linkedNodes = parts[1].replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").split(",");
    nodes[parts[0].trim()] = linkedNodes;
}

function getStartingNodes() {
    return Object.keys(nodes).filter(k => k[2] == "A");
}

function solve() {
    let numMoves = 0;
    const locations = getStartingNodes();

    while (true) {
        for (const dir of directions) {
            for (let i = 0; i < locations.length; i++) {
                locations[i] = nodes[locations[i]][dir]
            }

            numMoves++;

            if(checkAllSolved(locations)){
                return numMoves;
            }
        }
    }
}

function checkAllSolved(locations: string[]){
    return locations.length == locations.filter(k => k[2] == "Z").length;
}

const input = getPuzzleInput(__dirname, "example-2.txt");
const directions = input[0].split("").map(d => d == "L" ? 0 : 1);
input.splice(2).forEach(l => parseInput(l));

const requiredMoves = solve();
console.log(requiredMoves);