// Make a save and load feature, also make this feature have a weird file format so you cant cheat in coins

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
    Pair: 2
}
/**
 * symbol -> number from 1-6
 */
class Card {
    constructor(symbol) {
        this.symbol = symbol
    }
}

/**
 * @param Card[5] cards
 * @param HandType{type, pointValue} handType
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
        // TODO 
        let type = "FullHouse"
        this.handType = { type: HandType[type] }
    }

    getCardNames() {
        return [
            Symbol[this.cards[0].symbol],
            Symbol[this.cards[1].symbol],
            Symbol[this.cards[2].symbol],
            Symbol[this.cards[3].symbol],
            Symbol[this.cards[4].symbol]
        ]
    }
    /**
     * 
     * @returns {Hand}
     */
    static generateCards() {
        let newCards = [
            new Card(Math.floor(Math.random()* 6) + 1) ,
            new Card(Math.floor(Math.random()* 6) + 1) ,
            new Card(Math.floor(Math.random()* 6) + 1) ,
            new Card(Math.floor(Math.random()* 6) + 1) ,
            new Card(Math.floor(Math.random()* 6) + 1) ,
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
        let newHand = Hand.generateCards()
        return newHand
    }
    displayHand() {
        return this.hand.getCardNames()
    }
}

class Luigi extends Player {

}

export { Luigi, Player }