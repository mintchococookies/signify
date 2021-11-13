let words = document.querySelectorAll(".signWord")
let copyWords = Array.from(words)
let wordCardsHolder = document.querySelectorAll(".u-repeater.u-repeater-1")
let allCardsHolder = document.querySelector(".allHolder")
let input = document.getElementById("searchbar")

let deletedWordCards = []

function searchWord() {
    let inputVal = input.value
    inputVal = inputVal.toLowerCase()
    
    for (i = 0; i < words.length; i++) {
        elem = copyWords[i].parentElement.parentElement

        if(copyWords[i].innerText.toLowerCase().includes(inputVal)) {
            // console.log("this card is part of the search")
            if (deletedWordCards.includes(elem)) {
                console.log("deleted words array has this card");
                allCardsHolder.append(elem)
            }
            // check if the wordCard exists in deletedWords
            // if not, append it DOM to wordCardsHolder
        } else {
            // console.log("this card is not part of the search")
            deletedWordCards.push(elem)
            elem.remove()
        }
    }
}