import { getPuzzleInput } from "../../utils";

const cache = {};

function mix(value: bigint, secret: bigint) {
    return value ^ secret;
}

function prune(num: bigint) {
    return num % BigInt(16777216);
}

function getNextValue(secret: bigint) {
    const cacheKey = secret.toString();

    if(cache.hasOwnProperty(cacheKey)){
        return cache[cacheKey];
    }

    let number: bigint = secret * BigInt(64);
    number = mix(number, secret);
    secret = prune(number);

    number = secret / BigInt(32);
    number = mix(number, secret);
    secret = prune(number);

    number = secret * BigInt(2048);
    number = mix(number, secret);
    secret = prune(number);

    cache[cacheKey] = secret;
    return secret;
}

const numbers = getPuzzleInput(__dirname).map(x => BigInt(x));

let total = BigInt(0);

for (const num of numbers) {
    let secret = num;
    for (let i = 0; i < 2000; i++) {
        secret = getNextValue(secret);
    }
    
    total += secret;
}

console.log(total);