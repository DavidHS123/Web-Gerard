let jugadors = JSON.parse(localStorage.getItem('jugadors')) || [];
let partitActual = 0;
let resultatPartit = "";
let jugadorActual = null; // Variable per controlar quin jugador ha de respondre la pregunta actual
let guanyador = null;
let perdedor = null;
let preguntes = [
  "Quin és l'esport favorit d'en Gerard?",
  "Quina és la seva pel·lícula d'infantesa preferida?",
  "Quin és el seu record més divertit d'infància?"
];
const reptes = [
  "Ballar una cançó aleatòria: Has de ballar una cançó escollida pel guanyador durant 30 segons.",
  "Carregar a un company: Carrega a un company durant 10 segons sense deixar-lo caure.",
  "Caminar de talons: Camina durant 1 minut sobre talons o sabates incòmodes.",
  "Fer una acrobàcia de calistenia: Intenta fer una acrobàcia de calistenia com una flexió amb aplaudiment o una parada de mans.",
  "Imitar un animal: Imitar un animal i mantenir la postura durant 1 minut."
];
const comodins = [
  "Comodí de Salvament: Pots salvar-te d’un repte o pregunta difícil si el seu nivell és molt alt o complicat.",
  "Comodí de Repetició: Permet tornar a jugar un partit que has perdut o refet, donant-te una segona oportunitat.",
  "Comodí de Pregunta Extra: Potser pots evitar una pregunta difícil afegint una altra pregunta i intentant aconseguir-la."
];
let preguntesRealitzades = [];

function iniciarJoc() {
    window.location.href = 'afegirJugadors.html';
}

function afegirJugador() {
  const nom = document.getElementById('nomJugador').value;
  const equip = document.getElementById('equipJugador').value;
  
  if (nom && equip) {
    jugadors.push({ nom, equip });
    document.getElementById('jugadorsLlistat').innerHTML = jugadors.map(j => `${j.nom} - ${j.equip}`).join('<br>');
    document.getElementById('nomJugador').value = '';
    document.getElementById('equipJugador').value = '';
  }
}

function començarTorneig() {
  if (jugadors.length < 2) {
    alert('Necessites almenys dos jugadors per començar el torneig!');
    return;
  }
  localStorage.setItem('jugadors', JSON.stringify(jugadors));
  window.location.href = 'bracket.html';
}

function generarEmparellaments() {
  if (jugadors.length < 2) {
    alert('Necessites almenys dos jugadors per començar el torneig!');
    return;
  }

  jugadors = jugadors.sort(() => Math.random() - 0.5);

  let bracketHTML = '';
  for (let i = 0; i < jugadors.length; i += 2) {
    if (i + 1 < jugadors.length) {
      bracketHTML += `
        <div class="partit">
          <span>${jugadors[i].nom} (${jugadors[i].equip})</span>
          <span>vs</span>
          <span>${jugadors[i + 1].nom} (${jugadors[i + 1].equip})</span>
        </div>
      `;
    }
  }

  document.getElementById('bracket').innerHTML = bracketHTML;
}

function començarPartit() {
  if (jugadors.length < 2) {
    alert('Necessites almenys dos jugadors per començar el torneig!');
    return;
  }

  generarEmparellaments();
  window.location.href = 'partits.html';
}

window.onload = generarEmparellaments;
window.onload = function() {
    mostrarPartit();
    generarResultat();
  };
function mostrarPartit() {
    if (partitActual < jugadors.length - 1) {
      const jugador1 = jugadors[partitActual];
      const jugador2 = jugadors[partitActual + 1];
  
      document.getElementById('partit').innerHTML = `
        <h2>${jugador1.nom} (${jugador1.equip}) vs ${jugador2.nom} (${jugador2.equip})</h2>
      `;
      generarResultat(jugador1, jugador2);
    } else {
      document.getElementById('partit').innerHTML = '<h2>El torneig ha acabat! Felicitats al guanyador!</h2>';
    }
  }
  
