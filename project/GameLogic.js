function countOccurrences(array, query){
    let count = 0;
    for(let i=0; i<array.length; i++)
        if (array[i]===query)
            count++;
    return count;
}
const Symbol = {
    6: "Star",
    5: "Luigi",
    4: "Mario",
    3: "Flower",
    2: "Mushroom",
    1: "Cloud"
}
const HandType = {
    FullHouse: 16,
    Four: 8,
    ThreePair: 6,
    Three: 4,
    PairPair: 3,
    Pair: 2,
    None: 1
}
/**
 * symbol -> number from 1-6
 */
class Card {
    /**
     * 
     * @param {Number} symbol 
     */
    constructor(symbol) {
        this.symbol = symbol
    }
}

/**
 * @param Card[5] cards
 * @param HandType{type, pointValue} handType
 * @param score{type: HandType, highestSymbol}
 * this will be used for comparing luigi and player hands
 */
class Hand {
    /**
     * 
     * @param {[Card]} cards a hand of cards of length 5
     */
    constructor(cards) {
        this.cards = cards
    }
    // full house, three of a kind, 2 of a kind etc
    DetermineHandType() {
        let type;
        let typeNumber = 50
        let highSymbolScore = 1
        let highTypeNumber = 1
        let occurrenceArr = []
        
        let cardNumberArr = this.getCardNumbers().sort()
        for (let i = 0; i < 6; i++){
            let occurrences = countOccurrences(cardNumberArr, i + 1)
            occurrenceArr.push(occurrences)
            if (occurrences > highTypeNumber) {
                highSymbolScore = i + 1
            }
        }

        let filteredTypeNumber = occurrenceArr.filter(e => e > 1)
        filteredTypeNumber.sort().reverse()
        if (filteredTypeNumber.length === 2) {
            typeNumber = `${filteredTypeNumber[0]}${filteredTypeNumber[1]}`
        } else if (filteredTypeNumber.length === 1) {
            typeNumber = `${filteredTypeNumber[0]}0`
        } else {
            typeNumber = 0
        }

        switch (typeNumber) {
            case "50":
                type = "FullHouse"
                break;
            case "40":
                type = "Four"
                break;
            case "32":
                type = "ThreePair"
                break;
            case "30":
                type = "Three"
                break;
            case "22":
                type = "PairPair"
                break;
            case "20":
                type = "Pair"
                break;
            default:
                type = "None"
                break;
        }
        this.handType = { type: HandType[type] }
        this.score = {
            type: this.handType.type,
            highestSymbol: highSymbolScore
        }
        return this.handType.type
    }

    /**
     * 
     * @param {boolean} sorted 
     * @returns {[Number]}
     */
    getCardNames(sorted = false) {
        let cardNumbers
        if (sorted) {
            cardNumbers = this.getCardNumbers().sort()
        } else {
            cardNumbers = this.getCardNumbers()
        }
        return [
            Symbol[cardNumbers[0]],
            Symbol[cardNumbers[1]],
            Symbol[cardNumbers[2]],
            Symbol[cardNumbers[3]],
            Symbol[cardNumbers[4]],
        ]
    }
    getCardNumbers() {
        return [
            this.cards[0].symbol,
            this.cards[1].symbol,
            this.cards[2].symbol,
            this.cards[3].symbol,
            this.cards[4].symbol,
        ]
    }
    /**
     * 
     * @param {[Number]} arrIndexes 
     */
    replaceCard(arrIndexes){
        for (let index in arrIndexes){
            this.cards[arrIndexes[index]] = new Card(Math.floor(Math.random() * 6) + 1)
        }
    }
    /**
     * 
     * @returns {Hand}
     */
    static generateCards() {
        let newCards = [
            new Card(Math.floor(Math.random() * 6) + 1),
            new Card(Math.floor(Math.random() * 6) + 1),
            new Card(Math.floor(Math.random() * 6) + 1),
            new Card(Math.floor(Math.random() * 6) + 1),
            new Card(Math.floor(Math.random() * 6) + 1),
        ]
        return new Hand(newCards)
    }
}

class Player {
    /**
     * 
     * @param {Hand} hand 
     */
    constructor() {
        this.hand = this.generateHand()
    }
    /**
     * 
     * @returns {Hand}
     */
    generateHand() {
        return Hand.generateCards()
    }
    /**
     * 
     * @param {boolean} sort 
     * @returns {[Number]}
     */
    displayHand(sort = false) {
        return this.hand.getCardNames(sort)
    }
}

class Luigi extends Player {

}

export { Luigi, Player }