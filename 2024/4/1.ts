import { getPuzzleInput } from "../../utils";

const wordsearch = getPuzzleInput(__dirname);

const TARGET_WORD = "MAS"; //remove the "X" because we're explicitly finding all of those
const SEARCH_DIRECTIONS = [
    [0, 1],   // forward
    [0, -1],  // backward
    [-1, 0],  // up
    [1, 0],   // down
    [-1, -1], // diag-l-up
    [1, -1],  // diag-l-down
    [1, 1],   // diag-r-down
    [-1, 1],  // diag-r-up
]

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

        for(const [moveX, moveY] of SEARCH_DIRECTIONS){
            const maxX = x + (moveX * 3);
            const maxY = y + (moveY * 3);

            if(maxY < 0 || maxY >= wordsearch.length || maxX < 0 || maxX >= wordsearch[y].length){
                continue;
            }

            const letters = [];
            for(let i = 1; i < 4; i++){
                letters.push(wordsearch[y + (moveY * i)][x + (moveX * i)]);
            }

            if(doesSpellWord(...letters)){
                found++;
            }
        }
    }
}

console.log(found);