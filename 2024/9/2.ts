import { getPuzzleInput } from "../../utils";

type MemorySegment = {
    type: 'BLANK',
    size: number
} | {
    type: 'FILLED',
    id: number,
    size: number
}

const input = getPuzzleInput(__dirname)[0];

//first, expand blocks
let memory: MemorySegment[] = [];
let isBlank = false;
let memoryId = 0;

for (const char of input) {
    const amount = parseInt(char);

    if (isBlank) {
        memory.push({
            type: 'BLANK',
            size: amount
        });
    } else {
        memory.push({
            type: 'FILLED',
            size: amount,
            id: memoryId
        });
        memoryId++;
    }

    isBlank = !isBlank;
}

//allocate
for (let swapEnd = memory.length - 1; swapEnd >= 0; swapEnd--) {
    const segment = memory[swapEnd];

    if (segment.type == "BLANK" || segment.size == 0) {
        continue;
    }

    for (let i = 0; i < swapEnd; i++) {
        if (memory[i].type == "FILLED") {
            continue;
        }

        if (memory[i].size >= segment.size) {
            const spillover = memory[i].size - segment.size;

            memory[i].size = segment.size;
            memory[swapEnd] = memory[i];
            memory[i] = segment

            if (spillover > 0) {
                memory.splice(i + 1, 0, {
                    type: "BLANK",
                    size: spillover
                });
            }

            break;
        }
    }
}


let actualPosition = 0;
let total = 0;

for (const segment of memory) {
    if (segment.type == "BLANK") {
        actualPosition += segment.size;
        continue;
    }

    for (let i = 0; i < segment.size; i++) {
        total += segment.id * actualPosition;
        actualPosition++;
    }
}

console.log(total);