const fs = require('fs');
const path = require('path');

function getPuzzleInput(dir, file = "input.txt"){
    const input = fs.readFileSync(path.join(dir, file), "utf-8");
    return input.split("\r\n");
}

module.exports = {
    getPuzzleInput
};