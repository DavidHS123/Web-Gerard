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
    window.location.href = 'game.html';
}

function viewInstructions() {
    const instructions = document.getElementById('instructions');
    if (instructions.style.display === 'none') {
        instructions.style.display = 'block';
    } else {
        instructions.style.display = 'none';
    }
}