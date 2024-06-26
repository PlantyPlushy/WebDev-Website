document.addEventListener("DOMContentLoaded", async () => {
    await main()
})

// Global vars for sound control
let soundToggle = true;
const soundFile = new Audio("sounds/funky-town-low-quality.mp3")

async function main() {
    await populateWeeklyReadings()
    setInterval(animateCursor, 1000)
    document.querySelector("#title").addEventListener("click", () => initSound(soundFile))
}

// Flips the sprite used on the cursor every second
function animateCursor() {
    document.querySelector("body").classList.toggle("flipped")
}

async function initSound(sound) {
    if (soundToggle) {
        await sound.play()
        soundToggle = !soundToggle
    } else {
        // Pauses the audio and then sets the track back to the beginning
        sound.pause()
        sound.currentTime = 0
        soundToggle = !soundToggle
    }
}

async function populateWeeklyReadings() {
    const readingSection = document.querySelector("#weekly-reading")
    let data = await fetchData("readings.json")

    if (readingSection == null) {
        console.error("section doesn't exist")
    } else if (data == null) {
        console.error("data is empty")
    } else {
        populateReadingSection(data, readingSection)
    }
}

function populateReadingSection(jsonData, section) {

    jsonData.reverse()
    for (readingObject in jsonData) {
        // Prepare needed elements
        let newReadingParent = document.createElement("div")
        let title = document.createElement("h2")
        let question = document.createElement("strong")
        let answer = document.createElement("p")

        // Name the class
        newReadingParent.className = "question-answer"
        title.className = "readingweek-h2-title"

        // Add the data
        title.textContent = jsonData[readingObject].title
        question.textContent = jsonData[readingObject].question
        answer.textContent = jsonData[readingObject].answer

        // Append to the div
        newReadingParent.append(title, question, answer)

        // Append to the section on the website
        section.appendChild(newReadingParent)
    }
}

/**
 * performs fetch request for a given filename
 * @param {string} fileName 
 * @returns {Promise<json>}
 */
async function fetchData(fileName) {
    let promise = await fetch(`./${fileName}`)
    if (promise.status == 200) {
        return await promise.json()
    } else {
        console.error("promise status not 200")
        return null
    }
}
