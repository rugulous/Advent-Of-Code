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

    if(arrayHasSameValue(differences)){
        return sequence[sequence.length - 1] + differences[0];
    }
}

const input = getPuzzleInput(__dirname, "example.txt").map(line => line.split(" ").map(n => parseInt(n)));
console.log(getNextValueForSequence(input[0]));