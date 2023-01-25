const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Do you love football?',
        answers: [
            { text: 'Yes', correct: true},
            { text: 'No', correct: false}
        ]
    },
    {
        question: 'Who is the GOAT?',
        answers: [
            { text: 'Messi', correct: true},
            { text: 'Ronaldo', correct: false}
        ]
    },
    {
        question: 'Who won the 2022 World Cup?',
        answers: [
            { text: 'France', correct: false},
            { text: 'Morocco', correct: false},
            { text: 'Argentina', correct: true},
            { text: 'Croatia', correct: false}
        ]
    },
    {
        question: 'Who won the 2022 World Cup POTT?',
        answers: [
            { text: 'Mbappe', correct: false},
            { text: 'Messi', correct: true},
            { text: 'Ronaldo', correct: false},
            { text: 'Alvarez', correct: false}
        ]
    },
    {
        question: 'Who won the Golden Glove at World Cup 2022?',
        answers: [
            { text: 'Lloris', correct: false},
            { text: 'Martinez', correct: true}
        ]
    },
    {
        question: 'Who won the 2022 World Cup YPOTT?',
        answers: [
            { text: 'Alvarez', correct: false},
            { text: 'Ramos', correct: false},
            { text: 'Enzo', correct: true},
            { text: 'Mbappe', correct: false}
        ]
    }
]