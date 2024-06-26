import * as GameLogic from "./GameLogic.js"

let playerCardImages = []
let luigiCardImages = []
const player = new GameLogic.Player()
const luigi = new GameLogic.Luigi()
let game = true;

let coinTotal = 5;
let coinBet = 0

const errorArea = document.querySelector("#p-error")
const gameStatusArea = document.querySelector("#p-status")

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
    luigi.generateHand()

    getCardsFromHTML("#player-div", playerCardImages)
    getCardsFromHTML("#luigi-div", luigiCardImages)

    addPlayerClickEvent()

    showCardFront(player.displayHand(), playerCardImages)

    document.querySelector("#button-replace-card").addEventListener("click", handleDrawCards)

    document.querySelector("#button-bet").addEventListener("click", handleBet)

    changeCoinCount()
}

async function handleDrawCards() {
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
        showCardFront(player.displayHand(), playerCardImages);
        // Refreshes the css
        playerCardImages.forEach(c => setSelectedCardStyle(c, false));
        selectedCardToggle = [true, true, true, true, true];
        errorArea.textContent = ""

        await gameAnimation()
    }
}

async function gameAnimation() {
    await sleep(1500)
    showCardFront(player.displayHand(true), playerCardImages)

    // Luigi Card flipping
    await sleep(1500)
    showCardFront(luigi.displayHand(true), luigiCardImages)

    await sleep(1500)
    let playerHandType = player.hand.DetermineHandType()
    let luigiHandType = luigi.hand.DetermineHandType()

    if (playerHandType > luigiHandType) {
        // win
        coinTotal = coinTotal + (coinBet * playerHandType)
        gameStatusArea.textContent = `Win!     +${coinBet * playerHandType}`
    } else if (playerHandType < luigiHandType) {
        // loss
        coinTotal = coinTotal - (coinBet * luigiHandType)
        gameStatusArea.textContent = `Loss     -${coinBet * luigiHandType}`
    } else {
        // tie
        if (player.hand.score.highestSymbol > luigi.hand.score.highestSymbol) {
            // win
            coinTotal = coinTotal + (coinBet * playerHandType)
            gameStatusArea.textContent = `Win!     +${coinBet * playerHandType}`
        } else if (player.hand.score.highestSymbol < luigi.hand.score.highestSymbol) {
            // loss
            coinTotal = coinTotal - (coinBet * luigiHandType)
            gameStatusArea.textContent = `Loss     -${coinBet * luigiHandType}`
        } else {
            // tie nothing happens
            gameStatusArea.textContent = `Tie`
        }
    }
    changeCoinCount()

    await sleep(2500)

    if (coinTotal < 1) {
        errorArea.textContent = "YOU LOSE >:) \n Reload page and try again"
        document.querySelector("#button-bet").disabled = true
        document.querySelector("#button-replace-card").disabled = true
    } else {
        reset()
    }
}

function reset() {
    // Reset the status bar
    gameStatusArea.textContent = ""

    // Reset the bets
    coinBet = 0
    document.querySelector("#coin-image-area").innerHTML = ""

    // Reset luigi's cards
    showCardFront(["Cardback", "Cardback", "Cardback", "Cardback", "Cardback"], luigiCardImages)
    luigi.generateHand()

    // Reroll player's cards
    player.generateHand()
    showCardFront(player.displayHand(), playerCardImages)
}

function handleBet() {
    if (coinBet < 5) {
        let coinImages = document.querySelector("#coin-image-area")
        let img = document.createElement("img")
        img.src = "images/coin.png"
        img.className = "coin"
        coinImages.appendChild(img)

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
        card.classList.add("selected")
    } else {
        card.classList.remove("selected")
    }
}

/**
 * Grabs the img tags from the html
 * @param {string} cardId 
 */
function getCardsFromHTML(cardId, cardImages) {
    let unfilteredPlayerCardImages = document.querySelector(cardId).childNodes
    unfilteredPlayerCardImages.forEach(e => {
        if (e instanceof HTMLDivElement) {
            // For whatever reason the image in the array is surrounded by #text
            // console.log(e.childNodes[1])
            cardImages.push(e.childNodes[1])
        }
    })
    console.log(cardImages)
}

/**
 * Matches Card names to the img 
 * @param {[Number]} cardHand 
 */
function showCardFront(cardHand, cardImages) {
    for (let i = 0; i < cardHand.length; i++) {
        cardImages[i].src = `images/${cardHand[i]}.png`
        // TODO id needs to be unique, luigi will also have an id
        cardImages[i].id = i
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}