// Variables globals
let players = [];
let teams = [];
let bracket = [];
let currentMatchIndex = 0;
let eliminatedPlayers = [];

// Funció per afegir jugadors
function addPlayer() {
    const playerName = document.querySelector("#player-name").value.trim();
    const teamSelector = document.querySelector("#team-selector");
    const selectedTeam = teamSelector.value;

    if (playerName && selectedTeam) {
        players.push({ name: playerName, team: selectedTeam, score: 0 });
        teams.push(selectedTeam);

        const playerList = document.querySelector("#player-list");
        const listItem = document.createElement("li");
        listItem.textContent = `${playerName} - ${selectedTeam}`;
        playerList.appendChild(listItem);

        // Netejar el formulari
        document.querySelector("#player-name").value = "";
        teamSelector.value = "";
        document.querySelector("#start-tournament-button").disabled = false;
    } else {
        alert("Si us plau, introdueix un nom i selecciona un equip.");
    }
}

// Funció per generar el bracket
function generateBracket() {
    if (players.length % 2 !== 0) {
        alert("El nombre de jugadors ha de ser parell per generar el bracket.");
        return;
    }
    while (players.length > 0) {
        const match = [];
        for (let i = 0; i < 2; i++) {
            if (players.length > 0) {
                match.push(players.shift());
            }
        }
        bracket.push(match);
    }
    window.location.href = "bracket.html"; // Redirigir al bracket
}

// Funció per mostrar el bracket
function displayBracket() {
    const bracketContainer = document.querySelector("#bracket");
    bracket.forEach((match, index) => {
        const matchDiv = document.createElement("div");
        matchDiv.classList.add("match");
        matchDiv.innerHTML = `
            <p>Partit ${index + 1}</p>
            <p>${match[0]?.name || "Bye"} (${match[0]?.team || "N/A"}) vs ${
            match[1]?.name || "Bye"
        } (${match[1]?.team || "N/A"})</p>
            <button onclick="playMatch(${index})">Jugar Partit</button>
        `;
        bracketContainer.appendChild(matchDiv);
    });
}

// Funció per jugar un partit
function playMatch(matchIndex) {
    const match = bracket[matchIndex];
    if (match.length < 2) {
        alert("No hi ha suficients jugadors per a aquest partit.");
        return;
    }

    const result = simulateMatch(match[0], match[1]);
    alert(`Resultat: ${result.winner.team} guanya!`);

    // Gestionar preguntes
    askQuestion(result.loser, "perdedor");
    askQuestion(result.winner, "guanyador");

    // Actualitzar bracket
    bracket.splice(matchIndex, 1, [result.winner]);
    eliminatedPlayers.push(result.loser);

    // Tornar al bracket
    setTimeout(() => {
        window.location.href = "bracket.html";
    }, 2000);
}

// Simular resultat d'un partit
function simulateMatch(player1, player2) {
    const score1 = Math.floor(Math.random() * 5);
    const score2 = Math.floor(Math.random() * 5);

    return score1 > score2
        ? { winner: player1, loser: player2 }
        : { winner: player2, loser: player1 };
}

// Fer preguntes
function askQuestion(player, role) {
    const question = generateQuestion();
    const answer = prompt(`Pregunta per ${role}: ${player.name}\n${question}`);

    if (!answer || Math.random() > 0.5) {
        alert(`${player.name} ha fallat la pregunta.`);
    } else {
        alert(`${player.name} ha encertat la pregunta!`);
    }
}

// Generar preguntes aleatòries sobre Gerard
function generateQuestion() {
    const questions = [
        "Quin és l'esport favorit d'en Gerard?",
        "En quin any va néixer en Gerard?",
        "Quin és l'equip favorit d'en Gerard?",
        "Quin és el color favorit d'en Gerard?",
        "A quin institut va anar en Gerard?"
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}

// Funció per finalitzar el joc
function finishTournament() {
    const winner = bracket[0][0];
    alert(`El guanyador del torneig és: ${winner.name} (${winner.team})!`);
    window.location.href = "winner.html";
}

// Assignar esdeveniments
document.querySelector("#add-player-button")?.addEventListener("click", addPlayer);
document.querySelector("#start-tournament-button")?.addEventListener("click", generateBracket);
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("bracket.html")) {
        displayBracket();
    }

    if (window.location.pathname.includes("match.html")) {
        const matchIndex = localStorage.getItem('currentMatchIndex');
        if (matchIndex !== null) {
            playMatch(matchIndex);
        }
    }
});
