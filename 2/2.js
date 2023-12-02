const { getPuzzleInput } = require("../utils");

const limits = {
    red: 12,
    green: 13,
    blue: 14
};

function parseReveal(reveal) {
    const parts = reveal.split(",");
    const parsed = {
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

function parseInput(line) {
    const [idString, data] = line.split(":");
    const id = parseInt(idString.split(" ")[1]);

    const maxGuess = {
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

function getInputValue(line){
    const {maxGuess} = parseInput(line);
    return maxGuess.red * maxGuess.green * maxGuess.blue;
}

const score = getPuzzleInput(__dirname).reduce((acc, val) => acc + getInputValue(val), 0);
console.log(score);