import { getPuzzleInput } from "../../utils";

const MIN_VAL = 1;
const MAX_VAL = 4000;

type Limits = {
    x: [number, number],
    m: [number, number],
    a: [number, number],
    s: [number, number]
}

class Branch {
    identifier: string;
    field: string;
    value: number;
    pass: Branch | string;
    fail: Branch | string;
    rawCondition: string;

    constructor(identifier) {
        this.identifier = identifier;
    }
}

function parseInput(input: string[]): {} {
    const flows = {};

    for (const line of input) {
        if (line.trim() == "") {
            break;
        }

        const [label, branch] = splitWorkflow(line); //processWorkflow(line);

        if (branch.length > 0) {
            flows[label] = branch;
        }
    }

    pruneBranches(flows);

    return flows;
}

function pruneBranches(workflows: { [key: string]: any[] }) {
    while (true) {
        let changesMade = 0;
        let hasSolution = false;

        for (const key in workflows) {
            if (!Array.isArray(workflows[key][0])) {
                continue;
            }

            for (let i = 0; i < workflows[key].length; i++) {
                const conditions = workflows[key][i];
                const target = conditions[conditions.length - 1];
                if (target == "A") {
                    hasSolution = true;
                    continue;
                }

                if (!workflows[target]) {
                    workflows[key].splice(i, 1);
                    changesMade++;
                } else if (!Array.isArray(workflows[target][0])) {
                    conditions[conditions.length - 1] = workflows[target];
                    changesMade++;
                }
            }

            if (workflows[key].length == 0) {
                delete workflows[key];
                changesMade++;
            } else if (workflows[key].length == 1 && hasSolution) {
                workflows[key][0].pop();
                workflows[key] = workflows[key][0];
                changesMade++;
            }
        }

        if (changesMade == 0) {
            break;
        }
    }
}

function invert(condition: string) {
    if (condition.indexOf(">") >= 0) {
        return condition.replace(">", "<=");
    }

    return condition.replace("<", ">=");
}

function splitWorkflow(line: string): [string, any[]] {
    const [label, body] = line.replace("}", "").split("{");
    const funcs = body.split(",");

    const options = [];
    const currPath = [];
    for (const func of funcs) {
        if (func.indexOf(":") < 0) {
            if (func != "R") {
                options.push([...currPath, func]);
            }
            continue;
        }

        const [cond, dest] = func.split(":");
        if (dest != "R") {
            options.push([...currPath, cond, dest]);
        }
        currPath.push(invert(cond));
    }

    return [label, options];
}

const input = getPuzzleInput(__dirname, "example.txt");
const workflows = parseInput(input);

console.log(workflows);





















/*
function processWorkflow(line: string) {
    const [label, body] = line.replace("}", "").split("{");
    const funcs = body.split(",");

    let firstBranch = null;
    let lastBranch = null;

    for (let i = 0; i < funcs.length; i++) {
        const [cond, dest] = funcs[i].split(":");

        if (!dest) {
            lastBranch.fail = cond;
            break;
        }

        const name = (i == 0) ? label : `${label}-${i}`;
        const [field, value] = extractCondition(cond);

        const newBranch = new Branch(name);
        newBranch.field = field;
        newBranch.value = parseInt(value);
        newBranch.pass = dest;
        newBranch.rawCondition = cond;

        if (lastBranch) {
            lastBranch.fail = newBranch;
        } else {
            firstBranch = newBranch;
        }

        lastBranch = newBranch;
    }

    return [label, firstBranch];
}

function extractCondition(condition: string) {
    if (condition.indexOf(">") > -1) {
        return condition.split(">");
    } else if (condition.indexOf("<") > -1) {
        return condition.split("<");
    }

    return condition;
}
*/