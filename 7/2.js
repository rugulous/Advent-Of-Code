const {getPuzzleInput} = require("../utils");

const cardOrder = ['J','2','3','4','5','6','7','8','9','T','Q','K','A'];

function getScoreForMatches([matches, numJokers]){
    //5 of a kind = 7
    //4 of a kind = 6
    //full house = 5
    //3 of a kind = 4
    //2 pair = 3 
    //1 pair = 2
    //high card = 1

    const keys = Object.keys(matches);

    if(keys.length == 0){
        return 1; //high card
    }

    if(keys.length == 1){
        const match = matches[keys[0]] + numJokers;
        if(match >= 5){
            return 7; //5 of a kind
        }
        
        if(match >= 4){
            return 6; //4 of a kind
        }

        if(match >= 3){
            return 4; //3 of a kind
        }

        return 2; //1 pair
    }

    const match1 = matches[keys[0]];
    const match2 = matches[keys[1]];

    if(match1 == 3 || match2 == 3){
        if(numJokers >= 2){
            return 7; //5 of a kind - 3 cards + 2 jokers
        }

        if(numJokers == 1){
            return 6; //4 of a kind
        }

        return 5; //full house
    }

    return 3; //2 pair
}

function getMatches(hand){
    const matches = {};
    let numJokers = 0;

    for(let i = 0; i < hand.length; i++){
        if(hand[i] == 'J'){
            numJokers++;
            continue;
        }

        if(matches.hasOwnProperty(hand[i])){
            continue;
        }

        let matchCount = 0;
        for(let j = i + 1; j < hand.length; j++){
            if(hand[i] == hand[j]){
                matchCount++;
            }
        }

        if(matchCount > 0){
            matches[hand[i]] = matchCount + 1;
        }
    }

    return [matches, numJokers];
}

function parseInput(line){
    const data = line.split(" ");
    return {
        hand: data[0],
        bid: parseInt(data[1]),
        score: 0
    };
}

function rankHands(hands){
    hands.forEach(hand => {
        console.log(`Parsing hand ${hand.hand}...`);

        const matches = getMatches(hand.hand);
        console.log(matches);

        const score = getScoreForMatches(matches);
        console.log(`Calculated score: ${score}`);

        hand.score = score;
        console.log("-----");
        console.log();
    });

    hands.sort((a,b) => {
        if(a.score != b.score){
            return a.score - b.score;
        }

        for(let i = 0; i < a.hand.length; i++){
            const aCardScore = cardOrder.indexOf(a.hand[i]);
            const bCardScore = cardOrder.indexOf(b.hand[i]);

            if(aCardScore != bCardScore){
                return aCardScore - bCardScore;
            }
        }
    });

    return hands;
}

const input = getPuzzleInput(__dirname, "example.txt").map(parseInput);
const hands = rankHands(input);
console.log(hands);
const winnings = hands.reduce((acc, val, index) => acc + (val.bid * (index + 1)), 0);
console.log(winnings);