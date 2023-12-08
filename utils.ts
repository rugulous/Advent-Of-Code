import { readFileSync } from "fs";
import { join } from "path";

export function getPuzzleInput(dir: string, file = "input.txt"): string[] {
    const input = readFileSync(join(dir, file), "utf-8");
    return input.split("\r\n");
}

export function range(start: number, end: number): number[] {
    const arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }

    return arr;
}

export function grid<T>(width: number, defaultValue: T | null = null, depth: number = width){
    const grid: T[][] = [];
    for(let i = 0; i < width; i++){
        const inner = [];

        for(let j = 0; j < depth; j++){
            inner.push(defaultValue);
        }

        grid.push(inner);
    }
    
    return grid;
}

export function leastCommonMultiple(values: number[]) {
    if (values.length == 0) {
        return null;
    }

    values.sort((a, b) => a - b);
    return values.reduce(lowestCommonMultiple);
}

export function lowestCommonMultiple(num1: number, num2: number) {
    return (num1 / greatestCommonDivisor(num1, num2)) * num2;
}

export function greatestCommonDivisor(num1: number, num2: number) {
    if (num2 == 0) {
        return num1;
    }

    return greatestCommonDivisor(num2, num1 % num2);
}

export function getSmallestN(array: number[], n: number){
    array.sort((a, b) => a - b);
    return array.slice(0, n);
}

export function countOccurrences(string: string, char: string){
    return string.split(char).length - 1;
}