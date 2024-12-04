import { arraysEqual, getPuzzleInput } from "../../utils";

const wordsearch = getPuzzleInput(__dirname);
let found = 0;

for (let y = 1; y < wordsearch.length - 1; y++) {
    for (let x = 1; x < wordsearch[y].length - 1; x++) {
        if (wordsearch[y][x] != "A") {
            continue
        }

        console.log(`Found 'A' at (${y}, ${x})`);
        const letters = [wordsearch[y - 1][x - 1], wordsearch[y - 1][x + 1], wordsearch[y + 1][x + 1], wordsearch[y + 1][x - 1]];
        
        if(!arraysEqual(letters.toSorted(), ['M', 'M', 'S', 'S'])){
            continue;
        }

        //we now know we have the 2 x M and 2 x S required, but are they in the correct configuration?
        //they need to be "next to" each other - either both horizontally or both vertically
        if(letters[0] == letters[2]){
            continue;
        }

        found++;
    }
}

console.log(found);