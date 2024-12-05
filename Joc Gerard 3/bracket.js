document.addEventListener('DOMContentLoaded', function() {
    const players = JSON.parse(localStorage.getItem('players'));
    if (!players) {
        alert('No hi ha jugadors. Torna a la pàgina anterior.');
        window.location.href = 'add-players.html';
        return;
    }

    let rounds = [];
    let currentRound = 0;

    function generateBracket() {
        rounds = [];
        let shuffledPlayers = players.sort(() => 0.5 - Math.random());
        for (let i = 0; i < shuffledPlayers.length; i += 2) {
            if (shuffledPlayers[i + 1]) {
                rounds.push({ match: [shuffledPlayers[i], shuffledPlayers[i + 1]], winner: null, result: null });
            }
        }
        displayBracket();
    }

    function displayBracket() {
        const bracketContainer = document.getElementById('bracket-container');
        bracketContainer.innerHTML = '';
        rounds.forEach((round, index) => {
            const matchDiv = document.createElement('div');
            matchDiv.className = 'match';
            matchDiv.textContent = `${round.match[0].name} (${round.match[0].team}) vs ${round.match[1].name} (${round.match[1].team})`;
            if (round.result) {
                const resultDiv = document.createElement('div');
                resultDiv.textContent = `Resultat: ${round.result}`;
                matchDiv.appendChild(resultDiv);
            } else {
                const playButton = document.createElement('button');
                playButton.textContent = 'Jugar Partido';
                playButton.addEventListener('click', () => {
                    localStorage.setItem('currentMatch', JSON.stringify(round));
                    localStorage.setItem('currentMatchIndex', index);
                    window.location.href = 'match.html';
                });
                matchDiv.appendChild(playButton);
            }
            bracketContainer.appendChild(matchDiv);
        });
    }

    generateBracket();
});