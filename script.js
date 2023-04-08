let secondsLeft = 120;
var countdown = setInterval(startCountdown, 1000);


let selectedCategories = JSON.parse(sessionStorage.getItem("selectedCategories"));
let numberOfQuestions = sessionStorage.getItem("numberOfQuestions");

let api_url = `https://the-trivia-api.com/api/questions?${selectedCategories}limit=${numberOfQuestions}`

function fetchData() {
    fetch(api_url)
    .then(response => {
        return response.json();
    }).then(data => {
        questionString = JSON.stringify(data);
        //questionsString.replace('"',"'");
        console.log(data);
        questions = JSON.parse(questionString);
        displayQuestions();
        startCountdown();
    })
}

//const questionsString
//const questions = JSON.parse(questionsString);
var questionsString;
var questions;
fetchData();

//const questions = json;



function displayQuestions() {
    let questionsHTML = '';
    questions.forEach(currentQuestion => {
        let answersHTML = getAnswers(currentQuestion);
        
        questionsHTML += `
            <div class="row">
                <div class="col">
                    <h5 class="mb-4 mt-4">${currentQuestion.question.replace('"',"'")}</h5>
                </div>
            </div>
            <div class="row">
                ${answersHTML.join('')}
            </div>
            <br>
            <hr>
        `
    });

    document.getElementById('quizWrapper').innerHTML = questionsHTML;
    
}

function getAnswers(question) {
    let answers = question.incorrectAnswers;
    answers.push(question.correctAnswer)
    let answersHTML = [];

    let idCounter = 0;

    answers.forEach(answer => {

        let answerText = answer;
        answer = answer.replace(/['"]+/g, '');
    
        answersHTML.push(`
                    <div class="col-12 radio_button">
                        <input type="radio" name="${question.id}" id="${question.id}_${answer}" value="${answer}">
                        <label for="${question.id}_${answer}"><span class="radio_button">${answerText}</span></label>
                    </div>
            `)
    });

    return shuffleAnswers(answersHTML);
}

function shuffleAnswers(answers) {
    let answersShuffled = [];

    answers.forEach(answer => { 
        answersShuffled.push('');     
    })

    let index = Math.floor(Math.random() * answersShuffled.length);
    let indexNetacnog = 0;

    for (let i=0; i < answers.length; i++) {
        if (i == index) {
            answersShuffled[i] = answers[answers.length - 1];
        } else {
            answersShuffled[i] = answers[indexNetacnog];
            indexNetacnog += 1;
        }
    }
    return answersShuffled;
}

function getAnswer(questionID) {
    let answer = document.querySelector(`input[name="${questionID}"]:checked`)
    if (answer != null) {
    return document.querySelector(`input[name="${questionID}"]:checked`).value;
    } else {
        return null
    }
}

function submitAnswers() {
    var points = 0;
    stopCountdown();
     
    questions.forEach(question => {
        let answer_ = getAnswer(question.id);
        if (answer_ != null) {
            answer_ = answer_.replace(/['"]+/g, '');
        }
        let checkedSpan = document.querySelector(`label[for="${question.id}_${answer_}"]>span`);
        document.querySelector(`label[for="${question.id}_${question.correctAnswer.replace(/['"]+/g, '')}"]>span`).classList.add("correct-unanswered")
        if(answer_ == question.correctAnswer.replace(/['"]+/g, '')) {
            points += 1;
            checkedSpan.classList.add("correct-answer")
        } else if (checkedSpan != null) {
            checkedSpan.classList.add("wrong-answer")
        }
        
    })
    document.getElementById("submitAnswersButton").classList.add("disabled");
    document.getElementById("quizWrapper").classList.add("dissabled-mouse");
    alert(points);
}

/*function startCountdown() {
    let secondsLeft = 10;
    function secondLess() {
        document.getElementById("timer").innerHTML = `<h4>Time left:</h4><h1>${secondsLeft}</h1>`
        
        if (secondsLeft < 0) {
            document.getElementById("timer").innerHTML= "<h4>Time out!</h4>"
            stopCountdown()
            submitAnswers();            
        }
        secondsLeft -= 1;
        
    }
    var countdown = setInterval(secondLess, 1000);
}*/


    function startCountdown() {
        document.getElementById("timer").innerHTML = `<h4>Time left:</h4><h1>${secondsLeft}</h1>`
        if (secondsLeft < 0) {
            document.getElementById("timer").innerHTML= "<h4>Time out!</h4>"
            stopCountdown()
            submitAnswers();            
        }
        secondsLeft -= 1;
    }

function stopCountdown() {
    clearInterval(countdown);
    document.getElementById("timer").innerHTML= "<h4>Done!</h4>"
}





//displayQuestions(); 
