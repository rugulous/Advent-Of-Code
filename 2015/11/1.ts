function incrementChar(char: string) {
    let ascii = char.charCodeAt(0);
    ascii++;

    if (ascii > 122) {
        return "a";
    }

    return String.fromCharCode(ascii);
}

function nextPwd(oldPwd: string) {
    const parts = oldPwd.split("");
    const incremented = [];

    while (true) {
        const newChar = incrementChar(parts.pop());
        incremented.push(newChar);

        if (newChar != 'a') {
            break;
        }
    }

    return parts.concat(incremented.reverse()).join("");
}

const blockedChars = ['i', 'o', 'l'];

//as before, return false if a rule succeeds because true short-circuits the checker!
const rules = [
    (str: string) => { //3 in ascending order e.g. abc, def, xyz
        const values = str.split("").map(c => c.charCodeAt(0));
        for (let i = 0; i < values.length - 2; i++) {
            if (values[i + 2] == values[i + 1] + 1 && values[i + 1] == values[i] + 1) {
                return false;
            }
        }

        return true;
    },

    (str: string) => blockedChars.some(c => str.indexOf(c) >= 0), //no blocked chars

    (str: string) => {
        let pairs = 0;
        let prevChar = '';
        for (let i = 0; i < str.length - 1; i++) {
            if (str[i] == str[i + 1] && str[i] != prevChar) {
                pairs++;
                prevChar = str[i];

                if (pairs >= 2) {
                    return false;
                }
            }

        }

        return true;
    }
];

const startingPwd = "cqjxjnds";
let currPwd = startingPwd;
let suitable = false;

while (!suitable) {
    currPwd = nextPwd(currPwd);
    suitable = !rules.some(r => r(currPwd));
}

console.log(currPwd);