const imatges = Array.from({ length: 343 }, (_, i) => `img/img${i + 1}.jpg`);
const videos = Array.from({ length: 18 }, (_, i) => `video/vid${i + 1}.mp4`);

let joc = [];
let jugadorActual = '';
let jugadorSeguent = '';

let jocMemoria = [];
let parellaSeleccionada = [];

function iniciarTresEnRatlla() {
    const jocContainer = document.getElementById('joc-container');
    jocContainer.classList.add('fullscreen');
    jocContainer.innerHTML = `
        <button class="close-button" onclick="tancarJoc()">×</button>
        <div class="tres-en-ratlla">
            ${Array(9).fill().map((_, i) => `<button onclick="mouTresEnRatlla(${i})"></button>`).join('')}
        </div>
    `;
    joc = Array(9).fill(null);
    jugadorActual = imatges[0];
    jugadorSeguent = imatges[1];
}

function mouTresEnRatlla(index) {
    if (joc[index] === null) {
        joc[index] = jugadorActual;
        document.querySelectorAll('.tres-en-ratlla button')[index].style.backgroundImage = `url(${jugadorActual})`;
        [jugadorActual, jugadorSeguent] = [jugadorSeguent, jugadorActual];
        comprovaGuanyadorTresEnRatlla();
    }
}

function comprovaGuanyadorTresEnRatlla() {
    const combinacionsGuanyadores = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // files
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnes
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const combinacio of combinacionsGuanyadores) {
        const [a, b, c] = combinacio;
        if (joc[a] && joc[a] === joc[b] && joc[a] === joc[c]) {
            alert(`El jugador amb la imatge ${joc[a]} ha guanyat!`);
            iniciarTresEnRatlla();
            return;
        }
    }

    if (!joc.includes(null)) {
        alert('Empat!');
        iniciarTresEnRatlla();
    }
}

function iniciarMemoria() {
    const imatgesAleatories = imatges.sort(() => 0.5 - Math.random()).slice(0, 6);
    const imatgesDuplicades = [...imatgesAleatories, ...imatgesAleatories];
    imatgesDuplicades.sort(() => 0.5 - Math.random());

    const jocContainer = document.getElementById('joc-container');
    jocContainer.classList.add('fullscreen');
    jocContainer.innerHTML = `
        <button class="close-button" onclick="tancarJoc()">×</button>
        <div class="memoria">
            ${imatgesDuplicades.map((img, i) => `<button onclick="mouMemoria(${i}, '${img}')"></button>`).join('')}
        </div>
    `;
    jocMemoria = Array(12).fill(null);
    parellaSeleccionada = [];
}

function mouMemoria(index, img) {
    if (jocMemoria[index] === null && parellaSeleccionada.length < 2) {
        jocMemoria[index] = img;
        document.querySelectorAll('.memoria button')[index].style.backgroundImage = `url(${img})`;
        parellaSeleccionada.push({ index, img });

        if (parellaSeleccionada.length === 2) {
            if (parellaSeleccionada[0].img === parellaSeleccionada[1].img) {
                parellaSeleccionada = [];
            } else {
                setTimeout(() => {
                    parellaSeleccionada.forEach(({ index }) => {
                        jocMemoria[index] = null;
                        document.querySelectorAll('.memoria button')[index].style.backgroundImage = '';
                    });
                    parellaSeleccionada = [];
                }, 1000);
            }
        }
    }
}

function tancarJoc() {
    const jocContainer = document.getElementById('joc-container');
    jocContainer.classList.remove('fullscreen');
    jocContainer.innerHTML = '';
}