var ques_amt = 5; //the number of questions
var category_list = ["All", "Food", "Time", "People", "Colors", "Animals"]; //the names of categories

//insert all the data here (or move this to a seperate js file)
var category1 = [
    { video: "images/banana.mp4", answer: "word1" },
    { video: "images/banana.mp4", answer: "word2" },
    { video: "images/banana.mp4", answer: "word3" },
    { video: "images/banana.mp4", answer: "word4" },
    { video: "images/banana.mp4", answer: "word5" },
    { video: "images/banana.mp4", answer: "word6" }
];
var category2 = [
    { video: "images/banana.mp4", answer: "word1" },
    { video: "images/banana.mp4", answer: "word2" },
    { video: "images/banana.mp4", answer: "word3" },
    { video: "images/banana.mp4", answer: "word4" },
    { video: "images/banana.mp4", answer: "word5" },
    { video: "images/banana.mp4", answer: "word6" }
];
var category3 = [
    { video: "images/banana.mp4", answer: "word1" },
    { video: "images/banana.mp4", answer: "word2" },
    { video: "images/banana.mp4", answer: "word3" },
    { video: "images/banana.mp4", answer: "word4" },
    { video: "images/banana.mp4", answer: "word5" },
    { video: "images/banana.mp4", answer: "word6" }
];
var category4 = [
    { video: "images/banana.mp4", answer: "word1" },
    { video: "images/banana.mp4", answer: "word2" },
    { video: "images/banana.mp4", answer: "word3" },
    { video: "images/banana.mp4", answer: "word4" },
    { video: "images/banana.mp4", answer: "word5" },
    { video: "images/banana.mp4", answer: "word6" }
];
var category5 = [
    { video: "images/banana.mp4", answer: "word1" },
    { video: "images/banana.mp4", answer: "word2" },
    { video: "images/banana.mp4", answer: "word3" },
    { video: "images/banana.mp4", answer: "word4" },
    { video: "images/banana.mp4", answer: "word5" },
    { video: "images/banana.mp4", answer: "word6" }
];
var category6 = [
    { video: "images/banana.mp4", answer: "word1" },
    { video: "images/banana.mp4", answer: "word2" },
    { video: "images/banana.mp4", answer: "word3" },
    { video: "images/banana.mp4", answer: "word4" },
    { video: "images/banana.mp4", answer: "word5" },
    { video: "images/banana.mp4", answer: "word6" }
];

var category;
var word_list;
var score = 0;
var feedback;
var cat_key;

function selectCategory(elem) {
    if (elem.id == "category-1") {
        cat_key = 1;
    }
    if (elem.id == "category-2") {
        cat_key = 2;
    }
    if (elem.id == "category-3") {
        cat_key = 3;
    }
    if (elem.id == "category-4") {
        cat_key = 4;
    }
    if (elem.id == "category-5") {
        cat_key = 5;
    }
    if (elem.id == "category-6") {
        cat_key = 6;
    }
    sessionStorage.setItem("catkey", cat_key);
    window.location.href = "Game.html";
}

function setCategory() {
    if (sessionStorage.getItem("catkey") == 1) {
        word_list = category1;
        category = "Category: " + category_list[0];
    }
    if (sessionStorage.getItem("catkey") == 2) {
        word_list = category2;
        category = "Category: " + category_list[1];
    }
    if (sessionStorage.getItem("catkey") == 3) {
        word_list = category3;
        category = "Category: " + category_list[2];
    }
    if (sessionStorage.getItem("catkey") == 4) {
        word_list = category4;
        category = "Category: " + category_list[3];
    }
    if (sessionStorage.getItem("catkey") == 5) {
        word_list = category5;
        category = "Category: " + category_list[4];
    }
    if (sessionStorage.getItem("catkey") == 6) {
        word_list = category6;
        category = "Category: " + category_list[5];
    }
    document.getElementById("quiz-category").innerHTML = category;
}

function shuffle(myArray) {
    var i = myArray.length;
    if (i == 0) return false;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempi = myArray[i];
        var tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
    }
}

function getQuestions() {
    var ques_options = [...word_list];
    var options = [];
    var questions = []; //the array of all 5 questions to be asked
    var ans_options = [];

    for (let i = 0; i < 5; i++) {
        let index = Math.floor(Math.random() * ques_options.length);
        let ques_obj = ques_options[index];
        let ques = ques_options[index].video; //get a video from the remaining questions list
        let ans = ques_options[index].answer; //get the corresponding answer
        options.push(ques_options[index].answer); //save the answer to the options list
        ques_options.splice(index, 1); //remove the asked question from the remaining questions list

        ans_options = [...word_list];
        var options_index = ans_options.indexOf(ques_obj);
        ans_options.splice(options_index, 1); //list from which to get the other options (excluding the correct answer one)
        shuffle(ans_options);
        for (let i = 0; i < 3; i++) {
            options.push(ans_options[i].answer);
        }
        shuffle(options);
        questions.push({ ques: ques, ans: ans, options: options });
        options = [];
    }
    return questions;
}
var q = 0;
var correct_btn;
var option_btns = [document.getElementById("quiz-op-1"), document.getElementById("quiz-op-2"), document.getElementById("quiz-op-3"), document.getElementById("quiz-op-4")];
function displayQuestion(questions) {
    document.getElementById("quiz-no").innerHTML = (q + 1) + " / 5"
    document.getElementById("quiz-video").src = questions[q].ques;

    for (let i = 0; i < 4; i++) {
        option_btns[i].innerHTML = questions[q].options[i];
        if (option_btns[i].innerHTML == questions[q].ans) {
            correct_btn = option_btns[i];
        }
    }
    document.getElementById("next-btn").classList.add("hide-btn");

    for (let i = 0; i < 4; i++) {
        option_btns[i].classList.remove("disabled");
        option_btns[i].classList.remove("quiz-incorrect");
        option_btns[i].classList.remove("quiz-correct");
    }
}

function checkAnswer(elem) {
    let user_ans = elem.innerHTML;
    if (user_ans == questions[q].ans) {
        console.log("correct");
        elem.classList.add("quiz-correct");
        score += 1;
    }
    else if (user_ans != questions[q].ans && user_ans != null) {
        console.log("wrong");
        elem.classList.add("quiz-incorrect");
        correct_btn.classList.add("quiz-correct");
    }
    for (let i = 0; i < 4; i++) {
        option_btns[i].classList.add("disabled");
    }
    document.getElementById("next-btn").classList.remove("hide-btn");
}

setCategory();
questions = getQuestions();

displayQuestion(questions);
document.getElementById('next-btn').onclick = function () {
    if (q < (ques_amt) - 1) {
        q += 1;
        displayQuestion(questions);
        if (q == (ques_amt) - 1) {
            document.getElementById("next-btn").innerHTML = "Finish";
        }
    }
    else if (q == (ques_amt) - 1) {
        if (score > 3) {
            feedback = "Well Done!"
        }
        else {
            feedback = "Good try. You can do it!"
        }
        sessionStorage.setItem("score", score);
        sessionStorage.setItem("feedback", feedback);
        window.location.href = "Score.html";
    }
};
