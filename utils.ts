const fs = require('fs');
const path = require('path');

export function getPuzzleInput(dir: string, file = "input.txt"): string[]{
    const input = fs.readFileSync(path.join(dir, file), "utf-8");
    return input.split("\r\n");
}