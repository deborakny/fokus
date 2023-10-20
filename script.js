const html = document.querySelector('html');
const buttonFoco = document.querySelector('.app__card-button--foco');
const buttonCurto = document.querySelector('.app__card-button--curto');
const buttonLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaInput = document.querySelector('#alternar-musica');
const buttonIniciarOuPausar = document.querySelector('#start-pause span');
const iniciarOuPausarImg = document.querySelector('.app__card-primary-butto-icon');
const buttonStartPause = document.querySelector('#start-pause');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const alarmeTempoZero = new Audio('/sons/beep.mp3');
const somIniciarTemporizador = new Audio('/sons/play.wav');
const somPausarTemporizador = new Audio('/sons/pause.mp3');

musica.loop = true;

let tempoDecorridoEmSegundos = 7;
let intervaloId = null;

let context="foco";

musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

buttonFoco.addEventListener('click', () => {
    //tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    buttonFoco.classList.add('active');
});

buttonCurto.addEventListener('click', () => {
    //tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    buttonCurto.classList.add('active');
});

buttonLongo.addEventListener('click', () => {
    //tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    buttonLongo.classList.add('active');
});

function alterarContexto(contexto) {    
    this.context = contexto;
    reiniciarTempo();
    botoes.forEach((target) => {
        target.classList.remove('active')
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície,<br>
            <strong class="app__title-strong">Faça uma pausa longa</strong>`
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar();
        alarmeTempoZero.play();
        reiniciarTempo();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

buttonStartPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        somPausarTemporizador.play();
        zerar();
        return;
    } else {
        somIniciarTemporizador.play();
        intervaloId = setInterval(contagemRegressiva, 1000);
        buttonIniciarOuPausar.textContent = 'Pausar';
        iniciarOuPausarImg.setAttribute('src', '/imagens/pause.png');
    }
}

function zerar() {
    clearInterval(intervaloId);
    buttonIniciarOuPausar.textContent = 'Começar';
    iniciarOuPausarImg.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

function reiniciarTempo() {

    if (this.context) {
        if (this.context == 'descanso-curto') {
            tempoDecorridoEmSegundos = 300;
            mostrarTempo();
        } else if (this.context == 'descanso-longo') {
            tempoDecorridoEmSegundos = 900;
            mostrarTempo();
        } else if (this.context == 'foco') {
            tempoDecorridoEmSegundos = 1500;
            mostrarTempo();
        }
    } else {
        tempoDecorridoEmSegundos = 1500;
        mostrarTempo();
    }
}

reiniciarTempo()

mostrarTempo();