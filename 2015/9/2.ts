import { ILooseObject } from "../../type";
import { getPuzzleInput, shuffle } from "../../utils";

const map: ILooseObject = {};

function solveWithRandomChance() {
    let highest = 0;
    let set = places;

    for (let i = 0; i < 1000000; i++) {
        set = shuffle(set);
        let score = 0;

        for (let i = 0; i < set.length - 1; i++) {
            score += map[set[i]][set[i + 1]];
        }

        if (score > highest) {
            highest = score;
        }

    }
    return highest;
}

function parseLine(line: string) {
    const [start, , end, , distanceStr] = line.split(" ");

    if (!map.hasOwnProperty(start)) {
        map[start] = {};
    }

    if (!map.hasOwnProperty(end)) {
        map[end] = {};
    }

    const distance = parseInt(distanceStr);
    map[start][end] = distance;
    map[end][start] = distance;
}

const input = getPuzzleInput(__dirname);
input.forEach(parseLine);
const places = Object.keys(map);
console.log(solveWithRandomChance());