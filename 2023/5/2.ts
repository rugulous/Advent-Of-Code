import {getPuzzleInput} from "../../utils";

interface IRange {
    start: number,
    end: number
};

let currMap: string | null = null;
let allMap: {[key: string]: {[key: string]: number[]}} = {};

const order = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity'].reverse();

const sortedKeys: {[key: string]: number[]} = {};
let maxSize = -1;

//removing all but essential logging speeds this up dramatically!
const _log = console.log;
console.log = () => {};

function expandSeeds(line: string): IRange[]{
    const seeds: IRange[] = [];
    const segments = line.split(":")[1].trim().split(" ").map(s => parseInt(s));

    for(let i = 0; i < segments.length; i += 2){
        seeds.push({
            start: segments[i],
            end: segments[i] + segments[i + 1]
        });
    }

    return seeds.sort((a,b) => a.start - b.start);
}

function processNewMap(line: string) {
    if(currMap != null){
        sortedKeys[currMap] = Object.keys(allMap[currMap]).map(v => parseInt(v)).sort((a,b) => a - b);
    }

    currMap = line.split(" ")[0].split("-")[0].trim();

    if(!currMap){
        return;
    }

    allMap[currMap] = {};
}

function processLine(line: string) {
    if(line == ""){
        return;
    }

    if (line.indexOf("map") > 0) {
        processNewMap(line);
        return;
    }

    const parts = line.split(" ").map(num => parseInt(num));
    buildMap(parts);
}

function buildMap(parts: number[]){
    const newMax = Math.max(parts[0], parts[1]) + parts[2];
    if(newMax > maxSize){
        maxSize = newMax;
    }

    if(!currMap){
        return;
    }

    allMap[currMap][parts[0]] = [parts[1], parts[2]];
}

function tryGetMapValue(map: string, val: number){
    console.log(`Mapping ${map} ${val}...`);

    if(!allMap[map].hasOwnProperty(val)){
        console.log("Not in map!");
        let closestKey: number | null = null;
        for(const key of sortedKeys[map]){
            if(key > val){
                break;
            }

            closestKey = key;
        }

        if(closestKey === null){
            console.log("No closest key");
            return val;
        }

        const relevantEntry = allMap[map][closestKey];
        console.log(`Closest key: ${closestKey}`);
        console.log(`Distance from key: ${val} - ${closestKey} = ${val - closestKey}`);
        console.log(relevantEntry);

        if(relevantEntry && (val >= closestKey && val <= closestKey + relevantEntry[1])){
            console.log(`${val} in bounds`);
            return (val - closestKey) + relevantEntry[0];
        }

        console.log(`${val} out of bounds`);
        return val;
    }

    return allMap[map][val][0];
}

function getSeedAtLocation(location: number){
    console.log(`Starting location ${location}`);
    let index = location;

    for(const key of order){
        index = tryGetMapValue(key, index);
        console.log();
        console.log(`New index: ${index}`);
    }

    console.log(`Final value: ${index}`);
    if(matchesSeed(index)){
        console.log(`${index} is a seed!`);
        return location;
    }

    return null;
}

function matchesSeed(location: number){
    for(const seed of seeds){
        if(seed.start > location){
            return false;
        }

        if(seed.start < location && seed.end > location){
            return true;
        }
    }

    return false;
}

const input = getPuzzleInput(__dirname); //, "example.txt");

input.slice(1).forEach(processLine);
processNewMap(""); //make sure we sort the final map too!

const seeds = expandSeeds(input[0]);

for(let i = 0; i < maxSize; i++){
    if(getSeedAtLocation(i) != null){
        _log(`Lowest location: ${i}`);
        break;
    }
}
