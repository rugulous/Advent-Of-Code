import { getPuzzleInput } from "../../utils";

const regex = /(.*) can fly (\d*) km\/s for (\d*) seconds, but then must rest for (\d*) seconds/
const TARGET_TIME = 2503;

const input = getPuzzleInput(__dirname).map(line => {
    const [, , _speed, _duration, _rest] = regex.exec(line);
    const duration = parseInt(_duration);
    const rest = parseInt(_rest);
    const speed = parseInt(_speed);
    
    const totalBlock = duration + rest;
    let occurrences = Math.floor(TARGET_TIME / totalBlock);

    const remainingTime = TARGET_TIME - (occurrences * totalBlock);

    if(remainingTime > duration){
        occurrences++;
    } else {
        occurrences += remainingTime / duration;
    }

    return occurrences * speed * duration;
}).sort((a,b) => b - a);

console.log(input);