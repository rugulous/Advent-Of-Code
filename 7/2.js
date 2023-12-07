const {getPuzzleInput} = require("../utils");

//general algorithm
//- extract hands
//- allocate a score
//  - 5 of a kind = 7
//  - 4 of a kind = 6
//  - full house = 5
//  - 3 of a kind = 4
//  - 2 pair = 3 
//  - 1 pair = 2
//  - high card = 1
//
//- sort by score
//- if scores are equal, compare cards using below order
//- multiply (sortedPos + 1) by bid
//- return sum

const cardOrder = ['J','2','3','4','5','6','7','8','9','T','Q','K','A'];

function scoreOnlyJokers(numJokers){
    if(numJokers == 0){
        return 1; //high card
    }

    if(numJokers == 1){
        return 2; //1 pair
    }

    if(numJokers == 2){
        return 4; //3 of a kind
    }

    if(numJokers == 3){
        return 6; //4 of a kind
    }

    return 7; //5 of a kind
}

function getScoreForOneMatch(numCards, numJokers){
    const match = numCards + numJokers;

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

function getScoreForTwoMatches(match1, match2, numJokers){
    const highest = Math.max(match1, match2);

    if(highest == 3){
        if(numJokers >= 2){
            return 7; //5 of a kind - 3 cards + 2 jokers
        }

        if(numJokers == 1){
            return 6; //4 of a kind
        }

        return 5; //full house
    }

    if(numJokers >= 1){
        return 5; //full house - (2 cards + joker) + 2 cards
    }

    return 3; //2 pair
}

function getScoreForMatches([matches, numJokers]){
    const keys = Object.keys(matches);

    if(keys.length == 0){
        return scoreOnlyJokers(numJokers);
    }

    if(keys.length == 1){
        return getScoreForOneMatch(matches[keys[0]], numJokers);
    }

    return getScoreForTwoMatches(matches[keys[0]], matches[keys[1]], numJokers);

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
    hands.forEach(hand => hand.score = getScoreForMatches(getMatches(hand.hand)));

    hands.sort((a,b) => {
        if(a.score != b.score){
            return a.score - b.score;
        }

        for(let i = 0; i < a.hand.length; i++){
            if(a.hand[i] == b.hand[i]){
                continue;
            }

            return cardOrder.indexOf(a.hand[i]) - cardOrder.indexOf(b.hand[i]);
        }
    });

    return hands;
}

const input = getPuzzleInput(__dirname).map(parseInput);
const hands = rankHands(input);

const winnings = hands.reduce((acc, val, index) => acc + (val.bid * (index + 1)), 0);
console.log(winnings);