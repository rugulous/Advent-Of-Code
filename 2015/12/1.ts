import { getPuzzleInput } from "../../utils";

function extractNumbersFromObject(object: object): number[]{
    const numbers = [];

    const keys = Object.keys(object);
    for(const key of keys){
        const entry = object[key];
        if(typeof entry == 'number'){
            numbers.push(object[key]);
        } else if(Array.isArray(entry)){
            numbers.push(...extractNumbersFromArray(entry));
        } else if(typeof entry == 'object') {
            numbers.push(...extractNumbersFromObject(entry));
        }
    }

    return numbers;
}

function extractNumbersFromArray(array: any[]): number[]{
    const numbers = [];

    for(const item of array){
        if(typeof item == 'number'){
            numbers.push(item);
        } else if(Array.isArray(item)){
            numbers.push(...extractNumbersFromArray(item));
        } else if(typeof item == 'object') {
            numbers.push(...extractNumbersFromObject(item));
        }
    }

    return numbers;
}

const data = JSON.parse(getPuzzleInput(__dirname)[0]);
console.log(extractNumbersFromObject(data).reduce((acc, val) => acc + val, 0));