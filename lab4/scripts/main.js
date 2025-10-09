// Invertário

const header = document.querySelector('header');
const inventarioNome = document.querySelector('#inventario-nome');
let nome = document.querySelector('#inventario-nome p');
const inventarioMoeda = document.querySelector('#inventario-moeda');
const inventarioRato = document.querySelector('#inventario-rato');

function mostrarHeader() {
    header.style.display = 'block';
}
function mostrarInventarioMoeda() {
    mostrarHeader();
    inventarioMoeda.style.display = 'flex';
}
function mostrarInventarioRato() {
    mostrarHeader();
    inventarioRato.style.display = 'flex';
}
function mostrarInventarioNome() {
    mostrarHeader();
    inventarioNome.style.display = 'flex';
}



// Rato

let toggleStatus;
let countRato = 0;
const rato = document.querySelector('#rato');
const span_ratos = document.querySelector('#ratos');

function clicarRato() {
    span_ratos.textContent = ++countRato;
    rato.style.display = 'none';
    invocarRato();

    if (countRato == 1) {
        mostrarInventarioRato();
    }
}
function invocarRato() {
    let timer = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;

    setTimeout(() => {
        rato.style.display = 'block'
    }, timer);
}
function toggle_mouseOverRato(toggleStatus) {
    if (toggleStatus) {
        ocultarHTMLConversa();
        p_texto.style.display = 'block';
        p_texto.textContent = 'PEGUE O RATO!!';
    } else {
        p_texto.style.display = 'none';
    }
}

rato.addEventListener('click', () => clicarRato());
rato.addEventListener('mouseover', () => toggle_mouseOverRato(true));
rato.addEventListener('mouseout', () => toggle_mouseOverRato(false));



// Garçonete

let countConversa = 0;
const p_texto = document.querySelector('#container-garconete p');
const button_avancar = document.querySelector('#avancar');
const button_regras = document.querySelector('#regras');
const input_inputConversa = document.querySelector('#input-conversa');
const garconete = document.querySelector('#garconete');
const todasConversas = 
['Olá, seja bem-vindo a Taverda DIW!',
'Você parece ser novo por aqui, aventureiro(a). Diga-me seu nome',
'Prazer em conhecê-lo! Sinta-se a vontade. Temos uma mesa livre logo a direita.',
'Antes de ir, diga-me qual é a sua cor favorita (em inglês).'
];


function mostrarHTMLConversa() {
    button_avancar.style.display = 'block';
    p_texto.style.display = 'block';
}
function ocultarHTMLConversa() {
    button_avancar.style.display = 'none';
    p_texto.style.display = 'none';
    button_regras.style.display = 'none';
    input_inputConversa.style.display = 'none';
}
function conversa() {
    if (countConversa == todasConversas.length) {
        ocultarHTMLConversa();
        return;
    }

    mostrarHTMLConversa();
    p_texto.textContent = todasConversas[countConversa];
    
    if (countConversa == 1 || countConversa == 3) {
        input_inputConversa.style.display = 'block';
        if (input_inputConversa.value == '') {
            button_avancar.style.display = 'none';
        }
    }
    if (countConversa == 2) {
        nome.textContent = input_inputConversa.value;
        input_inputConversa.value = '';
        input_inputConversa.style.display = 'none';
        mostrarInventarioNome();
    }
    if (countConversa == 3) {
        nome.style.color = input_inputConversa.value;
    }
    if (countConversa == 4) {
        input_inputConversa.style.display = 'none';
    }
}
function conversaRegras() {
    mostrarHTMLConversa();
    button_regras.style.display = 'none';
    p_texto.textContent = 'Regras? Ahh... sim, temos apenas uma regra aqui na Taverna DIW. Apenas não faça bagunça.'
}
function avancarConversa() {
    countConversa++;
    conversa();
}

garconete.addEventListener('click', () => conversa());
button_avancar.addEventListener('click', () => avancarConversa());
button_regras.addEventListener('click', () => conversaRegras());
input_inputConversa.addEventListener('keyup', () => conversa());



// Bebidas

let bebida;
let garrafasQuebradas = 0;
const cocaCola = document.querySelector('#coca-cola');
const cerveja = document.querySelector('#cerveja');
const bebidaMisteriosa = document.querySelector('#bebida-misteriosa');
const garrafas = [cocaCola, cerveja, bebidaMisteriosa];

function conversaComprarBebida(bebida) {
    let preco;
    mostrarHTMLConversa();

    switch (bebida) {
        case "coca-cola":
            preco = 3;
            break;
        case "cerveja":
            preco = 5;
            break;
        case "bebida-misteriosa":
            preco = 9;
            break;
    }

    p_texto.textContent = 'Esta bebida custa ' + preco + ' moedas. (Não pressione duas vezes seguidas nas garrafas. Por favor!)';

}
function explodirGarrafa(bebida) {
    p_texto.textContent = 'VOCÊ QUEBROU A GARRAFA DE ' + bebida.toUpperCase() + '!!';
    garrafasQuebradas++;

    if (garrafasQuebradas == garrafas.length) {
        garconete.src = 'images/garconete-brava.png';
        button_avancar.style.display = 'none';
        setTimeout(() => {
            p_texto.textContent = 'OLHA A BAGUNÇA QUE VOCÊ VEZ!!'
        }, 2000);

        setTimeout(() => {
            alert('Você foi expulso da Taverna DIW por não obedecer as regras... só tinha uma...');
            window.location.href = "../index.html";
        }, 3500);
    }
}

for (let i = 0; i < garrafas.length; i++) {
    garrafas[i].addEventListener('click', () => conversaComprarBebida(garrafas[i].id));
    garrafas[i].addEventListener('dblclick', () => explodirGarrafa(garrafas[i].id));
}



// Cachorro

let countCarinho = 0;
const cachorro = document.querySelector('#cachorro');
const coracoes = document.querySelector('#coracoes');

function fazerCarinho() {
    if (++countCarinho % 100 == 0) {
        countCarinho = 0;
        coracoes.classList.add('mostrar');
        console.log(coracoes)

        setTimeout(() => {
            coracoes.classList.remove('mostrar')
        }, 4000);
    }
}
function toggle_mouseOverCachorro(toggleStatus) {
    if (toggleStatus) {
        ocultarHTMLConversa();
        p_texto.style.display = 'block';
        p_texto.textContent = 'O Rex adora carinho.';
    } else {
        p_texto.style.display = 'none';
    }
}

cachorro.addEventListener('mousemove', () => fazerCarinho());
cachorro.addEventListener('mouseover', () => toggle_mouseOverCachorro(true));
cachorro.addEventListener('mouseout', () => toggle_mouseOverCachorro(false));