import {getPuzzleInput} from "../../utils";
import { IRgb } from "./type";

function parseReveal(reveal: string): IRgb {
    const parts = reveal.split(",");
    const parsed: IRgb = {
        red: 0,
        green: 0,
        blue: 0
    };

    parts.forEach(p => {
        p = p.trim();
        const [amount, colour] = p.split(" ");
        parsed[colour] = parseInt(amount);
    });

    return parsed;
}

function parseInput(line: string) {
    const [idString, data] = line.split(":");
    const id = parseInt(idString.split(" ")[1]);

    const maxGuess: IRgb = {
        red: 0,
        green: 0,
        blue: 0
    };

    const reveals = data.split(";");
    for (const r of reveals) {
        const reveal = parseReveal(r);
        Object.keys(reveal).forEach(k => maxGuess[k] = Math.max(maxGuess[k], reveal[k]));
    }

    return {
        id,
        maxGuess
    };
}

function getInputValue(line: string){
    const {maxGuess} = parseInput(line);
    return maxGuess.red * maxGuess.green * maxGuess.blue;
}

const score = getPuzzleInput(__dirname).reduce((acc, val) => acc + getInputValue(val), 0);
console.log(score);