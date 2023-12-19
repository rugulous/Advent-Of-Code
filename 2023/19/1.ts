import { getPuzzleInput } from "../../utils";

function parseInput(input: string[]): [{}, any[]]{
    let dataStart = false;
    const flows = {};
    const data = [];
    
    for(const line of input){
        if(line.trim() == ""){
            dataStart = true;
            continue;
        }

        if(dataStart){
            data.push(processData(line));
        } else {
            const [label, flow] = processWorkflow(line);
            flows[label] = flow;
        }
    }

    return [flows, data];
}

function processWorkflow(line: string): [string, any[]]{
    const [label, body] = line.replace("}", "").split("{");
    const funcs = body.split(",");
    const arr = [];

    for(const fun of funcs){
        const [expr, result] = fun.split(":");

        const fn = (x: number, m: number, a: number, s: number) => {
            if(!result){
                return expr;
            }

            if(eval(expr)){
                return result;
            }

            return null;
        };

        arr.push(fn);
    }

    return [label, arr];
}

function processData(line: string): {x: number, m: number, a: number, s: number}{
    line = line.replaceAll("=", '":').replaceAll(",", ',"').replace("{", '{"').replace("}", '}'); //make JSON-able
    return JSON.parse(line);
}

const input = getPuzzleInput(__dirname, "example.txt");
const [workflows, items] = parseInput(input);

const accepted = [];

for(const item of items){
    const {x, m, a, s} = item;
    let currWorkflow = "in";
    let currIndex = 0;
    
    while(true){
        const result = workflows[currWorkflow][currIndex](x, m, a, s);

        if(result != null){
            if(result == "A"){
                accepted.push(item);
                break;
            } else if(result == "R"){
                break;
            }

            currWorkflow = result;
            currIndex = 0;
        } else {
            currIndex++;
        }
    }
}

console.log(accepted.reduce((acc, val) => acc + val.x + val.m + val.a + val.s, 0));