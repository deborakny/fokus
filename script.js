const html = document.querySelector('html');
const buttonFoco = document.querySelector('.app__card-button--foco');
const buttonCurto = document.querySelector('.app__card-button--curto');
const buttonLongo = document.querySelector('.app__card-button--longo');

buttonFoco.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco')
});

buttonCurto.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto')
});

buttonLongo.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo')
});
