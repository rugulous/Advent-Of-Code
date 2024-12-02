import { betweenInclusive, getPuzzleInput } from "../../utils";

const getDirection = (prevNum: number, nextNum: number) => nextNum > prevNum ? "asc" : "desc";
const isValid = (prevNum: number, nextNum: number, direction: string) => getDirection(prevNum, nextNum) == direction && betweenInclusive(Math.abs(prevNum - nextNum), 1, 3);

const reports = getPuzzleInput(__dirname);

const safeNum = reports.filter(report => {
    const values = report.split(" ").map(v => parseInt(v));

    const direction = getDirection(values[0], values[1]);
    if(!isValid(values[0], values[1], direction)){
        return false;
    }
    
    let lastVal = values[1];
    for(let i = 2; i < values.length; i++){
        if(!isValid(lastVal, values[i], direction)){
            return false;
        }

        lastVal = values[i];
    }

    return true;
}).length;

console.log(safeNum);