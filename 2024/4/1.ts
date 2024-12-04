import { getPuzzleInput } from "../../utils";

const wordsearch = getPuzzleInput(__dirname);

const TARGET_WORD = "MAS"; //remove the "X" because we're explicitly finding all of those

function doesSpellWord(...letters: string[]) {
    return letters.join("") == TARGET_WORD;
}

let found = 0;

for (let y = 0; y < wordsearch.length; y++) {
    for (let x = 0; x < wordsearch[y].length; x++) {
        if (wordsearch[y][x] != "X") {
            continue
        }

        console.log(`Found 'X' at (${y}, ${x})`);

        if (x < wordsearch[y].length - 3) {
            //forward
            if (doesSpellWord(wordsearch[y][x + 1], wordsearch[y][x + 2], wordsearch[y][x + 3])) {
                found++;
            }
        }

        if (x >= 3) {
            //backward
            if (doesSpellWord(wordsearch[y][x - 1], wordsearch[y][x - 2], wordsearch[y][x - 3])) {
                found++;
            }
        }

        if (y >= 3) {
            //up
            if (doesSpellWord(wordsearch[y - 1][x], wordsearch[y - 2][x], wordsearch[y - 3][x])) {
                found++;
            }
        }

        if (y < wordsearch.length - 3) {
            //down
            if (doesSpellWord(wordsearch[y + 1][x], wordsearch[y + 2][x], wordsearch[y + 3][x])) {
                found++;
            }
        }

        if (x >= 3 && y >= 3) {
            //diag-l-up
            if (doesSpellWord(wordsearch[y - 1][x - 1], wordsearch[y - 2][x - 2], wordsearch[y - 3][x - 3])) {
                found++;
            }
        }

        if (x >= 3 && y < wordsearch.length - 3) {
            //diag-l-down
            if (doesSpellWord(wordsearch[y + 1][x - 1], wordsearch[y + 2][x - 2], wordsearch[y + 3][x - 3])) {
                found++;
            }
        }

        if (x < wordsearch[y].length - 3 && y < wordsearch.length - 3) {
            //diag-r-down
            if (doesSpellWord(wordsearch[y + 1][x + 1], wordsearch[y + 2][x + 2], wordsearch[y + 3][x + 3])) {
                found++;
            }
        }

        if (y >= 3 && x < wordsearch.length - 3) {
            //diag-r-up
            if (doesSpellWord(wordsearch[y - 1][x + 1], wordsearch[y - 2][x + 2], wordsearch[y - 3][x + 3])) {
                found++;
            }
        }
    }
}

console.log(found);