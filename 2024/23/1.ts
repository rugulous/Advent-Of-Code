import { getPuzzleInput } from "../../utils";

const input = getPuzzleInput(__dirname);
const connections: {[key: string]: string[]} = {};

for(const line of input){
    const [left, right] = line.split("-");

    if(!connections.hasOwnProperty(left)){
        connections[left] = [];
    }

    if(!connections.hasOwnProperty(right)){
        connections[right] = [];
    }

    connections[left].push(right);
    connections[right].push(left);
}

const groups = new Set<string>();

for(const key of Object.keys(connections)){
    for(const node of connections[key]){
        
        for(const leftNode of connections[key]){
            for(const rightNode of connections[node]){
                if(leftNode == rightNode){
                    const group = [key, node, leftNode].toSorted((a,b) => a.localeCompare(b)).join(",");
                    groups.add(group);
                }
            }
        }

    }
}

const matches = [...groups].reduce((acc, val) => acc + (val.split(",").some(x => x.startsWith("t")) ? 1 : 0), 0);
console.log(matches);