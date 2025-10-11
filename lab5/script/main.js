/* atributos de eventos:
onclick
onmouseover
onmouseout
onchange
onkeyup
onkeydown
*/


// ================================================================
//Eventos 1.0

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

if (!localStorage.getItem('contador')) {
    localStorage.setItem('contador', 0);
}
span_contagem.textContent = localStorage.getItem('contador');
function contar() {
    let contador = localStorage.getItem('contador');
    contador++;
    span_contagem.textContent = contador;
    localStorage.setItem('contador', contador);
}


// C. Lista de eventos (Event Listeners)
p_passaPorCima.addEventListener('mouseover', () => toggle_TrocaFrase(true));
p_passaPorCima.addEventListener('mouseout', () => toggle_TrocaFrase(false));

li_buttons.forEach((e) => {
    e.addEventListener('click', () => pinta(e.dataset.color));
});

input_mudaCorFundoInput.addEventListener('keydown', () => mudarCorFundoInput());

input_submit.addEventListener('click', () => mudarCorFundoBody(input_mudaCorFundoBody.value));

button_contador.addEventListener('click', () => contar());


// ================================================================











// ================================================================
// Eventos 2.0


const select_mudaCorFundoBodySelect = document.querySelector('#mudaCorFundoBodySelect');

select_mudaCorFundoBodySelect.addEventListener('change', function() {
    body.style.backgroundColor = this.value;
});



const input_nome = document.querySelector('#nome');
const input_idade = document.querySelector('#idade');
const p_mostrarTexto = document.querySelector('#mostrarTexto'); 
const form = document.querySelector('#form');

function criarTexto(event) {
    event.preventDefault();
    p_mostrarTexto.textContent = `Olá, ${input_nome.value} tem ${input_idade.value}!`;
}

form.addEventListener('submit', criarTexto);



let contador = 0;
const span_contadorAutomatico = document.querySelector('#contadorAutomatico');

function contarAutomatico() {
    span_contadorAutomatico.textContent = ++contador;
}

setInterval(contarAutomatico, 1000);
