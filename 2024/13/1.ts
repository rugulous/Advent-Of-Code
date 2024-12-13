import { getPuzzleInput } from "../../utils";

const btnRegex = /X\+(\d*), Y\+(\d*)/
const prizeRegex = /X=(\d*), Y=(\d*)/

const input = getPuzzleInput(__dirname);

let total = 0;
for (let i = 0; i < input.length; i += 4) {
    const [, _ax, _ay] = btnRegex.exec(input[i]);
    const [, _bx, _by] = btnRegex.exec(input[i + 1]);

    const [, _x, _y] = prizeRegex.exec(input[i + 2]);

    //thank you Reddit - https://www.reddit.com/r/adventofcode/comments/1hd7irq/2024_day_13_an_explanation_of_the_mathematics/
    const [ax, ay, bx, by, x, y] = [_ax, _ay, _bx, _by, _x, _y].map(x => parseInt(x));

    const a = ((x * by) - (y * bx)) / ((ax * by) - (ay * bx));
    const b = ((ax * y) - (ay * x)) / ((ax * by) - (ay * bx));

    if(a % 1 == 0 && b % 1 == 0){
        total += (a * 3) + b;
    }
}

console.log(total);