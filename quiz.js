const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used to style web pages?",
        answers: [
            "JavaScript",
            "Python",
            "CSS",
            "HTML"
        ],
        correct: 2
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        answers: [
            "style",
            "let",
            "design",
            "page"
        ],
        correct: 1
    },
    {
        question: "Which HTML tag creates a hyperlink?",
        answers: [
            "<img>",
            "<p>",
            "<a>",
            "<h1>"
        ],
        correct: 2
    },
    {
        question: "Which method displays a message in the browser console?",
        answers: [
            "console.log()",
            "document.style()",
            "window.color()",
            "console.html()"
        ],
        correct: 0
    }
];

const questionNumber = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function showQuestion() {
    answered = false;

    const currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    questionElement.textContent = currentQuestion.question;

    answerButtons.innerHTML = "";
    feedback.textContent = "";
    scoreElement.textContent = "";
    nextButton.disabled = true;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-button");

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach((button) => {
        button.disabled = true;
    });

    if (selectedIndex === currentQuestion.correct) {
        score++;
        feedback.textContent = "Correct answer!";
        feedback.style.color = "green";
        buttons[selectedIndex].classList.add("correct");
    } else {
        feedback.textContent = "Incorrect. Try the next question!";
        feedback.style.color = "red";
        buttons[selectedIndex].classList.add("incorrect");
        buttons[currentQuestion.correct].classList.add("correct");
    }

    nextButton.disabled = false;
}

function showResults() {
    questionNumber.textContent = "Quiz completed!";
    questionElement.textContent =
        `You scored ${score} out of ${questions.length}.`;

    answerButtons.innerHTML = "";
    feedback.textContent = "Well done for completing the quiz!";

    nextButton.textContent = "Restart Quiz";
    nextButton.disabled = false;
    scoreElement.textContent =
        `Final score: ${Math.round((score / questions.length) * 100)}%`;
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else if (currentQuestionIndex === questions.length - 1) {
        currentQuestionIndex++;
        showResults();
    } else {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.textContent = "Next Question";
        showQuestion();
    }
});

showQuestion();