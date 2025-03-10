const questions = [
    {
        question: "Apa yang dimaksud dengan dampak sosial teknologi?",
        answers: [
            { text: "Perubahan iklim akibat teknologi", correct: false },
            { text: "Pengaruh teknologi terhadap kehidupan sosial masyarakat", correct: true },
            { text: "Teknologi yang digunakan dalam industri", correct: false },
            { text: "Hanya dampak negatif dari internet", correct: false }
        ]
    },
    {
        question: "Salah satu dampak positif teknologi di pendidikan adalah…",
        answers: [
            { text: "Meningkatnya kecanduan gadget", correct: false },
            { text: "Akses belajar online dan kelas virtual", correct: true },
            { text: "Menurunnya minat belajar siswa", correct: false },
            { text: "Sulitnya mendapatkan informasi", correct: false }
        ]
    },
    {
        question: "Apa tantangan utama informatika dalam dunia ekonomi?",
        answers: [
            { text: "Penggunaan internet semakin cepat", correct: false },
            { text: "Semua orang bisa menggunakan teknologi", correct: false },
            { text: "Keamanan data dan kesenjangan digital", correct: true },
            { text: "Teknologi tidak berpengaruh pada ekonomi", correct: false }
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'none'; 
    nextButton.innerText = 'Next'; 
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtons.innerHTML = ''; 
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true; 
        if (button.innerText === answer.text) {
            button.classList.add(correct ? 'correct' : 'incorrect');
        }
        // Ensure the correct answer button always gets the 'correct' class
        const correctAnswerText = questions[currentQuestionIndex].answers.find(a => a.correct).text;
        if (button.innerText === correctAnswerText) {
            button.classList.add('correct');
        }
    });
    nextButton.style.display = 'block'; 
}

function handleNextButtonClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', handleNextButtonClick);

function showScore() {
    questionElement.innerText = `You scored ${score} out of ${questions.length}`;
    nextButton.innerText = 'Play Again';
    nextButton.style.display = 'block'; 

    nextButton.removeEventListener('click', handleNextButtonClick);

    nextButton.addEventListener('click', () => {
        startQuiz(); 
        nextButton.addEventListener('click', handleNextButtonClick); 
    }, { once: true }); 
}

startQuiz();