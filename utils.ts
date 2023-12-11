import { readFileSync } from "fs";
import { join } from "path";
import { ILooseObject } from "./type";

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

export function grid<T>(width: number, defaultValue: T | null = null, depth: number = width) {
    const grid: T[][] = [];
    for (let i = 0; i < width; i++) {
        const inner = [];

        for (let j = 0; j < depth; j++) {
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

export function getSmallestN(array: number[], n: number) {
    array.sort((a, b) => a - b);
    return array.slice(0, n);
}

export function countOccurrences(string: string, char: string) {
    return string.split(char).length - 1;
}

export function shuffle<T>(array: T[]): T[] {
    const out = []

    while (array.length > 0) {
        const index = Math.floor(Math.random() * array.length);
        out.push(array.splice(index, 1)[0]);
    }

    return out;
}

export function countAllCharacters(string: string): ILooseObject {
    const counter: ILooseObject = {};

    for (const char of string) {
        if (!counter.hasOwnProperty(char)) {
            counter[char] = 1;
        } else {
            counter[char]++;
        }
    }

    return counter;
}

export function arrayHasSameValue<T>(array: T[], valueToCheck: T | undefined = undefined) {
    if (array.length == 0) {
        return false;
    }

    if (array.length == 1) {
        return valueToCheck == null || array[0] == valueToCheck;
    }

    const searchEl = array[0];
    return  (valueToCheck == undefined || array[0] == valueToCheck) && !array.some(x => x != searchEl);
}

export function columnHasSameValue<T>(grid: T[][], column: number = 0, valueToCheck: T | undefined = undefined) {
    const initValue = grid[0][column];
    if(valueToCheck != undefined && initValue != valueToCheck){
        return false;
    }

    for (let row = 1; row < grid.length; row++) {
        if (grid[row][column] != initValue) {
            return false;
        }
    }

    return true;
}