document.addEventListener("DOMContentLoaded", main)

function main() {
    populateWeeklyReadings()
}

function populateWeeklyReadings(){
    let readingSection = document.querySelector("#weekly-reading")
    
    if (readingSection == null) {
        console.error("section doesn't exist")
    } else {
        // Add the new reading answer
        let newReadingElement = document.createElement("h2")
        newReadingElement.textContent = "Test"

        readingSection.appendChild(newReadingElement)
    }
}
