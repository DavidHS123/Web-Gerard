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
    const imatgesAleatories = imatges.sort(() => 0.5 - Math.random()).slice(0, 8);
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
    jocMemoria = Array(16).fill(null);
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

function obrirCarruselImatges() {
    const jocContainer = document.getElementById('joc-container');
    jocContainer.classList.add('fullscreen');
    jocContainer.innerHTML = `
        <button class="close-button" onclick="tancarJoc()">×</button>
        <div class="carrusel">
            <button class="prev" onclick="canviarImatge(-1)">&#10094;</button>
            <div class="carrusel-content">
                ${imatges.map((img, i) => `<div class="carrusel-item" style="display: ${i === 0 ? 'block' : 'none'};"><img src="${img}" alt="Imatge"></div>`).join('')}
            </div>
            <button class="next" onclick="canviarImatge(1)">&#10095;</button>
        </div>
    `;
    indexImatgeActual = 0;
}

let indexImatgeActual = 0;
let indexVideoActual = 0;
function obrirCarruselVideos() {
    const jocContainer = document.getElementById('joc-container');
    jocContainer.classList.add('fullscreen');
    jocContainer.innerHTML = `
        <button class="close-button" onclick="tancarJoc()">×</button>
        <div class="carrusel">
            <button class="prev" onclick="canviarVideo(-1)">&#10094;</button>
            <div class="carrusel-content">
                ${videos.map((video, i) => `<div class="carrusel-item" style="display: ${i === 0 ? 'block' : 'none'};"><video src="${video}" controls></video></div>`).join('')}
            </div>
            <button class="next" onclick="canviarVideo(1)">&#10095;</button>
        </div>
    `;
    indexVideoActual = 0;
}

function canviarImatge(n) {
    const items = document.querySelectorAll('.carrusel-item');
    items[indexImatgeActual].style.display = 'none';
    indexImatgeActual = (indexImatgeActual + n + items.length) % items.length;
    items[indexImatgeActual].style.display = 'block';
}

function canviarVideo(n) {
    const items = document.querySelectorAll('.carrusel-item');
    items[indexVideoActual].style.display = 'none';
    indexVideoActual = (indexVideoActual + n + items.length) % items.length;
    items[indexVideoActual].style.display = 'block';
}