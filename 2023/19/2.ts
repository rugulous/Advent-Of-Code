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

        const fn = (range: {}) => {
            if(!result){
                console.log(`${result}: EARLY EXIT`);
                return [{result: expr, range}];
            }

            const [variable, rawNum, lessThan] = extractVariable(expr);
            const num = parseInt(rawNum);

            const passRange = JSON.parse(JSON.stringify(range));
            const failRange = JSON.parse(JSON.stringify(range));

            if(lessThan){
                passRange[variable][1] = Math.min(passRange[variable][1], num - 1);
                failRange[variable][0] = Math.max(failRange[variable][0], num);
            } else {
                failRange[variable][1] = Math.min(failRange[variable][1], num - 1);
                passRange[variable][0] = Math.max(passRange[variable][0], num);
            }
            

            return [{
                result,
                range: passRange
            }, {
                result: null,
                range: failRange
            }];
        };

        arr.push(fn);
    }

    return [label, arr];
}

function extractVariable(test: string): [string, string, boolean]{
    if(test.indexOf("<") >= 0){
        return [...test.split("<"), true] as [string, string, boolean];
    }

    return [...test.split(">"), false] as [string, string, boolean];
}

function processData(line: string): {x: number, m: number, a: number, s: number}{
    line = line.replaceAll("=", '":').replaceAll(",", ',"').replace("{", '{"').replace("}", '}'); //make JSON-able
    return JSON.parse(line);
}

const approved = []
const approvedRuns = [];
function parseRange(currWorkflow, currIndex, range, numRuns = 0){
    console.log(`Running ${currWorkflow}[${currIndex}]`);
    const [pass, fail] = workflows[currWorkflow][currIndex]({...range});
    console.log(pass);
    console.log(fail);
    
    if(pass.result == "A"){
        console.log(`${currWorkflow}${currIndex} has resulted in ${pass.result}`);
        approved.push(pass.range);
    } else if(pass.result == "R"){
        console.log("REJECTED");
    } else {
        parseRange(pass.result, 0, JSON.parse(JSON.stringify(pass.range)), numRuns + 1);
    }

    if(fail){
        if(!fail.result){
            parseRange(currWorkflow, currIndex + 1,  JSON.parse(JSON.stringify(fail.range)), numRuns + 1);
        }
    }
}

const input = getPuzzleInput(__dirname, "example.txt");
const [workflows, items] = parseInput(input);

const accepted = [];


    let currWorkflow = "in";
    let currIndex = 0;

    let range = {
        x: [1, 4000],
        m: [1, 4000],
        a: [1, 4000],
        s: [1, 4000]
    };

    parseRange(currWorkflow, currIndex, range);
    console.log(approved.filter(a => a.x[0] != 1 && a.x[1] != 4000).map(a => a.x));
    console.log(approved.filter(a => a.m[0] != 1 && a.m[1] != 4000).map(a => a.m));
    console.log(approved.filter(a => a.a[0] != 1 && a.a[1] != 4000).map(a => a.a));
    console.log(approved.filter(a => a.s[0] != 1 && a.s[1] != 4000).map(a => a.s));
    
//     while(true){
//         const result = workflows[currWorkflow][currIndex](range);
//         console.log(result);
//         break;

//         if(result != null){
//             if(result == "A"){
//                 //accepted.push(item);
//                 break;
//             } else if(result == "R"){
//                 break;
//             }

//             currWorkflow = result;
//             currIndex = 0;
//         } else {
//             currIndex++;
//         }
//     }


// console.log(accepted.reduce((acc, val) => acc + val.x + val.m + val.a + val.s, 0));