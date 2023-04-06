let questionsString = `[
    {
        "category": "History",
        "id": "62611f854b176d54800e3d5f",
        "correctAnswer": "2015",
        "incorrectAnswers": [
            "2000",
            "1993",
            "2004"
        ],
        "question": "In which year was the creation of the first artificial heart?",
        "tags": [
            "events",
            "inventions",
            "medicine",
            "history"
        ],
        "type": "Multiple Choice",
        "difficulty": "hard",
        "regions": [],
        "isNiche": false
    },
    {
        "category": "General Knowledge",
        "id": "622a1c3e7cc59eab6f95226c",
        "correctAnswer": "Brakes",
        "incorrectAnswers": [
            "Steering Wheel",
            "Engine",
            "Exhaust Pipe"
        ],
        "question": "In a car, what might be disc or drum?",
        "tags": [
            "motoring",
            "general_knowledge"
        ],
        "type": "Multiple Choice",
        "difficulty": "easy",
        "regions": [],
        "isNiche": false
    },
    {
        "category": "General Knowledge",
        "id": "622a1c3d7cc59eab6f951c61",
        "correctAnswer": "Mickey Rooney",
        "incorrectAnswers": [
            "Mick Jagger",
            "Mickey Rourke",
            "Micky Cohen"
        ],
        "question": "After who was Mickey Mouse named?",
        "tags": [
            "fictitious_characters",
            "cartoons",
            "general_knowledge"
        ],
        "type": "Multiple Choice",
        "difficulty": "hard",
        "regions": [],
        "isNiche": false
    },
    {
        "category": "Music",
        "id": "622a1c357cc59eab6f94fea3",
        "correctAnswer": "Elton John",
        "incorrectAnswers": [
            "Eric Clapton",
            "Paul McCartney",
            "Sting"
        ],
        "question": "Which English singer-songwriter released the song 'Rocket Man'?",
        "tags": [
            "songs",
            "musicians",
            "people",
            "general_knowledge",
            "music"
        ],
        "type": "Multiple Choice",
        "difficulty": "easy",
        "regions": [],
        "isNiche": false
    },
    {
        "category": "Geography",
        "id": "62374044cb85f7ce9e949ced",
        "correctAnswer": "Ecuador",
        "incorrectAnswers": [
            "Bahamas",
            "Mauritius",
            "Albania"
        ],
        "question": "Quito is the capital city of which country?",
        "tags": [
            "geography"
        ],
        "type": "Multiple Choice",
        "difficulty": "hard",
        "regions": [],
        "isNiche": false
    },
    {
        "category": "Geography",
        "id": "622a1c387cc59eab6f950802",
        "correctAnswer": "North America",
        "incorrectAnswers": [
            "South America",
            "Oceania",
            "Europe"
        ],
        "question": "The country of Dominica is on which continent?",
        "tags": [
            "geography"
        ],
        "type": "Multiple Choice",
        "difficulty": "medium",
        "regions": [],
        "isNiche": false
    },
    {
        "category": "Geography",
        "id": "623740b1cb85f7ce9e949d18",
        "correctAnswer": "Tegucigalpa",
        "incorrectAnswers": [
            "Bangkok",
            "San Salvador",
            "Kinshasa"
        ],
        "question": "What is the capital city of Honduras?",
        "tags": [
            "geography"
        ],
        "type": "Multiple Choice",
        "difficulty": "hard",
        "regions": [],
        "isNiche": false
    },
    {
        "category": "Geography",
        "id": "623735d4cfe13103f55eb572",
        "correctAnswer": "Slovakia",
        "incorrectAnswers": [
            "South Korea",
            "Sri Lanka",
            "Saint Kitts and Nevis"
        ],
        "question": "Which region of the world uses '.sk' at the end of its web addresses?",
        "tags": [
            "geography"
        ],
        "type": "Multiple Choice",
        "difficulty": "hard",
        "regions": [],
        "isNiche": false
    },
    {
        "category": "Society & Culture",
        "id": "6262afa84b176d54800e3dd5",
        "correctAnswer": "Talk to you later",
        "incorrectAnswers": [
            "The two year lapse",
            "Try to yeet loads",
            "Top thanks you legend"
        ],
        "question": "If someone typed the letters 'TTYL' in a message, what would they mean?",
        "tags": [
            "the_internet",
            "initials",
            "society_and_culture"
        ],
        "type": "Multiple Choice",
        "regions": [],
        "isNiche": false
    },
    {
        "category": "Arts & Literature",
        "id": "622a1c347cc59eab6f94f995",
        "correctAnswer": "Lolita",
        "incorrectAnswers": [
            "Gone With the Wind",
            "The Thin Man",
            "Henderson the Rain King"
        ],
        "question": "Which book contains the character 'Humbert Humbert'?",
        "tags": [
            "literature",
            "classic_novels",
            "fictitious_characters",
            "general_knowledge",
            "arts_and_literature"
        ],
        "type": "Multiple Choice",
        "difficulty": "medium",
        "regions": [],
        "isNiche": false
    }
]`;

const questions = JSON.parse(questionsString);





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


displayQuestions(); 
