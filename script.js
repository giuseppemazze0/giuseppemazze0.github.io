/* atributos de eventos:
onclick
onmouseover
onmouseout
onchange
onkeyup
onkeydown
*/



// A. Variáveis
let toggleStatus;
const p_passaPorCima = document.querySelector('#passaPorCima');

let rgb;
const p_pinta = document.querySelector('#pinta');
const li_buttons = document.querySelectorAll('#li_buttons > button');

let count = 0;
const cores = ["purple", "gray", "yellow", "brown", "lightblue", "salmon"];
const input_mudaCorFundoInput = document.querySelector('#mudaCorFundoInput');

let cor;
const body = document.querySelector('body');
const input_mudaCorFundoBody = document.querySelector('#mudaCorFundoBody');
const input_submit = document.querySelector('#submit');

let contagem = 0;
const button_contador = document.querySelector('#contador');
const span_contagem = document.querySelector('#contagem');



// B. Manipuladores de eventos (Event Handlers)
function toggle_TrocaFrase(toggleStatus) {
    if (toggleStatus) {
        p_passaPorCima.textContent = "Obrigado por passares!";
    } else {
        p_passaPorCima.textContent = "Passa por aqui!";
    }
}

function pinta(rgb) {
    p_pinta.style.color = rgb;
}

function mudarCorFundoInput() {
    input_mudaCorFundoInput.style.backgroundColor = cores[count];
    count = ++count % cores.length;
}

function mudarCorFundoBody(cor) {
    body.style.backgroundColor = cor;
}

function contar() {
    span_contagem.textContent = ++contagem;
}


// C. Lista de eventos (Event Listeners)
p_passaPorCima.addEventListener('mouseover', () => toggle_TrocaFrase(true));
p_passaPorCima.addEventListener('mouseout', () => toggle_TrocaFrase(false));

li_buttons[0].addEventListener('click', () => pinta("red"));
li_buttons[1].addEventListener('click', () => pinta("green"));
li_buttons[2].addEventListener('click', () => pinta("blue"));

input_mudaCorFundoInput.addEventListener('keydown', () => mudarCorFundoInput());

input_submit.addEventListener('click', () => mudarCorFundoBody(input_mudaCorFundoBody.value));

contador.addEventListener('click', () => contar());