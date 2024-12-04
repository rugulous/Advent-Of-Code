import { arraysEqual, getPuzzleInput } from "../../utils";

const wordsearch = getPuzzleInput(__dirname);
let found = 0;

for (let y = 1; y < wordsearch.length - 1; y++) {
    for (let x = 1; x < wordsearch[y].length - 1; x++) {
        if (wordsearch[y][x] != "A") {
            continue
        }

        console.log(`Found 'A' at (${y}, ${x})`);
        const diagonals = [
            wordsearch[y - 1][x - 1], //Top-Left
            wordsearch[y - 1][x + 1], //Top-Right
            wordsearch[y + 1][x + 1], //Bottom Right
            wordsearch[y + 1][x - 1]  //Bottom-Left
        ];

        if (
            arraysEqual(diagonals.toSorted((a, b) => a.localeCompare(b)), ['M', 'M', 'S', 'S']) && //do we have the required letters?
            diagonals[0] !== diagonals[2] //are they in the correct configuration?
        ) {
            found++;
        }
    }
}

console.log(found);