import { getPuzzleInput, replaceAt, transpose } from "../../utils";

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

function getMirrorsAccross(map: string[]): number[]{
    const matches: number[] = [];

    for(let i = 1; i < map.length; i++){
        const len = Math.min(i, map.length - i);
        const left = map.slice(i - len, i);
        const right = map.slice(i, i + len);

        left.reverse();
        if (left.join('|') === right.join('|')) {
            matches.push(i);
        }
    }

    return matches;
}

const maps = splitMaps(getPuzzleInput(__dirname));
console.log(maps.reduce((acc, map) => {
    const transposed = transpose(map);
    const [rows, cols] = [getMirrorsAccross(map), getMirrorsAccross(transposed)];

    for(let y = 0; y < map.length; y++){
        const copy = [...map];
        for(let x = 0; x < map[y].length; x++){
            copy[y] = replaceAt(map[y], x, map[y][x] == '#' ? "." : "#");

            let [changedRows, changedCols] = [getMirrorsAccross(copy), getMirrorsAccross(transpose(copy))];
            changedRows = changedRows.filter(r => !rows.includes(r));
            changedCols = changedCols.filter(c => !cols.includes(c));

            if(changedCols.length > 0){
                return acc + changedCols[0];
            }

            if(changedRows.length > 0){
                return acc + (changedRows[0] * 100);
            }
        }
    }

    throw new Error('Failed to find new mirror');
}, 0));