// Generar resultat de partit i determinar guanyador i perdedor
function generarResultat(jugador1, jugador2) {
    let golsJugador1 = Math.floor(Math.random() * 6);
    let golsJugador2 = Math.floor(Math.random() * 6);
  
    document.getElementById('resultat').innerHTML = `
      <h3>Resultat final: </h3>
      <p>${jugador1.nom} (${jugador1.equip}) ${golsJugador1} - ${golsJugador2} ${jugador2.nom} (${jugador2.equip})</p>
    `;
  
    // Determinar guanyador i perdedor
    if (golsJugador1 > golsJugador2) {
      guanyador = jugador1;
      perdedor = jugador2;
    } else if (golsJugador2 > golsJugador1) {
      guanyador = jugador2;
      perdedor = jugador1;
    } else {
      guanyador = Math.random() < 0.5 ? jugador1 : jugador2;
      perdedor = guanyador === jugador1 ? jugador2 : jugador1;
    }
  
    document.getElementById('resultat').innerHTML += `
      <p>${guanyador.nom} és el guanyador!</p>
      <p>${perdedor.nom} ha perdut aquest partit.</p>
    `;
  
    // Estableix el jugador actual per fer la primera pregunta
    jugadorActual = perdedor;
    mostrarPregunta(jugadorActual, 'perdedor');
  }
  
  // Mostrar pregunta per al jugador actual
  function mostrarPregunta(jugador, tipus) {
    // Netejar qualsevol resultat previ de repte o comodí
    document.getElementById('comodi').innerHTML = '';
    document.getElementById('repte').innerHTML = '';
    document.getElementById('resultatFinal').innerHTML = '';
  
    if (preguntesRealitzades.length === preguntes.length) {
      preguntesRealitzades = [];
    }
  
    let preguntaIndex;
    do {
      preguntaIndex = Math.floor(Math.random() * preguntes.length);
    } while (preguntesRealitzades.includes(preguntaIndex));
  
    preguntesRealitzades.push(preguntaIndex);
  
    // Mostrar la pregunta
    document.getElementById('pregunta').innerHTML = `
      <p>${preguntes[preguntaIndex]}</p>
    `;
  
    // Mostrar qui ha de respondre
    document.getElementById('ordrePreguntes').innerHTML = `
      <p>${jugador.nom} ha de respondre aquesta pregunta.</p>
    `;
  
    // Afegir els botons per comprovar la resposta
    document.getElementById('resposta').innerHTML = `
      <input type="text" id="respostaInput" placeholder="Escriu la teva resposta">
      <button onclick="comprovarResposta('${jugador.nom}', '${tipus}', true)">Resposta Correcta</button>
      <button onclick="comprovarResposta('${jugador.nom}', '${tipus}', false)">Resposta Incorrecta</button>
      <button onclick="següentPregunta()">Següent Pregunta</button>
    `;
  }
  
  // Comprovar la resposta i mostrar resultats segons qui sigui el jugador
  function comprovarResposta(jugadorNom, tipus, esCorrecta) {
    const resposta = document.getElementById('respostaInput').value.trim().toLowerCase();
    let respostaCorrecta = "gerard"; // Exemple de resposta correcta
  
    if (esCorrecta) {
      if (tipus === 'perdedor') {
        // Si el perdedor encerta, es salva del repte
        document.getElementById('resultatFinal').innerHTML = "<p>Resposta correcta! T'has salvat del repte!</p>";
      } else if (tipus === 'guanyador') {
        // Si el guanyador encerta, rep un comodí
        seleccionarComodi();
      }
    } else {
      document.getElementById('resultatFinal').innerHTML = "<p>Resposta incorrecta. Repte per a tu!</p>";
      if (tipus === 'perdedor') {
        seleccionarRepte(); // Si el perdedor no encerta, se li dona un repte
      }
    }
  }
  
  // Seleccionar un repte aleatoriament i mostrar-lo
  function seleccionarRepte() {
    let repteIndex = Math.floor(Math.random() * reptes.length);
    document.getElementById('repte').innerHTML = `<p>${reptes[repteIndex]}</p>`;
  }
  
  // Seleccionar un comodí aleatoriament i mostrar-lo
  function seleccionarComodi() {
    let comodíIndex = Math.floor(Math.random() * comodins.length);
    document.getElementById('comodi').innerHTML = `<p>${comodins[comodíIndex]}</p>`;
  }
  
  // Passar a la següent pregunta
  function següentPregunta() {
    if (jugadorActual === perdedor) {
      // Passar al guanyador després que el perdedor respongui
      jugadorActual = guanyador;
      mostrarPregunta(jugadorActual, 'guanyador');
    } else if (jugadorActual === guanyador) {
      // Finalitzar el partit després que el guanyador respongui
      document.getElementById('resultatFinal').innerHTML = `
        <p>Finalitzat! El guanyador ha respost!</p>
      `;
    }
  }