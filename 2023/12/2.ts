import { replaceAt, arraysEqual, countAllCharacters, getPuzzleInput } from "../../utils";


function parseLine(line: string){
    let [puzzle, rawSprings] = line.split(" ");
    let springs = rawSprings.split(",").map(n => parseInt(n));

    const origPuzzle = String(puzzle);
    const origSprings = [...springs];
    
    for(let i = 0; i < 4; i++){
        puzzle = puzzle + `?${origPuzzle}`;
        springs = springs.concat(...origSprings);
    }

    const res = generatePermutations(puzzle, springs);
    //console.log(res.length);
    return res.length;
}

function generatePermutations(line: string, targets: number[]){
    const firstQ = line.indexOf("?");
   // //console.log(line);
    ////console.log(firstQ);
    if(firstQ < 0){
        //console.log("No ?!");
        return line;
    }

    const viable = [];
    const hashed = replaceAt(line, firstQ, '#');
    const dotted = replaceAt(line, firstQ, ".");

    if(isPermutationViable(hashed, targets)){
        viable.push(generatePermutations(hashed, targets));
    }

    if(isPermutationViable(dotted, targets)){
        viable.push(generatePermutations(dotted, targets));
    }

    return viable.flat();
}

function checkMatch(solvedLine: string, targets: number[]){
    const clonedTargets = [...targets];
    let count = 0;
    let currentTarget = clonedTargets.shift();
    const counts = [];

    for(const char of solvedLine){
        if(char == '#'){
            count++;
        } else if(count > 0){
            if(count != currentTarget){
                return false;
            }

            counts.push(count);
            count = 0;
            currentTarget = clonedTargets.shift();
        }
    }

    if(count > 0){
        counts.push(count);
    }

    return arraysEqual(counts, targets);
}

function isPermutationViable(line: string, targets: number[]){
    const counts = countAllCharacters(line);

    if(!counts.hasOwnProperty('#')){
        counts['#'] = 0;
    }

    if(!counts.hasOwnProperty('?')){
        counts['?'] = 0;
    }

    const totalHashes = targets.reduce((acc, val) => acc + val, 0);
    const viable = counts['#'] <= totalHashes && (counts['#'] + counts['?'] >= totalHashes);
    const strict = counts['?'] == 0;

    if(!viable){
        //console.log(`${line} viable? ${viable}`);
        return false;
    }

    if(!strict){
        return true;
    }
    
    return checkMatch(line, targets);
    
    // let currCount = 0;
    // let potentialCount = 0;

    // const actuals = [];
    // let currTarget = clonedTargets.shift();
    // let currPos = 0;
    // let fullPotential = null;

    // for(const char of line){
    //     if(char == '#'){
    //         currCount++;
    //     } else if(char == '?'){
    //         potentialCount++;
    //     } else if(currCount + potentialCount > 0) {
    //         //here we could have many matches 
    //         //e.g. #?????????### could be 1, 1, 2, 1, 5 -  #.#.##..#####
    //         if(currCount + potentialCount < currTarget && currCount > 0){
    //             //console.log(`${currPos}: Not valid - not enough characters (${currCount} concrete + ${potentialCount} potential) to make the required string (${currTarget})`);
    //             return false;
    //         }

    //         if(currCount > 0){
    //             //console.log(`Pushing ${currCount + potentialCount} (${currCount} concrete)`);
    //             actuals.push(currCount + potentialCount);
    //             fullPotential = null;
    //         } else {
    //             //console.log(`Potentially ${potentialCount} dots!`);
    //             fullPotential = currTarget;
    //         }
            
    //         currTarget = clonedTargets.shift();
    //         currCount = 0;
    //         potentialCount = 0;
    //     }

    //     if(currCount > currTarget){
    //         if(!fullPotential || currCount > fullPotential){
    //             //console.log(`${currPos}: Not valid - concrete ${currCount} > ${currTarget}`);
    //             return false;
    //         }

    //         //hmm we shouldn't have skipped this one - means all of the ? must have been .
    //         //console.log(`Restoring potential`)
    //         clonedTargets.unshift(currTarget);
    //         currTarget = fullPotential;
    //     }

        // if(currCount + potentialCount > currTarget){
        //     if(char == "?"){ //could be a .
        //         //console.log(`${currPos}: overflow`);
        //         currCount = 0;
        //         potentialCount = 0;
        //         currTarget = clonedTargets.shift();
        //     } else {
        //         //console.log("This can't be a pattern");
        //         if(currCount > 0){
        //             return false;
        //         }

        //         potentialCount = 0;
        //     }
        // }
        
        /*if(currCount > 0 || potentialCount > 0) {
            if(currCount == 0 && potentialCount < currTarget){
                continue;
            }

            if(currCount > currTarget || currCount + potentialCount < currTarget){
                //console.log(`${currCount} > ${currTarget} or ${currCount + potentialCount} < ${currTarget}`);
                return false;
            } else if(strict && currCount != currTarget){
                //console.log(`STRICT MODE: ${currCount} != ${currTarget}`);
                return false;
            }

            actuals.push(currCount);
            currCount = 0;
            potentialCount = 0;
            currTarget = clonedTargets.shift();
        }*/

   //     currPos++;
    //}

    
    // if(strict){
    //     if(currCount > 0){
    //         actuals.push(currCount);
    //     }

    //     return arraysEqual(actuals, targets);
    // }

    //return true;
}

const input = getPuzzleInput(__dirname);
////console.log(parseLine(input[1]).length);
console.log(input.map(parseLine).reduce((acc, val) => acc + val, 0));