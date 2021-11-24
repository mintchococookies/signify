var ques_amt = 5; //the number of questions
var category_list = ["All", "Animals", "Feelings", "Occupations", "Questions"]; //the names of categories

//insert all the data here (or move this to a seperate js file)

//ANIMALS
var category1 = [
    { video: "sign language videos/animals/chicken.mp4", answer: "CHICKEN<br><i>AYAM</i>" },
    { video: "sign language videos/animals/cat.mp4", answer: "CAT<br><i>KUCING</i>" },
    { video: "sign language videos/animals/cow.mp4", answer: "COW<br><i>LEMBU</i>" },
    { video: "sign language videos/animals/goat.mp4", answer: "GOAT<br><i>KAMBING</i>" },
    { video: "sign language videos/animals/mouse.mp4", answer: "MOUSE<br><i>TIKUS</i>" },
    { video: "sign language videos/animals/rabbit.mp4", answer: "RABBIT<br><i>ARNAB</i>" }
];
//FEELINGS
var category2 = [
    { video: "sign language videos/feelings/love.mp4", answer: "LOVE<br><i>SAYANG</i>" },
    { video: "sign language videos/feelings/like.mp4", answer: "LIKE<br><i>SUKA</i>" },
    { video: "sign language videos/feelings/angry.mp4", answer: "ANGRY<br><i>MARAH</i>" },
    { video: "sign language videos/feelings/miss.mp4", answer: "MISS<br><i>RINDU</i>" },
    { video: "sign language videos/feelings/worry.mp4", answer: "WORRY<br><i>RISAU</i>" },
    { video: "sign language videos/feelings/hate.mp4", answer: "HATE<br><i>BENCI</i>" }
];
//OCCUPATIONS
var category3 = [
    { video: "sign language videos/occupations/police.mp4", answer: "POLICE<br><i>POLIS</i>" },
    { video: "sign language videos/occupations/teacher.mp4", answer: "TEACHER<br><i>CIKGU</i>" },
    { video: "sign language videos/occupations/firefighter.mp4", answer: "FIREFIGHTER<br><i>BOMBA</i>" },
    { video: "sign language videos/occupations/chef.mp4", answer: "CHEF<br><i>TUKANG MASAK</i>" },
    { video: "sign language videos/occupations/doctor.mp4", answer: "DOCTOR<br><i>DOKTOR</i>" },
    { video: "sign language videos/occupations/clerk.mp4", answer: "CLERK<br><i>KERANI</i>" }
];
//QUESTIONS
var category4 = [
    { video: "sign language videos/questions/who.mp4", answer: "WHO<br><i>SIAPA</i>" },
    { video: "sign language videos/questions/howmuch.mp4", answer: "HOW MUCH<br><i>BERAPA</i>" },
    { video: "sign language videos/questions/what.mp4", answer: "WHAT<br><i>APA</i>" },
    { video: "sign language videos/questions/where.mp4", answer: "WHERE<br><i>MANA</i>" },
    { video: "sign language videos/questions/when.mp4", answer: "WHEN<br><i>BILA</i>" },
    { video: "sign language videos/questions/how.mp4", answer: "HOW<br><i>BAGAIMANA</i>" }
];
var category_all = [];
category_all.push(...category1, ...category2, ...category3, ...category4);

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
    sessionStorage.setItem("catkey", cat_key);
    window.location.href = "Game.html";
}

function setCategory() {
    if (sessionStorage.getItem("catkey") == 1) {
        word_list = category_all;
        category = "Category: " + category_list[0];
    }
    if (sessionStorage.getItem("catkey") == 2) {
        word_list = category1;
        category = "Category: " + category_list[1];
    }
    if (sessionStorage.getItem("catkey") == 3) {
        word_list = category2;
        category = "Category: " + category_list[2];
    }
    if (sessionStorage.getItem("catkey") == 4) {
        word_list = category3;
        category = "Category: " + category_list[3];
    }
    if (sessionStorage.getItem("catkey") == 5) {
        word_list = category4;
        category = "Category: " + category_list[4];
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
