const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "What is 2+2?",
        answers: [
            { text: "6", correct: false},
            { text: "1", correct: false},
            { text: "22t", correct: false},
            { text: "4", correct: true},
        ]
    },
    {
        question: "How many states are in Nigeria?",
        answers: [
            { text: "34", correct: false},
            { text: "35", correct: false},
            { text: "36", correct: true},
            { text: "33", correct: false},
        ]
    },
    {
        question: "What is 8+8?",
        answers: [
            { text: "16", correct: true},
            { text: "88", correct: false},
            { text: "18", correct: false},
            { text: "17", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const retryButton = document.getElementById("retry-btn"); // Add Retry button

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    retryButton.style.display = "none"; // Hide the Retry button
    showQuestion();
}

function showQuestion() {
    // Clear previous answer buttons
    answerButtonElement.innerHTML = "";

    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => checkAnswer(answer));
        answerButtonElement.appendChild(button);
    });
}

function checkAnswer(answer) {
    if (answer.correct) {
        score++;
    }
    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // Quiz is over
        questionElement.innerHTML = `Your Score: ${score} out of ${questions.length}`;
        answerButtonElement.innerHTML = "";
        nextButton.style.display = "none"; // Hide the Next button
        retryButton.style.display = "block"; // Show the Retry button
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        finishQuiz();
    }
});

function finishQuiz() {
    questionElement.innerHTML = `Your Score: ${score} out of ${questions.length}`;
    answerButtonElement.innerHTML = "";
    nextButton.style.display = "none"; // Hide the Next button
    retryButton.style.display = "block"; // Show the Retry button
}

retryButton.addEventListener("click", startQuiz); // Add event listener for Retry button

startQuiz();