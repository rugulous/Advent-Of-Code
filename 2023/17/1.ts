import { Coordinate, Direction } from "../../type";
import { allDirs, getPuzzleInput, grid, isOutOfBounds, mirroredMoves, move } from "../../utils";

class Node {
    f: number = 0;
    g: number = 0;
    h: number = 0;

    position: Coordinate;
    parent: Node | null;
    prevDirection: Direction | null;

    constructor(position: Coordinate, parent: Node | null = null, prevDirection: Direction | null = null){
        this.position = position;
        this.parent = parent;
        this.prevDirection = prevDirection;
    }

    disabledMove(){
        return (this.parent?.prevDirection == this.parent?.parent?.prevDirection && this.parent?.prevDirection == this.prevDirection) ? this.prevDirection : null;
    }
}

function output(path: Coordinate[]){
    const data = grid(maze[0].length, false, maze.length);

    for(const p of path){
        data[p.y][p.x] = true;
    }

    for(const line of data){
        console.log(line.map(l => l ? "#" : ".").join(""));
    }
}

function nodesEqual(node1: Node, node2: Node){
    return (node1.position.x == node2.position.x && node1.position.y == node2.position.y);
}

function aStar(maze: number[][], start: Coordinate, end: Coordinate): Coordinate[]{
    const startNode = new Node(start);
    const endNode = new Node(end);

    const openList = [startNode];
    const closedList = [];

    setInterval(() => console.log(closedList), 5000);

    while(openList.length > 0){
        openList.sort((a, b) => a.f - b.f);
        const currentNode = openList.shift();
        closedList.push(currentNode);

        if(nodesEqual(currentNode, endNode)){
            const path = [];

            let current = currentNode;
            while(current){
                path.push(current.position);
                current = current.parent;
            }

            path.reverse();
            return path;
        }

        const children: Node[] = [];
        for(const direction of allDirs.filter(d => d != mirroredMoves[currentNode.prevDirection] && d != currentNode.disabledMove())){
            const newPosition = move[direction](currentNode.position.x, currentNode.position.y);
            if(isOutOfBounds(newPosition, maze)){
                continue;
            }

            const node = new Node(newPosition, currentNode, direction);
            children.push(node);
        }

        for(const child of children){
            if(closedList.findIndex(n => nodesEqual(n, child)) >= 0){
                continue;
            }

            child.g = currentNode.g + maze[child.position.y][child.position.x];
            child.h = Math.abs(currentNode.position.x - endNode.position.x) + Math.abs(currentNode.position.y - endNode.position.y);
            child.f = child.g + child.h;
            openList.push(child);
        }
    }

    throw new Error('Unable to solve!');
}

const maze = getPuzzleInput(__dirname).map(l => l.split("").map(c => parseInt(c)));
const path = aStar(maze, {x: 0, y: 0}, {x: maze[0].length - 1, y: maze.length - 1});
path.shift(); //don't incurr the points for the first square

output(path);


const total = path.map(c => maze[c.y][c.x]).reduce((acc, val) => acc + val, 0);
console.log(total);