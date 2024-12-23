import { getPuzzleInput, getSubgraphs } from "../../utils";

const input = getPuzzleInput(__dirname);
const connections: {[key: string]: Set<string>} = {};

for(const line of input){
    const [left, right] = line.split("-");

    if(!connections.hasOwnProperty(left)){
        connections[left] = new Set<string>();
    }

    if(!connections.hasOwnProperty(right)){
        connections[right] = new Set<string>();
    }

    connections[left].add(right);
    connections[right].add(left);
}

const anArray: Set<string>[] = [];
getSubgraphs(new Set<string>(), new Set(Object.keys(connections)), new Set<string>(), connections, anArray);
anArray.sort((a, b) => b.size - a.size)
console.log([...anArray[0]].toSorted((a,b) => a.localeCompare(b)).join(","));