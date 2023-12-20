import { ILooseObject } from "../../type";
import { getPuzzleInput, leastCommonMultiple } from "../../utils";

interface Node {
    connections: string[];
    receivePulse(sender: string, pulse: boolean): boolean | undefined;
}

type Command = {
    source: string;
    destination: string;
    pulse: boolean;
};

class FlipFlop implements Node {
    state: boolean = false;
    connections: string[];

    constructor(connections: string[]){
        this.connections = connections;
    }

    receivePulse(sender: string, pulse: boolean): boolean | undefined{
        if(pulse){ //ignore high pulse
            return;
        }

        this.state = !this.state;
        return this.state;
    }
}

class Conjunction implements Node {
    inputs: {[key: string]: boolean} = {};
    connections: string[] = [];

    constructor(connections: string[]){
        this.connections = connections;
    }

    addInput(name: string): void{
        this.inputs[name] = false;
    }

    receivePulse(sender: string, pulse: boolean): boolean | undefined {
        this.inputs[sender] = pulse;
        return Object.keys(this.inputs).some(k => !this.inputs[k]);
    }
}

function parseInput(input: string){
    const [rawName, rawDestination] = input.replaceAll(" ", "").split("->");
    const dest = rawDestination.split(",");

    if(rawName == "broadcaster"){
        broadcaster.push(...dest);
        return;
    }

    const operation = rawName.substring(0, 1);
    const name = rawName.substring(1);

    connections[name] = dest;
    
    if(operation == "%"){
        nodes[name] = new FlipFlop(dest);
    } else {
        nodes[name] = new Conjunction(dest);
    }
}

function setInputs(){
    for(const source in connections){
        for(const target of connections[source]){
            if(!(nodes[target] instanceof Conjunction)){
                continue;
            }

            (nodes[target] as Conjunction).addInput(source);
        }
    }
}

function pressButton(){
    const commands: Command[] = [];
    
    for(const destination of broadcaster){
        commands.push({
            destination,
            pulse: false,
            source: "broadcaster"
        });
    }

    while(commands.length > 0){
        const currCommand = commands.shift();

        const destNode = nodes[currCommand.destination];
        if(destNode === undefined){
            continue;
        }
        
        if(lowestParents.hasOwnProperty(currCommand.destination) && !currCommand.pulse){
            lowestParents[currCommand.destination] = pressCount;
        }

        const result = destNode.receivePulse(currCommand.source, currCommand.pulse);

        if(result === undefined){
            continue;
        }

        commands.push(...destNode.connections.map(c => ({
            destination: c,
            source: currCommand.destination,
            pulse: result
        })));
    }
}

const nodes: {[key: string]: Node} = {};
const broadcaster = [];
const connections: ILooseObject = {};
const lowestParents = {
    "ss": null,
    "fh": null,
    "mf": null,
    "fz": null
}

getPuzzleInput(__dirname).forEach(parseInput);
setInputs();

let pressCount = 0;
while(true){
    if(pressCount % 100000 == 0){
        console.log(`Press ${pressCount}`);
    }

    pressCount++;
    pressButton();

    if(Object.keys(lowestParents).some(key => !lowestParents[key])){
        continue;
    }

    console.log(lowestParents);
    console.log(leastCommonMultiple(Object.values(lowestParents)));
    break;
}