// Listen med spørsmål. Har forskjellige ting som må legges inn og konsekvenssvaret må bli satt som en av valgene i options.
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
      "Du har blitt kontaktet av en ghetto gjeng for å ta opp en video av noen om kvelden der de blir slått i hodet med en hammer. Gjengen lover at de kommer til å beskytte deg og gi deg penger for dette. Blir det penger eller unngår du dette?",
    options: ["Det blir spenn!", "Jeg unngår dette."],
    answer: "Det blir spenn!",
    consequence:
      "Etter du tok opp videoen av den personen som ble slått med hammer, ble det rapportert på nyhetene at personen hadde blitt funnet med permanent og alvorlig traumatisk hjerneskade. Mange lagde morro av dette på grunn av det du delte.",
  },
  {
    question:
    "Du får se en video av noen som får flere steiner kastet på seg. Det er den plagsomme naboen din som alle i hele nabolaget inkludert deg hater. Det hadde sett gøy ut å dele denne videoen. Gjør du det?",
    options: ["Selvfølgelig! Dette er noe naboen fortjener.", "Dette er feil å gjøre."],
    answer: "Selvfølgelig! Dette er noe naboen fortjener.",
    consequence:
    "Når du delte videoen av naboen som ble angrepet, fant naboen videoen og hadde nok. Hele nabolaget ditt ble stengt ned av politiet etter naboen din hadde voldelig angrepet flere i nabolaget som hevn.",
  },
  {
    question:
      "Du ser noen bli slått ned i gata. Det er mange folk som tar opp video av det og ler, så det er vel ikke så farlig om du blir med litt på å ta video? Mange andre er jo med på det som sagt. Ta et valg",
    options: ["Bli med på moroa!", "Avstå fra moroa."],
    answer: "Bli med på moroa!",
    consequence:
      "Da du ble med de folkene med å ta opp video av den personen, dukket politiet opp. Det ble en hel nyhetssak om det. Ingen arbeidsgiver kommer til å la deg ha en jobb når de finner deg i den nyhetssaken.",
  },
  {
    question:
      "Du har akkurat tatt opp en voldsvideo av noen som ble slått ned og kan ikke slette den pga. en programvarefeil. Du kan enten beholde videoen og ikke gjøre noe med den for å unngå at politiet beslaglegger telefonen, eller melde ifra til politiet og bruke videoen på telefonen som bevis",
    options: ["Jeg skal ikke miste telefonen min til politiet.", "Jeg skal melde ifra."],
    answer: "Jeg skal ikke miste telefonen min til politiet.",
    consequence:
      "Voldsvideoen du valgte å beholde ble funnet langt senere etter den ble tatt. Telefonen din ble beslaglagt uansett og du hjalp til med at voldsofferet endte opp med å aldri bli funnet igjen.",
  },
  {
    question:
      "Du har enda igjen tatt opp en voldsvideo og kan ikke slette den, men denne gangen får du et tilbud av en gjeng om å dele den til dem på et fysisk sted der du må møte dem. Denne gangen blir det 100 tusen kroner. Tar du tilbudet?",
    options: ["Aldri noe dårlig med litt spenn.", "Meld ifra videoen og tilbudet til politiet."],
    answer: "Aldri noe dårlig med litt spenn.",
    consequence:
      "Når du tok tilbudet om å dele en voldsvideo for 100 tusen kroner, gikk du til det stedet for å møte gjengen. De tok opp en voldsvideo av deg bli slått i hjel. Du er død.",
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

// Liste av globale variabler
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
const alvorligboks = document.getElementById("alvorlig-boks");
const alvorlig = document.getElementById("alvorlig-bakgrunn");

// Function to load the question
function loadQuestion() {
  if (!quizStarted) return;
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
  alvorlig.style.backgroundColor = "var(--black)";
  alvorligboks.style.background = "#333";
  alvorligboks.style.background = "#333";
  alvorligboks.style.color = "#fff";

  if (score == 0) {
    resultEl.style.color = "#4caf50";
    result.textContent = "Du har ikke gjort noen forbrytelser, godt jobba! Men det anbefales fortsatt å lese loven som kan finnes på hovedsiden:";
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
  optionsEl.style.display = "flex";
  resultEl.style.display = "none";
  restartBtn.style.display = "none";
  con_result.style.display = "none";
  console.log(consequences);
  alvorlig.style.backgroundColor = "var(--white-less-strain)";
  alvorligboks.style.background = "var(--white-bg)";
  alvorligboks.style.color = "var(--black)";

  // Load the first question
  loadQuestion();
});

let quizStarted = false;

const popup = document.getElementById("warningPopup");
const acceptCheck = document.getElementById("acceptCheck");
const acceptBtn = document.getElementById("acceptBtn");

// Aktiver knapp når checkbox er huket av
acceptCheck.addEventListener("change", () => {
  acceptBtn.disabled = !acceptCheck.checked;
});

// Når bruker trykker fortsett
acceptBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  quizStarted = true;
  loadQuestion();
});

function goToHome() {
  window.location.href = "index.html";
}
