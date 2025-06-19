// ✅ Initialize dummy questions (Replace with Firestore later)
const questions = [
  {
    id: 1,
    question: "Which of the following is a prime number?",
    options: {
      A: "9",
      B: "15",
      C: "17",
      D: "21"
    },
    answer: "C",
    marked: false,
    selected: null
  },
  {
    id: 2,
    question: "What is the capital of Madhya Pradesh?",
    options: {
      A: "Bhopal",
      B: "Indore",
      C: "Gwalior",
      D: "Jabalpur"
    },
    answer: "A",
    marked: false,
    selected: null
  },
  {
    id: 3,
    question: "Which gas is known as laughing gas?",
    options: {
      A: "Nitrogen",
      B: "Nitrous Oxide",
      C: "Oxygen",
      D: "Carbon Monoxide"
    },
    answer: "B",
    marked: false,
    selected: null
  }
];

let currentQuestionIndex = 0;
let timerMinutes = 60;
let timerSeconds = 0;

function displayQuestion(index) {
  const q = questions[index];
  document.getElementById("question").innerText = `Q${q.id}. ${q.question}`;
  document.getElementById("optA").innerText = q.options.A;
  document.getElementById("optB").innerText = q.options.B;
  document.getElementById("optC").innerText = q.options.C;
  document.getElementById("optD").innerText = q.options.D;

  // Clear radio selection
  document.querySelectorAll('input[name="option"]').forEach(el => el.checked = false);

  // Restore previous selection
  if (q.selected) {
    document.querySelector(`input[name="option"][value="${q.selected}"]`).checked = true;
  }

  updatePalette();
}

function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    questions[currentQuestionIndex].selected = selected.value;
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
  }
}

function nextQuestion() {
  saveAnswer();
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  }
}

function markForReview() {
  questions[currentQuestionIndex].marked = true;
  nextQuestion();
}

function clearResponse() {
  document.querySelectorAll('input[name="option"]').forEach(el => el.checked = false);
  questions[currentQuestionIndex].selected = null;
}

function submitTest() {
  saveAnswer();
  const confirmSubmit = confirm("Do you really want to submit the test?");
  if (!confirmSubmit) return;

  localStorage.setItem("mockTestResponses", JSON.stringify(questions));
  window.location.href = "result.html";
}

function updatePalette() {
  const container = document.getElementById("palette-container");
  container.innerHTML = "";

  questions.forEach((q, i) => {
    const btn = document.createElement("button");
    btn.innerText = q.id;
    btn.style.margin = "3px";
    btn.onclick = () => {
      saveAnswer();
      currentQuestionIndex = i;
      displayQuestion(currentQuestionIndex);
    };

    if (q.marked) {
      btn.style.background = "orange";
      btn.style.color = "white";
    } else if (q.selected) {
      btn.style.background = "green";
      btn.style.color = "white";
    } else {
      btn.style.background = "red";
      btn.style.color = "white";
    }

    container.appendChild(btn);
  });
}

// ✅ Timer
function startTimer() {
  const timerDisplay = document.getElementById("timer");
  const timerInterval = setInterval(() => {
    if (timerSeconds === 0) {
      if (timerMinutes === 0) {
        clearInterval(timerInterval);
        alert("⏰ Time Over! Submitting Test...");
        submitTest();
        return;
      } else {
        timerMinutes--;
        timerSeconds = 59;
      }
    } else {
      timerSeconds--;
    }

    let min = timerMinutes < 10 ? "0" + timerMinutes : timerMinutes;
    let sec = timerSeconds < 10 ? "0" + timerSeconds : timerSeconds;
    timerDisplay.innerText = `${min}:${sec}`;
  }, 1000);
}

// ✅ Init
window.onload = () => {
  displayQuestion(currentQuestionIndex);
  startTimer();
};
