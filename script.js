// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const timerSpan = document.getElementById("timer");
const highScoreSpan = document.getElementById("high-score");
const questionCategory = document.getElementById("question-category");
const reviewButton = document.getElementById("review-btn");
const explanationScreen = document.getElementById("explanation-screen");
const prevExplanationBtn = document.getElementById("prev-explanation-btn");
const nextExplanationBtn = document.getElementById("next-explanation-btn");
const explanationCounter = document.getElementById("explanation-counter");
const explanationCategory = document.getElementById("explanation-category");
const explanationQuestionText = document.getElementById("explanation-question-text");
const userAnswerSpan = document.getElementById("user-answer");
const correctAnswerSpan = document.getElementById("correct-answer");
const explanationText = document.getElementById("explanation-text");
const backToResultsBtn = document.getElementById("back-to-results-btn");
const finishReviewBtn = document.getElementById("finish-review-btn");

const quizQuestions = [
  {
    question: "In amplitude modulation (AM), which parameter of the carrier wave is varied according to the message signal?",
    answers: [
      { text: "Frequency", correct: false },
      { text: "Phase", correct: false },
      { text: "Amplitude", correct: true },
      { text: "Bandwidth", correct: false },
    ],
    explanation: "In AM, the amplitude of the carrier wave is varied in proportion to the instantaneous amplitude of the modulating signal.",
    category: "Modulation"
  },
  {
    question: "The range of frequencies used for commercial FM broadcasting is:",
    answers: [
      { text: "88 – 108 MHz", correct: true },
      { text: "300 – 3000 Hz", correct: false },
      { text: "3 – 30 kHz", correct: false },
      { text: "20 – 20,000 Hz", correct: false },
    ],
    explanation: "Commercial FM radio stations operate in the VHF band from 88 to 108 MHz, providing high-quality audio transmission.",
    category: "Broadcasting"
  },
  {
    question: "In digital communication, the main advantage of PCM (Pulse Code Modulation) over analog communication is:",
    answers: [
      { text: "Requires less bandwidth", correct: false },
      { text: "Noise immunity", correct: true },
      { text: "Simple circuitry", correct: false },
      { text: "Infinite resolution", correct: false },
    ],
    explanation: "PCM converts analog signals to digital form, providing excellent noise immunity and signal regeneration capabilities.",
    category: "Digital Communication"
  },
  {
    question: "Which modulation technique has the highest power efficiency?",
    answers: [
      { text: "Amplitude Modulation (AM)", correct: false },
      { text: "Frequency Modulation (FM)", correct: false },
      { text: "Phase Modulation (PM)", correct: false },
      { text: "Single Sideband (SSB)", correct: true },
    ],
    explanation: "SSB modulation transmits only one sideband, eliminating the carrier and one sideband, resulting in maximum power efficiency.",
    category: "Modulation"
  },
  {
    question: "Shannon's Channel Capacity theorem is given by:",
    answers: [
      { text: "C = B log2(1 + S/N)", correct: true },
      { text: "C = S/N", correct: false },
      { text: "C = B × (S/N)", correct: false },
      { text: "C = log10(S + N)", correct: false },
    ],
    explanation: "Shannon's theorem defines the maximum rate at which information can be transmitted over a communication channel.",
    category: "Information Theory"
  },
  {
    question: "What is the Nyquist sampling rate for a signal with maximum frequency of 4 kHz?",
    answers: [
      { text: "2 kHz", correct: false },
      { text: "4 kHz", correct: false },
      { text: "8 kHz", correct: true },
      { text: "16 kHz", correct: false },
    ],
    explanation: "According to Nyquist theorem, the sampling rate must be at least twice the maximum frequency (2 × 4 kHz = 8 kHz).",
    category: "Sampling Theory"
  },
  {
    question: "Which type of antenna is commonly used for satellite communication?",
    answers: [
      { text: "Dipole antenna", correct: false },
      { text: "Yagi antenna", correct: false },
      { text: "Parabolic dish", correct: true },
      { text: "Loop antenna", correct: false },
    ],
    explanation: "Parabolic dish antennas provide high gain and directivity, making them ideal for satellite communication links.",
    category: "Antennas"
  },
  {
    question: "What does SNR stand for in communication systems?",
    answers: [
      { text: "Signal-to-Noise Ratio", correct: true },
      { text: "System Network Resource", correct: false },
      { text: "Satellite Network Relay", correct: false },
      { text: "Synchronous Network Response", correct: false },
    ],
    explanation: "SNR measures the ratio of signal power to noise power, indicating the quality of a communication link.",
    category: "Communication Basics"
  },
  {
    question: "Which multiplexing technique is used in GSM cellular systems?",
    answers: [
      { text: "FDM only", correct: false },
      { text: "TDM only", correct: false },
      { text: "Both FDM and TDM", correct: true },
      { text: "CDM only", correct: false },
    ],
    explanation: "GSM uses both Frequency Division Multiplexing (FDM) and Time Division Multiplexing (TDM) for efficient spectrum utilization.",
    category: "Cellular Systems"
  },
  {
    question: "What is the main advantage of OFDM (Orthogonal Frequency Division Multiplexing)?",
    answers: [
      { text: "Lower complexity", correct: false },
      { text: "Better spectral efficiency", correct: true },
      { text: "Reduced power consumption", correct: false },
      { text: "Simpler implementation", correct: false },
    ],
    explanation: "OFDM provides excellent spectral efficiency by using overlapping orthogonal subcarriers, making it ideal for high-speed data transmission.",
    category: "Modern Communication"
  }
];


// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
let timeLeft = 30;
let timerInterval = null;
let shuffledQuestions = [];
let highScore = localStorage.getItem('quizHighScore') || 0;
let userAnswers = [];
let currentExplanationIndex = 0;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;
highScoreSpan.textContent = highScore;

// Utility Functions
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function startTimer() {
  timeLeft = 30;
  timerSpan.textContent = timeLeft;
  timerSpan.style.color = timeLeft <= 10 ? '#dc3545' : '#333';
  
  timerInterval = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft;
    timerSpan.style.color = timeLeft <= 10 ? '#dc3545' : '#333';
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeUp();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function timeUp() {
  answersDisabled = true;
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
  
  // Store user answer as "No Answer" for timeout
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  userAnswers.push({
    question: currentQuestion,
    userAnswer: "No Answer (Time Up)",
    isCorrect: false
  });
  
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
reviewButton.addEventListener("click", showExplanationReview);
prevExplanationBtn.addEventListener("click", () => navigateExplanation(-1));
nextExplanationBtn.addEventListener("click", () => navigateExplanation(1));
backToResultsBtn.addEventListener("click", backToResults);
finishReviewBtn.addEventListener("click", finishReview);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  shuffledQuestions = shuffleArray(quizQuestions);
  userAnswers = [];

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;
  stopTimer();

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / shuffledQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionCategory.textContent = currentQuestion.category;
  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
  
  startTimer();
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;
  stopTimer();

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  // Store user answer
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  userAnswers.push({
    question: currentQuestion,
    userAnswer: selectedButton.textContent,
    isCorrect: isCorrect
  });

  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

function nextQuestion() {
  currentQuestionIndex++;

  // check if there are more questions or if the quiz is over
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  stopTimer();
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  // Update high score
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('quizHighScore', highScore);
    highScoreSpan.textContent = highScore;
  }

  const percentage = (score / shuffledQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius! 🎉";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff! 👏";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning! 📚";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve! 💪";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better! 🌟";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}

function showExplanationReview() {
  resultScreen.classList.remove("active");
  explanationScreen.classList.add("active");
  currentExplanationIndex = 0;
  displayExplanation();
}

function displayExplanation() {
  const answerData = userAnswers[currentExplanationIndex];
  const question = answerData.question;
  
  explanationCounter.textContent = `Question ${currentExplanationIndex + 1} of ${userAnswers.length}`;
  explanationCategory.textContent = question.category;
  explanationQuestionText.textContent = question.question;
  
  // Find correct answer
  const correctAnswer = question.answers.find(answer => answer.correct);
  correctAnswerSpan.textContent = correctAnswer.text;
  userAnswerSpan.textContent = answerData.userAnswer;
  
  // Style user answer based on correctness
  if (answerData.isCorrect) {
    userAnswerSpan.style.color = "#2d5a2d";
    userAnswerSpan.style.fontWeight = "600";
  } else {
    userAnswerSpan.style.color = "#8b3a3a";
    userAnswerSpan.style.fontWeight = "600";
  }
  
  explanationText.textContent = question.explanation;
  
  // Update navigation buttons
  prevExplanationBtn.disabled = currentExplanationIndex === 0;
  nextExplanationBtn.disabled = currentExplanationIndex === userAnswers.length - 1;
}

function navigateExplanation(direction) {
  currentExplanationIndex += direction;
  displayExplanation();
}

function backToResults() {
  explanationScreen.classList.remove("active");
  resultScreen.classList.add("active");
}

function finishReview() {
  explanationScreen.classList.remove("active");
  startScreen.classList.add("active");
}