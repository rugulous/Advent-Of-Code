import { betweenInclusive, getPuzzleInput } from "../../utils";

const getDirection = (prevNum: number, nextNum: number) => nextNum > prevNum ? "asc" : "desc";
const isValid = (prevNum: number, nextNum: number, direction: string) => getDirection(prevNum, nextNum) == direction && betweenInclusive(Math.abs(prevNum - nextNum), 1, 3);

function isReportValid(report: number[]){
    const direction = getDirection(report[0], report[1]);
    if(!isValid(report[0], report[1], direction)){
        return false;
    }
    
    let lastVal = report[1];
    for(let i = 2; i < report.length; i++){
        if(!isValid(lastVal, report[i], direction)){
            return false;
        }

        lastVal = report[i];
    }

    return true;
}

const reports = getPuzzleInput(__dirname);

const safeNum = reports.filter(report => {
    const values = report.split(" ").map(v => parseInt(v));
    if(!isReportValid(values)){
        //iterate through the array, removing a value at a different index
        for(let i = 0; i < values.length; i++){
            const newVals = values.toSpliced(i, 1);

            if(isReportValid(newVals)){
                return true;
            }
        }
        return false;
    }   
    
    return true;
}).length;

console.log(safeNum);