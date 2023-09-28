document.addEventListener("DOMContentLoaded", main)

function main() {
    populateWeeklyReadings()
}

function populateWeeklyReadings(){
    let readingSection = document.querySelector("#weekly-reading")
    
    if (readingSection == null) {
        console.error("section doesn't exist")
    } else {

        console.log(data)
        // Prepare needed elements
        let newReadingParent = document.createElement("div")
        let title = document.createElement("h2")
        let question = document.createElement("strong")
        let answer = document.createElement("p")

        // Add the data
        title.textContent = "title"
        question.textContent = "question"
        answer.textContent = "answer"

        // Append to the div
        newReadingParent.append(title,question,answer)

        // Append to the section on the website
        readingSection.appendChild(newReadingParent)
    }
}
