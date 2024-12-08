import { getPuzzleInput, grid, isOutOfBounds } from "../../utils";

const input = getPuzzleInput(__dirname);
const antinodes = grid(input.length, false, input[0].length);

const foundLetters = {};

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == ".") {
            continue;
        }

        const char = input[y][x];

        if (!foundLetters.hasOwnProperty(char)) {
            foundLetters[char] = [];
        }

        foundLetters[char].push({ x, y });
    }
}

Object.keys(foundLetters).forEach(k => {
    const occurrences = foundLetters[k];
    for (let i = 0; i < occurrences.length; i++) {
        for (let ii = i + 1; ii < occurrences.length; ii++) {
            const route = { x: occurrences[ii].x - occurrences[i].x, y: occurrences[ii].y - occurrences[i].y };
            const max = { x: occurrences[ii].x + route.x, y: occurrences[ii].y + route.y };
            const min = { x: occurrences[i].x - route.x, y: occurrences[i].y - route.y };

            if (!isOutOfBounds(max, antinodes)) {
                antinodes[max.y][max.x] = true;
            }

            if (!isOutOfBounds(min, antinodes)) {
                antinodes[min.y][min.x] = true;
            }

        }
    }
});

if (true) {
    for (let y = 0; y < input.length; y++) {
        let line = "";
        for (let x = 0; x < input[y].length; x++) {
            if (antinodes[y][x]) {
                line += "#";
            } else {
                line += input[y][x];
            }
        }
        console.log(line);
    }

    console.log(antinodes.flat().filter(x => x).length);
}