import { readFileSync } from "fs";
import { join } from "path";
import { ILooseObject, Direction, Coordinate } from "./type";

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

export function countOccurrencesInArray<T>(array: T[], search: T) {
    return array.filter(x => x == search).length;
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

export function transposeStr(array: string[], reverse: boolean = false) {
    const data: string[] = [];
    for (let x = 0; x < array[0].length; x++) {
        let str = "";

        for (const line of array) {
            str += line[x];
        }

        data.push(str);
    }

    if(reverse){
        data.reverse();
    }

    return data;
}

export function transpose<T>(array: T[][]): T[][] {
    const data: T[][] = [];
    for (let x = 0; x < array[0].length; x++) {
        const inner = [];

        for (const line of array) {
            inner.push(line[x]);
        }

        data.push(inner);
    }
    
    return data;
}

export function rotate<T>(array: T[][], reverse: boolean = false): T[][]{
    const data: T[][] = [];
    
    for(let x = array[0].length - 1; x >= 0; x--){
        const inner = [];

        for(let y = 0; y < array.length; y++){
            inner.push(array[y][x]);
        }

        if(reverse){
            inner.reverse();
        }

        data.push(inner);
    }

    if(reverse){
        data.reverse();
    }

    return data;
}

export function isOutOfBounds(position: Coordinate, map: any[][] | string[]){
    return ((position.x < 0 || position.x >= map[0].length) || (position.y < 0 || position.y >= map.length));
}

export const move: Record<Direction, (x: number, y: number, step?: number) => Coordinate> = {
    "UP": (x, y, step = 1) => ({x, y: y - step}),
    "DOWN": (x, y, step = 1) => ({x, y: y + step}),
    "LEFT": (x, y, step = 1) => ({x: x - step, y}),
    "RIGHT": (x, y, step = 1) => ({x: x + step, y})
};

export const mirroredMoves: Record<Direction, Direction> = {
    "UP": "DOWN",
    "DOWN": "UP",
    "LEFT": "RIGHT",
    "RIGHT": "LEFT"
};

export const rotatedMoves: Record<Direction, Direction> = {
    "UP": "RIGHT",
    "DOWN": "LEFT",
    "LEFT": "UP",
    "RIGHT": "DOWN"
}

export const allDirs: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];

export const betweenInclusive = (x: number, min: number, max: number) => x >= min && x <= max;

export function getPermutations<T>(inputArr: T[]) {
    let result: T[][] = [];

    const permute = (arr: T[], m: T[] = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}


class NodePos {
    coordinate: Coordinate;
    distanceToStart: number = 0;
    heuristic: number = 0;
    estimatedCost: number = 0;
    parent: NodePos | null = null;
    direction: Direction;

    constructor(coord: Coordinate, dToStart: number, score: number, parent: NodePos | null, direction: Direction){
        this.coordinate = coord;
        this.distanceToStart = dToStart;
        this.heuristic = score;
        this.estimatedCost = score + dToStart;
        this.parent = parent;
        this.direction = direction;
    }
}

export function manhattanDistance(curr: Coordinate, destination: Coordinate){
    return Math.abs(curr.x - destination.x) + Math.abs(curr.y - destination.y)
}

export function findShortestPath(map: boolean[][], startPos: Coordinate, endPos: Coordinate, movementFn: (from: Coordinate, to: Coordinate, prevDir: Direction, currDir: Direction) => number = () => 1, heuristicFn: (currNode: Coordinate, destination: Coordinate) => number = manhattanDistance){
    const queue = new PriorityQueue((a,b) => a.estimatedCost - b.estimatedCost, [new NodePos(startPos, 0, heuristicFn(startPos, endPos), null, "RIGHT")]);
    const closedList = new Set<string>();

    while(!queue.isEmpty()){
        const curr = queue.getNext();
        closedList.add(`${curr.coordinate.x},${curr.coordinate.y}`);

        if(curr.coordinate.x == endPos.x && curr.coordinate.y == endPos.y){
            return curr;
        }

        for(const dir of allDirs){
            const pos = move[dir](curr.coordinate.x, curr.coordinate.y);
            let distance = curr.distanceToStart + movementFn(curr.coordinate, pos, curr.direction, dir);

            if(isOutOfBounds(pos, map) || !map[pos.y][pos.x] || closedList.has(`${pos.x},${pos.y}`)){
                continue;
            }

            let {index, element} = queue.find(x => x.coordinate.x == pos.x && x.coordinate.y == pos.y);

            if(!element){
                element = new NodePos(pos, distance, heuristicFn(pos, endPos), curr, dir);
                queue.add(element);
            } else if(distance < element.distanceToStart){
                queue.removeAt(index);

                element.parent = curr;
                element.distanceToStart = distance;
                element.estimatedCost = element.heuristic + element.distanceToStart;

                queue.add(element);
            }
        }
    }

    return null;
}

class PriorityQueue<T> {
    private readonly data: T[] = [];
    private readonly sortFn: (a: T, b: T) => number
    
    constructor(sort: (a: T, b: T) => number, startingData: T[] = []){
        this.sortFn = sort;
        this.data = startingData.toSorted(this.sortFn);
    }

    add(newItem: T){
        let low = 0;
        let high = this.data.length;

        while(low < high){
            const mid = Math.floor((low + high) / 2);
            if(this.sortFn(newItem, this.data[mid]) < 0){
                high = mid;
            } else {
                low = mid + 1;
            }
        }

        this.data.splice(low, 0, newItem);
    }

    getNext(): T {
        return this.data.shift();
    }

    isEmpty(): boolean {
        return this.data.length == 0;
    }

    find(predicate: (x: T) => boolean){
        let element = null;
        const index = this.data.findIndex(predicate);

        if(index >= 0){
            element = this.data[index];
        }

        return {
            index,
            element
        };
    }

    removeAt(index: number){
        return this.data.splice(index, 1);
    }
}

export function iterateNodes(node: NodePos, action: (node: NodePos) => void){
    while(node){
        action(node);
        node = node.parent;
    }
}

export function outputMap(map: boolean[][]){
    for(let y = 0; y < map.length; y++){
        let line = "";

        for(let x = 0; x < map[y].length; x++){
            line += map[y][x] ? "." : "#";
        }

        console.log(line);
    }
}

export function inputMap(lines: string[], exceptionCallback: (char: string, x: number, y: number) => boolean = (_char,_x,_y) => false){
    const map = grid(lines[0].length, false, lines.length);

    for(let y = 0; y < lines.length; y++){
        for(let x = 0; x < lines[y].length; x++){
            if(lines[y][x] == "."){
                map[y][x] = true;
            } else if(lines[y][x] != "#"){
                map[y][x] = exceptionCallback(lines[y][x], x, y);
            }
        }
    }

    return map;
}