import { getPermutations, getPuzzleInput } from "../../utils";

function parseInput(input: string[]){
    const regex = /(.*) would (gain|lose) (\d*) happiness units by sitting next to (.*)./
    const people: {[key: string]: {}} = {};

    for(const line of input){
        const match = regex.exec(line);
        if(!match){
            continue;
        }

        const [_, person, action, value, neighbour] = match;

        if(!people.hasOwnProperty(person)){
            people[person] = {};
        }

        people[person][neighbour] = (action == "gain" ? 1 : -1) * parseInt(value);
    }

    return people;
}

const people = parseInput(getPuzzleInput(__dirname));

const permutations = getPermutations(Object.keys(people)).map(arr => {
    let score = 0;
    for(let i = 0; i < arr.length; i++){
        const left = arr[i];
        const right = arr[(i + 1) % arr.length]; //mod allows circular arrangement
        score += people[left][right] + people[right][left];
    }
    
    return {
        score,
        arr
    }
}).sort((a,b) => b.score - a.score);

console.log(permutations[0]);