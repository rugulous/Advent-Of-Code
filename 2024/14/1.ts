import { getPuzzleInput } from "../../utils";

const regex = /p=(\d*),(\d*) v=(-?\d*),(-?\d*)/;

const WIDTH = 101;
const HEIGHT = 103;

const robots = getPuzzleInput(__dirname).map(x => {
   const [, px, py, vx, vy] = regex.exec(x).map(x => parseInt(x));

   return {
    position: {x: px, y: py},
    velocity: {x: vx, y: vy}
   }
});

for(let i = 0; i < 100; i++){
    for(const robot of robots){
        let newX = (robot.position.x + robot.velocity.x) % WIDTH;
        let newY = (robot.position.y + robot.velocity.y) % HEIGHT;

        if(newX < 0){
            newX = WIDTH + newX; //e.g. 7 + -3 = 4 (7 - - 3 = 10)
        }

        if(newY < 0){
            newY = HEIGHT + newY;
        }

        robot.position = {x: newX, y: newY};
    }
}

const quadrants = [
    [0, 0],
    [0, 0]
]

for(let y = 0; y < HEIGHT; y++){
    if(y == Math.floor(HEIGHT / 2)){
        continue;
    }

    const upperHalf = (y < HEIGHT / 2);

    for(let x = 0; x < WIDTH; x++){
        if(x == Math.floor(WIDTH / 2)){
            continue;
        }

        const leftSide = (x < WIDTH / 2);

        for(const robot of robots){
            if(robot.position.x == x && robot.position.y == y){
                quadrants[+upperHalf][+leftSide]++;
            }
        }
    }
}

console.log(quadrants.flat().reduce((acc, val) => acc * val, 1));