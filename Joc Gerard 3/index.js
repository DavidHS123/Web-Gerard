document.addEventListener('DOMContentLoaded', function() {
    const startGameButton = document.getElementById('start-game');
    const viewInstructionsButton = document.getElementById('view-instructions');

    if (startGameButton) {
        startGameButton.addEventListener('click', startGame);
    }
    if (viewInstructionsButton) {
        viewInstructionsButton.addEventListener('click', viewInstructions);
    }
});

function startGame() {
    window.location.href = 'add-players.html';
}

function viewInstructions() {
    window.location.href = 'instructions.html';
}