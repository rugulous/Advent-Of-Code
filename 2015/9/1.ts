import { ILooseObject } from "../../type";
import { getPuzzleInput } from "../../utils";

const map: ILooseObject = {};

function getShortestNotVisited(currNode: string, visited: string[]){
    let lowest = null;

    for(const key of Object.keys(map[currNode])){
        if(visited.includes(key)){
            continue;
        }

        if(lowest == null || map[currNode][key] < lowest.distance){
            lowest = {
                label: key,
                distance: map[currNode][key]
            }
        }
    }

    return lowest;
}

function getRoute(start: string){
    let currNode = start;
    const visited = [currNode];
    let distance = 0;

    while(true){
        const closest = getShortestNotVisited(currNode, visited);
        if(closest == null){
            //hopefully we're done lol
            if(visited.length)

            return distance;
        }

        distance += closest.distance;
        currNode = closest.label;
        visited.push(closest.label);
    }
}

function parseLine(line: string){
    const [start, , end, , distanceStr] = line.split(" ");

    if(!map.hasOwnProperty(start)){
        map[start] = {};
    }

    if(!map.hasOwnProperty(end)){
        map[end] = {};
    }

    const distance = parseInt(distanceStr);
    map[start][end] = distance;
    map[end][start] = distance;
}

getPuzzleInput(__dirname).forEach(parseLine);
console.log(Math.min(...Object.keys(map).map(getRoute)));