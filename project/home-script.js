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
})

function addPlayerClickEvent() {
    playerCardImages.forEach(c => {
        c.addEventListener("click", () => {
            console.log(player.hand.cards[c.id])
        })
    })
}

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

function showCardFront(cardHand) {
    for (let i = 0; i < cardHand.length; i++) {
        playerCardImages[i].src = `images/${cardHand[i]}.png`
        // TODO id needs to be unique, luigi will also have an id
        playerCardImages[i].id = i
    }
    // console.log(playerCardImages)
}
