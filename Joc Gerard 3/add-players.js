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
    } else {
        alert('Por favor, introduce el nombre del jugador y selecciona un equipo.');
    }
}

function generateTournament() {
    if (players.length < 2) {
        alert('Necessites almenys 2 jugadors per generar un torneig.');
        return;
    }
    localStorage.setItem('players', JSON.stringify(players));
    window.location.href = 'bracket.html';
}