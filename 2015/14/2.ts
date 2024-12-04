import { getPuzzleInput } from "../../utils";

const regex = /(.*) can fly (\d*) km\/s for (\d*) seconds, but then must rest for (\d*) seconds/
const TARGET_TIME = 2503;

const reindeer = getPuzzleInput(__dirname).map(line => {
    const [, , _speed, _duration, _rest] = regex.exec(line);
    return {
        speed: parseInt(_speed),
        duration: parseInt(_duration),
        rest: parseInt(_rest),
        points: 0,
        isResting: false,
        counter: 0,
        distance: 0
    }
});

for(let i = 0; i < TARGET_TIME; i++){
    //update positions
    for(const deer of reindeer){
        if(!deer.isResting){
            deer.distance += deer.speed;
        }

        deer.counter++;

        if(!deer.isResting){
            if(deer.counter == deer.duration){
                deer.isResting = true;
                deer.counter = 0;
            }
        } else if(deer.counter == deer.rest){
            deer.isResting = false;
            deer.counter = 0;
        }
    }

    //update points
    reindeer.sort((a,b) => b.distance - a.distance)[0].points++;
}

console.log(reindeer.sort((a,b) => b.points - a.points)[0].points);