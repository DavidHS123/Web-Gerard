const imatges = Array.from({ length: 170 }, (_, i) => `img/img${i + 1}.jpg`);
const videos = Array.from({ length: 15 }, (_, i) => `video/vid${i + 1}.mp4`);

let fotosTorneig = [];
let indexFotoActual = 0;

function tancarJoc() {
    const jocContainer = document.getElementById('joc-container');
    jocContainer.classList.remove('fullscreen');
    jocContainer.innerHTML = '';
}


function iniciarTorneigFotos() {
    fotosTorneig = imatges.slice(); // Utilitza totes les fotos disponibles
    fotosTorneig = fotosTorneig.sort(() => 0.5 - Math.random()); // Barreja les fotos
    indexFotoActual = 0;
    mostrarFotoActual();
}

function mostrarFotoActual() {
    const jocContainer = document.getElementById('joc-container');
    jocContainer.classList.add('fullscreen');
    jocContainer.innerHTML = `
        <button class="close-button" onclick="tancarJoc()">×</button>
        <div class="torneig-fotos">
            <img src="${fotosTorneig[indexFotoActual]}" alt="Foto del torneig">
            <div>
                <button onclick="seleccionarFoto(true)">Seleccionar</button>
                <button onclick="seleccionarFoto(false)">Descartar</button>
            </div>
            <p>Fotos restants: ${fotosTorneig.length - indexFotoActual - 1}</p>
        </div>
    `;
}

function seleccionarFoto(seleccionada) {
    if (seleccionada) {
        fotosTorneig.push(fotosTorneig[indexFotoActual]);
    }
    indexFotoActual++;
    if (indexFotoActual < fotosTorneig.length) {
        mostrarFotoActual();
    } else {
        if (fotosTorneig.length > 1) {
            fotosTorneig = fotosTorneig.slice(fotosTorneig.length / 2); // Redueix les fotos seleccionades a la meitat
            indexFotoActual = 0;
            mostrarFotoActual(); // Continua el torneig amb les fotos seleccionades
        } else {
            mostrarGuanyador();
        }
    }
}

function mostrarGuanyador() {
    const jocContainer = document.getElementById('joc-container');
    jocContainer.innerHTML = `
        <button class="close-button" onclick="tancarJoc()">×</button>
        <div class="torneig-fotos">
            <h2>Foto Guanyadora!</h2>
            <img src="${fotosTorneig[0]}" alt="Foto guanyadora">
        </div>
    `;
}
function iniciarVisualitzacioVideos() {
    indexVideoActual = 0;
    mostrarVideoActual();
}

function mostrarVideoActual() {
    const jocContainer = document.getElementById('joc-container');
    jocContainer.classList.add('fullscreen');
    jocContainer.innerHTML = `
        <button class="close-button" onclick="tancarJoc()">×</button>
        <div class="videos">
            <button class="prev" onclick="canviarVideo(-1)">&#10094;</button>
            <video src="${videos[indexVideoActual]}" controls></video>
            <button class="next" onclick="canviarVideo(1)">&#10095;</button>
        </div>
    `;
}

function canviarVideo(n) {
    indexVideoActual = (indexVideoActual + n + videos.length) % videos.length;
    mostrarVideoActual();
}