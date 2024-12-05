document.addEventListener('DOMContentLoaded', function() {
    const addPlayerButton = document.getElementById('add-player');
    const generateTournamentButton = document.getElementById('generate-tournament');

    if (addPlayerButton) {
        addPlayerButton.addEventListener('click', addPlayer);
    }
    if (generateTournamentButton) {
        generateTournamentButton.addEventListener('click', generateTournament);
    }
});

let players = [];
let rounds = [];
let currentRound = 0;

function addPlayer() {
    let playerName = document.getElementById('player-name').value;
    let team = document.getElementById('team-select').value;
    if (playerName && team) {
        players.push({ name: playerName, team: team });
        let playerList = document.getElementById('player-list');
        let playerItem = document.createElement('div');
        playerItem.textContent = `${playerName} (${team})`;
        playerList.appendChild(playerItem);
        document.getElementById('player-name').value = '';
        console.log('Jugador afegit:', playerName, team);
    } else {
        alert('Por favor, introduce el nombre del jugador y selecciona un equipo.');
    }
}

function generateTournament() {
    if (players.length < 2) {
        alert('Necessites almenys 2 jugadors per generar un torneig.');
        return;
    }
    document.getElementById('player-form').style.display = 'none';
    document.getElementById('generate-tournament').style.display = 'none';
    document.getElementById('tournament-bracket').style.display = 'block';

    // Lògica per generar el braket del torneig
    rounds = [];
    currentRound = 0;
    let shuffledPlayers = players.sort(() => 0.5 - Math.random());
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
        if (shuffledPlayers[i + 1]) {
            rounds.push({ match: [shuffledPlayers[i], shuffledPlayers[i + 1]], winner: null, result: null });
        }
    }
    localStorage.setItem('rounds', JSON.stringify(rounds));
    window.location.href = 'bracket.html';
}