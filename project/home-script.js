import * as GameLogic from "./GameLogic.js"

document.addEventListener("DOMContentLoaded", () => {
    let player = new GameLogic.Player()
    player.generateHand()
    let area = document.querySelector("#test")
    area.textContent = player.displayHand(true)
})