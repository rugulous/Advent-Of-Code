import { ILooseObject } from '../../type';
import {getPuzzleInput} from '../../utils';

const nodes: ILooseObject = {};

function parseInput(line: string){
    const parts = line.split(" = ");
    const linkedNodes = parts[1].replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").split(",");
    nodes[parts[0].trim()] = linkedNodes;
}

function solve(){
    let currentNode = "AAA";
    let currMoves = 0;

    while(true){
        for(const direction of directions){
            currentNode = nodes[currentNode][direction];
            currMoves++;

            if(currentNode == "ZZZ"){
                return currMoves;
            }
        }
    }
}

const input = getPuzzleInput(__dirname);
const directions = input[0].split("").map(d => d == "L" ? 0 : 1);
input.splice(2).forEach(l => parseInput(l));

const requiredMoves = solve();
console.log(requiredMoves);