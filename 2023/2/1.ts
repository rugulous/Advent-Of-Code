import {getPuzzleInput} from "../../utils";
import { IRgb } from "./type";

const colours = ["red","green","blue"];

const limits: IRgb = {
    red: 12,
    green: 13,
    blue: 14
};

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
    const parsedInput = parseInput(line);
    for(const k of colours){
        if(parsedInput.maxGuess[k] > limits[k]){
            return 0;
        }
    }

    return parsedInput.id;
}

const score = getPuzzleInput(__dirname).reduce((acc, val) => acc + getInputValue(val), 0);
console.log(score);