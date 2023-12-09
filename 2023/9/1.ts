import { arrayHasSameValue, getPuzzleInput } from "../../utils";

function getDifferenceBetweenSequence(sequence: number[]){
    const differences = [];
    for(let i = 1; i < sequence.length; i++){
        differences.push(sequence[i] - sequence[i - 1]);
    }

    return differences;
}

function getNextValueForSequence(sequence: number[]){
    let differences = getDifferenceBetweenSequence(sequence);
    const numToAdd = arrayHasSameValue(differences) ? differences[0] : getNextValueForSequence(differences);
    return sequence[sequence.length - 1] + numToAdd;
}

const input = getPuzzleInput(__dirname, "example.txt").map(line => line.split(" ").map(n => parseInt(n)));
console.log(input.reduce((acc, val) => acc + getNextValueForSequence(val), 0));