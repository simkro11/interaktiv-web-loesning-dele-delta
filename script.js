const quizData = [
  {
    question:
      "En venn deler en video med deg der en person får nesen sin brukket av noen og begynner å hyle og skrike på en latterlig måte. Deler du denne videre?",
    options: ["Ja!", "Nei."],
    answer: "Ja!",
    consequence:
      "Som en konsekvens av at du videredelte videoen av personen med brukket nese, endte den personen opp som et enda større voldsoffer og tok livet sitt i etterkant på grunn av deg.",
  },
  {
    question:
      "Du ser noen ha en seriøs og grov slosskamp ved bussholderplassen på skolen din og du vurderer å ta opp en video av det. Dette er potensial for massevis av likes på TikTok. Hva gjør du?",
    options: ["Ta opp videoen og del den på TikTok!", "Ikke ta opp videoen."],
    answer: "Ta opp videoen og del den på TikTok!",
    consequence:
      "Siden du tok videoen av den grove slosskampen og delte den på TikTok, så har den nå blitt så populær at de som var inni videoen klarte å identifisere deg. De har planer om å gjøre deg til et voldsoffer.",
  },
  {
    question:
      "Du har blitt kontaktet av en ghetto gjeng for å gjøre en liten prank på noen om kvelden ved å slå dem i hodet med en hammer og ta det opp. Gjengen lover at de kommer til å beskytte deg og gi deg penger for dette. Er det hammertid eller unngår du dette?",
    options: ["Hammertid!", "Jeg unngår dette"],
    answer: "Hammertid!",
    consequence:
      "Etter du slo den personen med hammer, ble det rapportert på nyhetene at de hadde blitt funnet med permanent og alvorlig traumatisk hjerneskade. Personen bare fungerer rett og slett ikke lenger på grunn av det du gjorde.",
  },
  {
    question:
    "Du fikk se en video av noen som fikk flere steiner kastet på seg. Det er den plagsomme naboen din som alle i hele nabolaget inkludert deg hater. Det hadde sett gøy ut å dele denne videoen. Gjør du det?",
    options: ["Selvfølgelig! Dette er noe naboen fortjener.", "Dette er feil å gjøre."],
    answer: "Selvfølgelig! Dette er noe naboen fortjener.",
    consequence:
    "Når du delte videoen av naboen som ble angrepet, fant naboen videoen og hadde nok. Hele nabolaget ditt ble stengt ned av politiet etter naboen din hadde tatt livet til 2 andre i nabolaget.",
  },

  // Template for spørsmål:
    //  {
    //    question:
    //      "",
    //    options: ["", ""],
    //    answer: "",
    //    consequence:
    //      "",
    //  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
let consequences = [];
const timerEl = document.getElementById("time");
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const resultEl = document.querySelector(".result");
const result = document.getElementById("result")
const scoreEl = document.getElementById("score");
const restartBtn = document.querySelector(".restart-btn");
const con_result = document.querySelector(".con_result");
const lovsiden = document.querySelector(".lovsiden")
const alvorligboks = document.getElementById("alvorlig-boks");
const alvorlig = document.getElementById("alvorlig-bakgrunn");

// Function to load the question
function loadQuestion() {
  if (currentQuestion >= quizData.length) {
    endQuiz();
    return;
  }
  clearInterval(timerInterval);
  timeLeft = 30;
  timerEl.textContent = timeLeft;
  startTimer();
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = ""; // Clear previous options
  currentQuiz.options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsEl.appendChild(button);
  });
}

// Check the answer
function checkAnswer(selectedOption) {
  // Sjekker at svaret er answer og legger til score og konsekvens etter det.
  if (selectedOption === quizData[currentQuestion].answer) {
    if (score < 2) {
        score++;
      }
    console.log("Score har blitt gitt", score);
    consequences.push(quizData[currentQuestion].consequence);
    console.log("Svaret har blitt sjekket, og en konsekvens har blitt gitt");
    console.log(consequences);

    const con_list = document.getElementById("consequencelist");

    const li = document.createElement("li");
    li.textContent = quizData[currentQuestion].consequence;
    con_list.appendChild(li);
    ``;
  }

  currentQuestion++;
  loadQuestion();
}

// Start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// End the quiz and show the results
function endQuiz() {
  clearInterval(timerInterval);
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  resultEl.style.display = "block";
  scoreEl.textContent = score;
  restartBtn.style.display = "block";
  con_result.style.display = "block";
  lovsiden.style.display = "block";
  alvorlig.style.backgroundColor = "var(--black)";
  alvorligboks.style.background = "#333";
  alvorligboks.style.background = "#333";
  alvorligboks.style.color = "#fff";

  if (score == 0) {
    resultEl.style.color = "#4caf50";
    result.textContent = "Du har ikke gjort noen forbrytelser, godt jobba! Men det anbefales fortsatt å lese loven:";
  }

  if (score > 0.9) {
    resultEl.style.color = "#f31208"
    result.textContent = "For det du har gjort, får du " + score + " års fengsel. Men det er ikke bare fengselstiden du har å angre:";
  }
}

// Restart the quiz
restartBtn.addEventListener("click", () => {
  // Reset variables
  currentQuestion = 0;
  score = 0;
  timeLeft = 30;
  timerEl.textContent = timeLeft;
  const con_list = document.getElementById("consequencelist");
  con_list.innerHTML = "";
  consequences = [];

  // Reset the display
  questionEl.style.display = "block";
  optionsEl.style.display = "flex"; // Ensure options are displayed correctly
  resultEl.style.display = "none";
  restartBtn.style.display = "none";
  con_result.style.display = "none";
  lovsiden.style.display = "none";
  console.log(consequences);
  alvorlig.style.backgroundColor = "var(--white-bg)";
  alvorligboks.style.background = "var(--white)";
  alvorligboks.style.color = "var(--black)";

  // Load the first question
  loadQuestion();
});

// Initialize the quiz with the first question
loadQuestion();
