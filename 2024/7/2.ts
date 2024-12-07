import { getPuzzleInput } from "../../utils";

function canMeetTarget(numbers: number[], target: number, current: number = 0, index: number = 0): boolean {
    if(current > target){
        return false; //BUST
    }

    if (index == numbers.length) {
        return current == target;
    }

    const nextNum = numbers[index];
    const canAdd = canMeetTarget(numbers, target, current + nextNum, index + 1);
    const canMultiply = canMeetTarget(numbers, target, current * nextNum, index + 1);
    const canConcat = canMeetTarget(numbers, target, parseInt(`${current}${nextNum}`), index + 1);

    return canAdd || canMultiply || canConcat;
}

const total = getPuzzleInput(__dirname).map(line => {
    const [target, remaining] = line.split(":");
    const values = remaining.trim().split(" ");
    return {
        target: parseInt(target),
        values: values.map(x => parseInt(x)),
    }
}).filter(eq => canMeetTarget(eq.values, eq.target))
.reduce((acc, val) => acc + val.target, 0);

console.log(total);