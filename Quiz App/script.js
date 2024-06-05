const ques = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      {
        text: "Shark",
        correct: false,
      },
      {
        text: "Blue Whale",
        correct: true,
      },
      {
        text: "Giraffe",
        correct: false,
      },
      {
        text: "Elephant",
        correct: false,
      },
    ],
  },
  {
    question: "Which is smallest continent in the world?",
    answers: [
      {
        text: "Asia",
        correct: false,
      },
      {
        text: "Africa",
        correct: false,
      },
      {
        text: "Antarctica",
        correct: false,
      },
      {
        text: "Australia",
        correct: true,
      },
    ],
  },
  {
    question: "Which is largest desert in the world?",
    answers: [
      {
        text: "Sahara",
        correct: true,
      },
      {
        text: "Gobi",
        correct: false,
      },
      {
        text: "Kalahari",
        correct: false,
      },
      {
        text: "Thar",
        correct: false,
      },
    ],
  },
];

const quesElement = document.getElementById("ques");
const ansButtons = document.getElementById("ans-buttons");
const nextButton = document.getElementById("next-btn");

let currQuesIndex = 0;
let score = 0;

function startQuiz() {
  currQuesIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQues();
}

function showQues() {
  resetState();
  let currQues = ques[currQuesIndex];
  let quesNo = currQuesIndex + 1;
  quesElement.innerHTML = quesNo + ". " + currQues.question;

  currQues.answers.forEach((ans) => {
    const button = document.createElement("button");
    button.innerHTML = ans.text;
    button.classList.add("btn");
    ansButtons.appendChild(button);
    if (ans.correct) {
      button.dataset.correct = ans.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (ansButtons.firstChild) {
    ansButtons.removeChild(ansButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(ansButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  quesElement.innerHTML = `You scored ${score} out of ${ques.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextBtn() {
  currQuesIndex++;
  if (currQuesIndex < ques.length) {
    showQues();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currQuesIndex < ques.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
