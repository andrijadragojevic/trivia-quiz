function fetchData() {
    fetch('https://the-trivia-api.com/api/questions/')
    .then(response => {
        return response.json();
    }).then(data => {
        questions = data;
        displayQuestions();
    })
}

//const questionsString
//const questions = JSON.parse(questionsString);

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
                    <h5 class="mb-3 mt-5">${currentQuestion.question}</h5>
                </div>
            </div>
            <div class="row">
                ${answersHTML.join('')}
            </div>
        `
    });

    document.getElementById('quizWrapper').innerHTML = questionsHTML;
    
}

function getAnswers(question) {
    let answers = question.incorrectAnswers;
    answers.push(question.correctAnswer);
    let answersHTML = [];

    answers.forEach(answer => {
    
        answersHTML.push(`
                    <div class="col-12">
                        <input type="radio" name="${question.id}" id="${question.id}_${answer}" value="${answer}">
                        <label for="${question.id}_${answer}">${answer}</label>
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

    let index = Math.floor(Math.random()*4);
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
    return document.querySelector(`input[name="${questionID}"]:checked`).value;
}

function submitAnswers() {
    var points = 0;

    questions.forEach(question => {
        if(getAnswer(question.id) == question.correctAnswer) {
            points += 1;
        }
    })
    alert(points);
}


//displayQuestions(); 
