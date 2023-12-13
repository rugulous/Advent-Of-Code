import { getPuzzleInput, transpose } from "../../utils";

function splitMaps(fullMap: string[]): string[][] {
    const maps: string[][] = [];
    let parts: string[] = [];

    for (const line of fullMap) {
        if (line.length == 0) {
            if (parts.length > 0) {
                maps.push(parts);
                parts = [];
            }

            continue;
        }

        parts.push(line);
    }

    if (parts.length > 0) {
        maps.push(parts);
    }

    return maps;
}

function getMirrorAccross(map: string[]): number | null{
    for(let i = 1; i < map.length; i++){
        const len = Math.min(i, map.length - i);
        const left = map.slice(i - len, i);
        const right = map.slice(i, i + len);

        left.reverse();
        if (left.join('|') === right.join('|')) {
            return i;
        }
    }

    return null;
}

const maps = splitMaps(getPuzzleInput(__dirname));
console.log(maps.reduce((acc, val) => {
    const rows = getMirrorAccross(val);
    if(rows){
        return acc + (rows * 100);
    }
    
    const transposed = transpose(val);
    return acc + (getMirrorAccross(transposed) ?? 0);
}, 0));