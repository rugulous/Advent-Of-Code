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

export function fill<T>(size: number, defaultValue: T | null = null) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(defaultValue);
    }
    return arr;
}

export function grid<T>(width: number, defaultValue: T | null = null, depth: number = width) {
    const grid: T[][] = [];
    for (let i = 0; i < width; i++) {
        grid.push(fill(depth, defaultValue));
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
    return (valueToCheck == undefined || array[0] == valueToCheck) && !array.some(x => x != searchEl);
}

export function columnHasSameValue<T>(grid: T[][], column: number = 0, valueToCheck: T | undefined = undefined) {
    const initValue = grid[0][column];
    if (valueToCheck != undefined && initValue != valueToCheck) {
        return false;
    }

    for (let row = 1; row < grid.length; row++) {
        if (grid[row][column] != initValue) {
            return false;
        }
    }

    return true;
}

export function getBoolPermutations(size: number, isValidFn: ((permutation: boolean[]) => boolean) | null = null): boolean[][] {
    const permutations = [];
    const bits = fill(size, false);
    for (let i = 0; i < (1 << size); i++) {
        const perm = [...bits];
        if (!isValidFn || isValidFn(perm)) {
            permutations.push(perm);
        }

        incrementBit(bits);
    }

    return permutations;
}

export function incrementBit(data: boolean[]) {
    for (let i = data.length - 1; i >= 0; i--) {
        const result = !data[i];
        data[i] = result;

        if (result) {
            break;
        }
    }

    return data;
}

export function replaceAt(string: string, index: number, replacement: string) {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length);
}

export function arraysEqual<T>(left: T[], right: T[]) {
    if (left === right) {
        return true;
    }

    if (left == null || right == null) {
        return false;
    }

    if (left.length != right.length) {
        return false;
    }

    for (let i = 0; i < left.length; i++) {
        if (left[i] != right[i]) {
            return false;
        }
    }

    return true;
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function transpose(array: string[]) {
    const data: string[] = [];
    for (let x = 0; x < array[0].length; x++) {
        let str = "";

        for (const line of array) {
            str += line[x];
        }

        data.push(str);
    }

    return data;
}