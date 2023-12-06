import * as GameLogic from "./GameLogic.js"

let playerCardImages = []
const player = new GameLogic.Player()
let game = true;

let coinTotal = 5;
let coinBet = 0

const errorArea = document.querySelector("#p-error")

document.addEventListener("DOMContentLoaded", () => {
    // let player = new GameLogic.Player()
    setup()

    // while (game){
    //     if (coin <= 0){
    //         game = !game
    //     }
    // }
})

/**
 * Sets up all the main functions and listeners
 */
function setup() {
    player.generateHand()

    getCardsFromHTML("#player-div")

    addPlayerClickEvent()

    showCardFront(player.displayHand())

    document.querySelector("#button-replace-card").addEventListener("click", handleDrawCards)

    document.querySelector("#button-bet").addEventListener("click", handleBet)

    changeCoinCount()
}

function handleDrawCards() {
    if (coinBet < 1) {
        errorArea.textContent = "You need to gamble"
    } else {
        let toRemove = [];
        for (let i in selectedCardToggle) {
            if (!selectedCardToggle[i]) {
                toRemove.push(i);
            }
        }
        console.log(toRemove);
        player.hand.replaceCard(toRemove);
        // Refreshes the card visual
        showCardFront(player.displayHand());
        // Refreshes the css
        playerCardImages.forEach(c => setSelectedCardStyle(c, false));
        selectedCardToggle = [true, true, true, true, true];
        errorArea.textContent = ""
    }
}

function handleBet() {
    if (coinBet < 5) {
        let betArea = document.querySelector("#bet-area")
        let img = document.createElement("img")
        img.src = "images/coin.png"
        img.className = "coin"
        betArea.appendChild(img)

        coinBet++
    } else {
        errorArea.textContent = "Don't be greedy"
    }
    console.log(coinBet)
}

function changeCoinCount() {
    document.querySelector("#coin-total").textContent = coinTotal
}

let selectedCardToggle = [true, true, true, true, true]
/**
 * adds the toggle function to each individual card
 */
function addPlayerClickEvent() {
    playerCardImages.forEach(c => {
        c.addEventListener("click", () => {
            // console.log(player.hand.cards[c.id])
            // Toggles the css for selected cards
            setSelectedCardStyle(c, selectedCardToggle[c.id])
            selectedCardToggle[c.id] = !selectedCardToggle[c.id]
        })
    })
}

/**
 * Toggles some css representing a "selected" card
 * @param {HTMLImageElement} card 
 * @param {boolean} selected 
 */
function setSelectedCardStyle(card, selected) {
    if (selected) {
        card.style.background = "red"
        card.style.padding = "5px"
    } else {
        card.style.background = ""
        card.style.padding = ""
    }
}

/**
 * Grabs the img tags from the html
 * @param {string} cardId 
 */
function getCardsFromHTML(cardId) {
    let unfilteredPlayerCardImages = document.querySelector(cardId).childNodes
    unfilteredPlayerCardImages.forEach(e => {
        if (e instanceof HTMLDivElement) {
            // For whatever reason the image in the array is surrounded by #text
            console.log(e.childNodes[1])
            playerCardImages.push(e.childNodes[1])
        }
    })
}

/**
 * Matches Card names to the img 
 * @param {[Number]} cardHand 
 */
function showCardFront(cardHand) {
    for (let i = 0; i < cardHand.length; i++) {
        playerCardImages[i].src = `images/${cardHand[i]}.png`
        // TODO id needs to be unique, luigi will also have an id
        playerCardImages[i].id = i
    }
}