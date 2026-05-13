const quizData = [
            {
                question: "En venn deler en video med deg der en person får nesen sin brukket av noen og begynner å hyle og skrike på en latterlig måte. Deler du denne videre?",
                options: ["Ja", "Nei"],
                answer: "Ja"
            },
            {
                question: "Du ser noen ha en seriøs slosskamp ved bussholderplassen din på skolen og du vurderer å ta opp en video av det. Dette er potensial for massevis av likes på TikTok. Hva gjør du?",
                options: ["Ta opp videoen og del den på TikTok", "Ikke ta opp videoen"],
                answer: "Ta opp videoen og del den på TikTok"
            },
        ];

let currentQuestion = 0;
        let score = 0;
        let timeLeft = 30;
        let timerInterval;
        const timerEl = document.getElementById('time');
        const questionEl = document.querySelector('.question');
        const optionsEl = document.querySelector('.options');
        const resultEl = document.querySelector('.result');
        const scoreEl = document.getElementById('score');
        const restartBtn = document.querySelector('.restart-btn');

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
            optionsEl.innerHTML = ''; // Clear previous options
            currentQuiz.options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option');
                button.textContent = option;
                button.onclick = () => checkAnswer(option);
                optionsEl.appendChild(button);
            });
        }

        // Check the answer
        function checkAnswer(selectedOption) {
            if (selectedOption === quizData[currentQuestion].answer) {
                score++;
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
            questionEl.style.display = 'none';
            optionsEl.style.display = 'none';
            resultEl.style.display = 'block';
            scoreEl.textContent = score;
            restartBtn.style.display = 'block';
        }

        // Restart the quiz
        restartBtn.addEventListener('click', () => {
            // Reset variables
            currentQuestion = 0;
            score = 0;
            timeLeft = 30;
            timerEl.textContent = timeLeft;

            // Reset the display
            questionEl.style.display = 'block';
            optionsEl.style.display = 'flex'; // Ensure options are displayed correctly
            resultEl.style.display = 'none';
            restartBtn.style.display = 'none';

            // Load the first question
            loadQuestion();
        });

        // Initialize the quiz with the first question
loadQuestion();