document.addEventListener('DOMContentLoaded', function() {
    const finalMatchContainer = document.getElementById('final-match');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const correctButton = document.getElementById('correct');
    const incorrectButton = document.getElementById('incorrect');
    const finishFinalButton = document.getElementById('finish-final');

    let finalMatch = JSON.parse(localStorage.getItem('finalMatch'));
    let currentQuestionIndex = 0;
    let questions = [
        'Pregunta 1 sobre Gerard', 'Pregunta 2 sobre Gerard', 'Pregunta 3 sobre Gerard'
    ];

    if (finalMatch) {
        finalMatchContainer.textContent = `${finalMatch.match[0].name} (${finalMatch.match[0].team}) vs ${finalMatch.match[1].name} (${finalMatch.match[1].team})`;
        showQuestion();
    }

    correctButton.addEventListener('click', () => handleAnswer(true));
    incorrectButton.addEventListener('click', () => handleAnswer(false));
    finishFinalButton.addEventListener('click', finishFinal);

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionElement.textContent = questions[currentQuestionIndex];
            questionContainer.style.display = 'block';
            finishFinalButton.style.display = 'none';
        } else {
            questionContainer.style.display = 'none';
            finishFinalButton.style.display = 'block';
        }
    }

    function handleAnswer(isCorrect) {
        if (isCorrect) {
            alert('Respuesta correcta! Obtienes un punto.');
        } else {
            alert('Respuesta incorrecta. No obtienes punto.');
        }
        currentQuestionIndex++;
        questionContainer.style.display = 'none';
        showQuestion();
    }

    function finishFinal() {
        let winner = finalMatch.match[0]; // Aquí pots implementar la lògica per determinar el guanyador
        localStorage.setItem('tournamentWinner', JSON.stringify(winner));
        window.location.href = 'winner.html';
    }
});