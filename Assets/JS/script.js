const startbutton = document.getElementById('start-btn');
const nextbutton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerbuttonElement = document.getElementById('answer-buttons');
const totalSeconds = 30;
const highScoreDiv = document.getElementById("highscore");
const scoreStatus = document.getElementById("score-status");
document.getElementById("counter").innerText = totalSeconds;
scoreStatus.classList.add('hide');
document.getElementById("high-score-status").classList.add('hide');
const clear=document.getElementById('clear');


let isPaused=false;
let currentQuestionIndex, shuffledQuestion;
let isTimerStarted = false;
var right = 0;
var highscore = localStorage.getItem("highscore");
let index = 0;



document.getElementById("incorrect").classList.add('hide');
document.getElementById("correct").classList.add('hide');
document.getElementById("status").classList.add('hide');
highScoreDiv.innerText = localStorage.getItem("highscore") ? localStorage.getItem("highscore") : 0;
startbutton.addEventListener('click', startGame)
nextbutton.addEventListener('click', () => {
    currentQuestionIndex++
    setnextQues();
})

clear.addEventListener('click', clearscore);

function clearscore () {
    localStorage.setItem("highscore", 0);
    highScoreDiv.innerText = localStorage.getItem("highscore");


}

document.getElementById("submit-btn").addEventListener('click', () => {
    scoreStatus.classList.add('hide'); 
    isPaused=true;
    timerclock();
    document.getElementById("high-score-status").classList.remove('hide');
    const initial = document.getElementById("initial").value;
    document.getElementById("high-score").innerText = `${initial}: ${right}`;
    if(right >  localStorage.getItem("highscore"))
      {
          localStorage.setItem("highscore", right);
      }
    highScoreDiv.innerText = localStorage.getItem("highscore");
})

function startGame() {
    
    
    document.getElementById("status").classList.remove('hide');
    timerclock();
    startbutton.classList.add('hide');
    shuffledQuestion = questions.sort(() => Math.random() - .5);
    //currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    //  let questionSet = shuffledQuestion[currentQuestionIndex];
    setnextQues(shuffledQuestion);
}



function setnextQues(questionSet) {

    resetState();
    if (index < questionSet.length)
        showQuestion(questionSet[index]);
    else {
        questionContainerElement.classList.add("hide");
        scoreStatus.classList.remove('hide');
        document.getElementById("final-score").innerText = `You final score is: ${right}`;
    }
    index++;
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerbuttonElement.appendChild(button);
    });
}

function resetState() {

    clearStatusClass(document.body);
    nextbutton.classList.add("hide");
    document.getElementById("status").classList.add('hide');
    while (answerbuttonElement.firstChild) {
        answerbuttonElement.removeChild(answerbuttonElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedbutton = e.target;
    setStatusClass(selectedbutton)
    if (shuffledQuestion.lenght > currentQuestionIndex + 1) {
        nextbutton.classList.remove('hide');
    } else {
        startbutton.innerText = "Next";
        startbutton.classList.remove("hide");
    }

}


function setStatusClass(selectedbutton) {
    document.getElementById("status").classList.remove('hide');
    if (selectedbutton.dataset.correct) {
        selectedbutton.classList.add('correct')

        document.getElementById("incorrect").classList.add('hide');
        document.getElementById("correct").classList.remove('hide');
        right++;
        document.getElementById('score').innerHTML = right;
    } else {
        selectedbutton.classList.add('wrong');
        selectedbutton.classList.add('correct')
        document.getElementById("incorrect").classList.remove('hide');
        document.getElementById("correct").classList.add('hide');


    }

}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


const questions = [{
        question: "Ques.  A very useful tool used during development and debugging for printing content to the debugger is :",
        answers: [
            { text: 'JavaScript', correct: false },
            { text: 'terminal/bash', correct: false },
            { text: 'for loops', correct: false },
            { text: 'console log', correct: true },
        ]
    },
    {
        question: "Ques.   Commonly used data types DO NOT Include : ",
        answers: [
            { text: 'Strings', correct: false },
            { text: 'booleans', correct: false },
            { text: 'alerts', correct: true },
            { text: 'numbers', correct: false },
        ]
    },
    {
        question: "Ques.  The condition in an if/else statement is enclosed within ________ ?",
        answers: [
            { text: 'quotes', correct: false },
            { text: 'curly brackets', correct: true },
            { text: 'paranthesis', correct: false },
            { text: 'square brackets', correct: false },
        ]
    },
    {
        question: "Ques.  Arrays in javascript can be used to store ______ ",
        answers: [
            { text: 'number & strings', correct: false },
            { text: 'other arrays', correct: false },
            { text: 'booleans', correct: false },
            { text: 'All of the above', correct: true },
        ]
    },
    {
        question: "Ques.  String values must be enclosed within _____ when being assigned to variables?",
        answers: [
            { text: 'commas', correct: false },
            { text: 'curley brackets', correct: false },
            { text: 'quotes', correct: true },
            { text: 'parantheses', correct: false },
        ]
    },
    {
        question: "Ques.  An example of non closing tags will be",
        answers: [
            { text: 'p', correct: false },
            { text: 'html', correct: false },
            { text: 'body', correct: false },
            { text: 'img', correct: true },
        ]
    }
]

function timerclock() {
    if (!isTimerStarted) {
        var count = totalSeconds;
        var interval = setInterval(function() {
            document.getElementById("counter").innerHTML = count;
            if(!isPaused)
             count--;
            if (count === 0) {
                clearInterval(interval);
                document.getElementById("counter").innerHTML = "0";
                // or...
                alert("you are out of time");
            }
        }, 1000);
        isTimerStarted = true;
    }
}