document.addEventListener('DOMContentLoaded', function() {
    const winnerInfo = document.getElementById('winner-info');
    const backToHomeButton = document.getElementById('back-to-home');

    // Obtenir el guanyador del torneig des de localStorage
    const winner = localStorage.getItem('tournamentWinner');
    if (winner) {
        winnerInfo.textContent = `El guanyador del torneig és: ${winner}`;
    } else {
        winnerInfo.textContent = 'No s\'ha determinat cap guanyador.';
    }

    backToHomeButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});