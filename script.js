let questions = []; // Tom array från början
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const questionCounter = document.getElementById("question-counter");

// 1. Hämta frågor från API:et när sidan laddas
async function fetchQuestions() {
  try {
    questionText.textContent = "Laddar frågor...";
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple",
    );
    const data = await response.json();

    // 2. Bygg om OpenTDB:s struktur till det format din kod förväntar sig
    questions = data.results.map((item) => {
      // Slå ihop felaktiga och rätta svar och blanda dem
      const answers = [
        ...item.incorrect_answers.map((text) => ({
          text: decodeHTML(text),
          correct: false,
        })),
        { text: decodeHTML(item.correct_answer), correct: true },
      ].sort(() => Math.random() - 0.5); // Blanda ordningen

      return {
        question: decodeHTML(item.question),
        answers: answers,
      };
    });

    startQuiz();
  } catch (error) {
    questionText.textContent =
      "Kunde inte ladda frågor. Kontrollera din anslutning.";
    console.error(error);
  }
}

// Hjälpfunktion för att städa bort HTML-koder (som &quot; etc.) från API:et
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.textContent = "Nästa fråga";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;
  questionCounter.textContent = `Fråga ${currentQuestionIndex + 1} av ${questions.length}`;
  progressBar.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextBtn.classList.add("hide");
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextBtn.classList.remove("hide");
}

function showScore() {
  resetState();
  progressBar.style.width = "100%";
  questionCounter.textContent = "Klart!";
  questionText.textContent = `Du fick ${score} av ${questions.length} rätt!`;
  nextBtn.textContent = "Spela igen";
  nextBtn.classList.remove("hide");
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else if (nextBtn.textContent === "Spela igen") {
    fetchQuestions(); // Hämta nya slumpmässiga frågor om man spelar om
  } else {
    showScore();
  }
});

// Starta genom att hämta från API:et istället för direkt anrop till startQuiz
fetchQuestions();
