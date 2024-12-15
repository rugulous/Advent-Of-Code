import { getPuzzleInput } from "../../utils";

const regex = /p=(\d*),(\d*) v=(-?\d*),(-?\d*)/;

const WIDTH = 101;
const HEIGHT = 103;


const robots = getPuzzleInput(__dirname).map(x => {
    const [, px, py, vx, vy] = regex.exec(x).map(x => parseInt(x));

    return {
        position: { x: px, y: py },
        velocity: { x: vx, y: vy }
    }
});

let iter = 0;
while (true) {
    iter++;
    let numOverlap = 0;

    for (const robot of robots) {
        let newX = (robot.position.x + robot.velocity.x) % WIDTH;
        let newY = (robot.position.y + robot.velocity.y) % HEIGHT;

        if (newX < 0) {
            newX = WIDTH + newX; //e.g. 7 + -3 = 4 (7 - - 3 = 10)
        }

        if (newY < 0) {
            newY = HEIGHT + newY;
        }

        robot.position = { x: newX, y: newY };
    }

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            let count = 0;
            for (const robot of robots) {
                if (robot.position.x == x && robot.position.y == y) {
                    count++;

                    if (count > 1) {
                        numOverlap++;
                    }
                }
            }
        }
    }

    if (numOverlap <= 2) {
        console.log(`${iter}: overlap ${numOverlap}`);

        for (let y = 0; y < HEIGHT; y++) {
            let line = "";

            for (let x = 0; x < WIDTH; x++) {
                let count = 0;

                for (const robot of robots) {
                    if (robot.position.x == x && robot.position.y == y) {
                        count++;
                    }
                }

                if (count == 0) {
                    line += " .";
                } else {
                    line += count.toString().padStart(2, ' ');
                }
            }

            console.log(line);
        }

        if (numOverlap == 0) {
            break;
        }
    }
}