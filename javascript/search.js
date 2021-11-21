let words = document.querySelectorAll(".signWordAll")
let copyWords = Array.from(words)
let wordCardsHolder = document.querySelectorAll(".u-repeater.u-repeater-1")
let allCardsHolder = document.querySelector(".allHolder")
let input = document.getElementById("searchbar")

let deletedWordCards = []

// let allHolder = document.getElementById("allHolder")
// let animalTab = document.getElementById("link-tab-0e15")
// let foodTab = document.getElementById("link-tab-14b7")
// let timeTab = document.getElementById("link-tab-2917")
// let peopleTab = document.getElementById("tab-93fc")
let tabsHolder = document.getElementById("tabsHolder")
let allTab = document.getElementById("link-tab-0da5")
let allCategory = document.getElementById("tab-0da5")
let categoriesHolder = document.getElementsByClassName("u-tab-content")[0]

function searchWord() {
    let inputVal = input.value
    inputVal = inputVal.toLowerCase()

    // deleting and adding cards
    for (i = 0; i < words.length; i++) {
        elem = copyWords[i].parentElement.parentElement

        if(copyWords[i].innerText.toLowerCase().includes(inputVal)) {
            // this card is part of the search
            if (deletedWordCards.includes(elem)) {
                allCardsHolder.append(elem)
            }
            // check if the wordCard exists in deletedWords
            // if it does, append it in DOM to allCardsHolder
        } else {
            // this card is not part of the search
            deletedWordCards.push(elem)
            elem.remove() // how to remove the elem only in all category
        }
    }
    

    // whenever you search
    // check which tab is currently active based on tabsHolder
    // untoggle that active tab
    // toggle the All tab
    for (let i = 0; i < tabsHolder.children.length; i++) {
        let tab = tabsHolder.children[i].children[0]
        if(tab.classList.contains("active")) {

            // toggle the current tab
            tab.classList.toggle("active")
            tab.setAttribute("aria-selected", "false")

            // change category (toggle current category and toggle all category)
            for (let m = 0; m < categoriesHolder.children.length; m++) {
                currentCategory = categoriesHolder.children[m]
                if(currentCategory.classList.contains("u-tab-active")) {
                    currentCategory.classList.toggle("u-tab-active")
                    allCategory.classList.toggle("u-tab-active")
                }
            }

            // toggle the all cards tab
            allTab.classList.toggle("active")
            allTab.setAttribute("aria-selected", "true")
            break
        }
    }

}