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
        playerItem.textContent = `${playerName} - ${team}`;
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
            rounds.push({ match: [shuffledPlayers[i].team, shuffledPlayers[i + 1].team], winner: null, result: null });
        }
    }
    console.log('Torneig generat:', rounds);
    displayBracket();
}

function displayBracket() {
    const bracketContainer = document.getElementById('bracket-container');
    bracketContainer.innerHTML = '';
    rounds.forEach((round, index) => {
        const matchDiv = document.createElement('div');
        matchDiv.className = 'match';
        matchDiv.textContent = `${round.match[0]} vs ${round.match[1]}`;
        if (round.result) {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = `Resultat: ${round.result}`;
            matchDiv.appendChild(resultDiv);
        } else {
            const playButton = document.createElement('button');
            playButton.textContent = 'Jugar Partido';
            playButton.addEventListener('click', () => {
                console.log('Jugant partit:', round.match);
                localStorage.setItem('currentMatch', JSON.stringify(round));
                localStorage.setItem('currentMatchIndex', index);
                window.location.href = 'match.html';
            });
            matchDiv.appendChild(playButton);
        }
        bracketContainer.appendChild(matchDiv);
    });
}