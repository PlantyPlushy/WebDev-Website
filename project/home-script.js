import * as GameLogic from "./GameLogic.js"

let playerCardImages = []
const player = new GameLogic.Player()

document.addEventListener("DOMContentLoaded", () => {
    // let player = new GameLogic.Player()
    player.generateHand()
    let area = document.querySelector("#test")
    area.textContent = player.displayHand()
    area.appendChild(document.createElement("br"))
    area.innerHTML += player.hand.DetermineHandType()

    getCardsFromHTML("#player-div")

    addPlayerClickEvent()

    showCardFront(player.displayHand())

    document.querySelector("#button-replace-card").addEventListener("click", () => {
        let toRemove = []
        for (let i in selectedCardToggle) {
            if (!selectedCardToggle[i]) {
                toRemove.push(i)
            }
        }
        player.hand.replaceCard(toRemove)
        // Refreshes the card visual
        showCardFront(player.displayHand())
        // Refreshes the css
        playerCardImages.forEach(c => setSelectedCardStyle(c, false))
        selectedCardToggle = [true, true, true, true, true]
    })
})

let selectedCardToggle = [true, true, true, true, true]
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
 * 
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
 * 
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
 * 
 * @param {Array} cardHand 
 */
function showCardFront(cardHand) {
    for (let i = 0; i < cardHand.length; i++) {
        playerCardImages[i].src = `images/${cardHand[i]}.png`
        // TODO id needs to be unique, luigi will also have an id
        playerCardImages[i].id = i
    }
}