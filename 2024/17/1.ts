import { getPuzzleInput } from "../../utils";

const input = getPuzzleInput(__dirname);

let instructionPointer = 0;
const output = [];

const registers = {
    a: parseInt(input[0].split(": ")[1].trim()),
    b: parseInt(input[1].split(": ")[1].trim()),
    c: parseInt(input[2].split(": ")[1].trim())
}

const operations: ((operand: number) => void)[] = [
    (operand) => registers.a = Math.trunc((registers.a) / (Math.pow(2, operand))), //adv
    (operand) => registers.b = registers.b ^ operand, //bxl
    (operand) => registers.b = operand % 8, //bst
    (operand) => instructionPointer = (registers.a  == 0) ? instructionPointer : operand, //jnz
    (_) => registers.b = registers.b ^ registers.c, //bxc
    (operand) => output.push(operand % 8), //out
    (operand) => registers.b = Math.trunc((registers.a) / (Math.pow(2, operand))), //bdv
    (operand) => registers.c = Math.trunc((registers.a) / (Math.pow(2, operand))), //cdv
]

function getOperandValue(rawVal: number){
    if(rawVal <= 3){
        return rawVal;
    }

    if(rawVal == 4){
        return registers.a;
    }

    if(rawVal == 5){
        return registers.b;
    }

    if(rawVal == 6){
        return registers.c;
    }
}

const program = input[4].split(": ")[1].split(",").map(x => parseInt(x));

while(instructionPointer < program.length){
    const opcode = program[instructionPointer];
    const operand = getOperandValue(program[instructionPointer + 1]);
    const prevPos = instructionPointer;

    //treat everything like NOP for now
    operations[opcode](operand);

    if(instructionPointer == prevPos){ //if we haven't jumped
        instructionPointer += 2;
    }
}

console.log(output.join(","));