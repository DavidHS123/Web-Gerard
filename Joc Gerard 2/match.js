document.addEventListener('DOMContentLoaded', function() {
    const matchInfo = document.getElementById('match-info');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const correctButton = document.getElementById('correct');
    const incorrectButton = document.getElementById('incorrect');
    const nextQuestionButton = document.getElementById('next-question');
    const finishMatchButton = document.getElementById('finish-match');

    let currentMatch = JSON.parse(localStorage.getItem('currentMatch'));
    let currentMatchIndex = localStorage.getItem('currentMatchIndex');
    let currentQuestionIndex = 0;
    let questions = [
        'Pregunta 1 sobre Gerard', 'Pregunta 2 sobre Gerard', 'Pregunta 3 sobre Gerard'
    ];

    if (currentMatch) {
        matchInfo.textContent = `${currentMatch.match[0]} vs ${currentMatch.match[1]}`;
        showQuestion();
    }

    correctButton.addEventListener('click', () => handleAnswer(true));
    incorrectButton.addEventListener('click', () => handleAnswer(false));
    nextQuestionButton.addEventListener('click', showQuestion);
    finishMatchButton.addEventListener('click', finishMatch);

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionElement.textContent = questions[currentQuestionIndex];
            questionContainer.style.display = 'block';
            nextQuestionButton.style.display = 'none';
            finishMatchButton.style.display = 'none';
        } else {
            questionContainer.style.display = 'none';
            nextQuestionButton.style.display = 'none';
            finishMatchButton.style.display = 'block';
        }
    }

    function handleAnswer(isCorrect) {
        if (isCorrect) {
            alert('Respuesta correcta! Obtienes un comodín.');
        } else {
            alert('Respuesta incorrecta. Tienes un reto.');
        }
        currentQuestionIndex++;
        questionContainer.style.display = 'none';
        nextQuestionButton.style.display = 'block';
    }

    function finishMatch() {
        let result = simulateMatch(currentMatch.match);
        alert(result);
        currentMatch.result = result;
        let losingTeam = result.includes('gana') ? currentMatch.match[1] : currentMatch.match[0];
        let winningTeam = result.includes('gana') ? currentMatch.match[0] : currentMatch.match[1];
        currentMatch.winner = winningTeam;
        localStorage.setItem('currentMatch', JSON.stringify(currentMatch));
        localStorage.setItem('currentMatchIndex', currentMatchIndex);
        window.location.href = 'game.html';
    }

    function simulateMatch(teams) {
        let score1 = Math.floor(Math.random() * 5);
        let score2 = Math.floor(Math.random() * 5);
        while (score1 === score2) {
            score1 = Math.floor(Math.random() * 5);
            score2 = Math.floor(Math.random() * 5);
        }
        return `${teams[0]} ${score1} - ${score2} ${teams[1]}`;
    }
});