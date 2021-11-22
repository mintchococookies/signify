const word = "WORD";
const exampleSentence = "EXAMPLE SENTENCE";
let vid11 = document.getElementById("video11");
let checkbox11 = document.getElementById("switchVideoType11");
let text11 = document.getElementById("text11");

function switchVideoType11(){
    if (checkbox11.checked === true){
        text11.innerHTML = word;
        vid11.src = "images/banana.mp4";
        vid11.load();
    }
    else if (checkbox11.checked === false){
        text11.innerHTML = exampleSentence;
        vid11.src = "images/apple.mp4";
        vid11.load();
    }
}