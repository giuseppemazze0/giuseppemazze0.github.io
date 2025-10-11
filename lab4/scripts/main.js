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
    let timer = Math.floor(Math.random() * (5000 + 1)) + 1000;

    setTimeout(() => {
        rato.style.display = 'block'
    }, timer);
}
function toggle_mouseOverRato(toggleStatus) {
    if (toggleStatus) {
        ocultarHTMLConversa();
        p_texto.style.display = 'block';
        p_texto.textContent = 'PEGUE O RATO!! ANTES QUE ELE ROUBE OUTRA AZEITONA!';
    } else {
        p_texto.style.display = 'none';
    }
}

rato.addEventListener('click', () => clicarRato());
rato.addEventListener('mouseover', () => toggle_mouseOverRato(true));
rato.addEventListener('mouseout', () => toggle_mouseOverRato(false));



// Moeda

let countMoeda = 0;
const span_moedas = document.querySelector("#moedas");

function adicionarMoeda() {
    span_moedas.textContent = ++countMoeda;
}
function removerMoeda(moedasRemovidas) {
    if (countMoeda < moedasRemovidas) {
        return false;
    }
    console.log(countMoeda)
    console.log(moedasRemovidas)

    countMoeda -= moedasRemovidas;
    span_moedas.textContent = countMoeda;
    return true
}

span_moedas.addEventListener('click', () => adicionarMoeda());



// Garçonete

let countConversa = 0;
const p_texto = document.querySelector('#container-garconete p');
const button_avancar = document.querySelector('#avancar');
const button_regras = document.querySelector('#regras');
const button_juntarDinheiro = document.querySelector("#juntar-dinheiro");
const button_darRato = document.querySelector('#dar-rato');
const input_inputConversa = document.querySelector('#input-conversa');
const garconete = document.querySelector('#garconete');
const todasConversas = 
['Saudações calorosas, viajante! Seja bem-vindo à Taberna DIW!',
'Você me parece novo por estas terras, aventureiro(a). Diga-me, qual é o seu nome?',
'É um prazer conhecê-lo! Sinta-se em casa. Há uma mesa livre logo à direita.',
'Antes de partir, diga-me: qual é a sua cor favorita (em inglês)?',
'Ora, ora, vejo que voltou, aventureiro(a)! Em que posso lhe ser útil desta vez?'
];

function mostrarHTMLConversa() {
    button_avancar.style.display = 'block';
    p_texto.style.display = 'block';
}
function ocultarHTMLConversa() {
    p_texto.style.display = 'none';
    button_avancar.style.display = 'none';
    button_regras.style.display = 'none';
    button_juntarDinheiro.style.display = 'none';
    button_darRato.style.display = 'none';
    input_inputConversa.style.display = 'none';
    button_comprarBebida.style.display = 'none';
}
function conversa() {
    ocultarHTMLConversa();

    if (countConversa == todasConversas.length) {
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
        button_juntarDinheiro.style.display = 'block';
        button_regras.style.display = 'block';
    }
    if (countRato > 0) {
        button_juntarDinheiro.style.display = 'none';
        button_darRato.style.display = 'block';
    }
}
function conversaRegras() {
    ocultarHTMLConversa();
    mostrarHTMLConversa();
    button_regras.style.display = 'none';
    p_texto.textContent = 'Regras? Heh... apenas uma, meu caro: não faça bagunça na Taberna DIW, e todos sairão vivos e satisfeitos.'
}
function conversaJuntarDinheiro() {
    ocultarHTMLConversa();
    mostrarHTMLConversa();
    button_juntarDinheiro.style.display = 'none';
    p_texto.textContent = 'Hmm... então estás precisando juntar umas moedas, hein? Entendo! Ultimamente tem aparecido uma praga de ratos por aqui. Traga-me essas criaturinhas, e pagarei bem pelo serviço de limpeza.';
    setTimeout(() => {
        rato.style.display = 'block' 
    }, 6000);
}
function darRato() {
    ocultarHTMLConversa();
    mostrarHTMLConversa();
    inventarioMoeda.style.display = 'flex';
    adicionarMoeda();
    countRato--;
    span_ratos.textContent = countRato;

    p_texto.textContent = 'Bom trabalho, aventureiro(a)! Aqui está tua recompensa, mais do que merecida.'

    if (countRato == 0) {
        button_darRato.style.display = 'none';
    }
}
function avancarConversa() {
    if (eConversaBebida || countConversa == 4) {
        ocultarHTMLConversa();
        eConversaBebida = false;
        return;
    }
    if (countConversa == 3) {
        ocultarHTMLConversa();
        countConversa++;
        return;
    }

    countConversa++;
    conversa();
}

garconete.addEventListener('click', () => conversa());
button_avancar.addEventListener('click', () => avancarConversa());
button_regras.addEventListener('click', () => conversaRegras());
input_inputConversa.addEventListener('keyup', () => conversa());
button_juntarDinheiro.addEventListener('click', () => conversaJuntarDinheiro());
button_darRato.addEventListener('click', () => darRato());



// Bebidas

let bebidaAtual;
let eConversaBebida = false;
let garrafasQuebradas = 0;
const cocaCola = document.querySelector('#coca-cola');
const cerveja = document.querySelector('#cerveja');
const bebidaMisteriosa = document.querySelector('#bebida-misteriosa');
const garrafas = [cocaCola, cerveja, bebidaMisteriosa];
const button_comprarBebida = document.querySelector('#comprar-bebida');

function tabelaPrecoBebida(bebida) {
    let preco;

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

    return preco;
}
function conversaComprarBebida(bebida) {
    ocultarHTMLConversa();
    mostrarHTMLConversa();
    eConversaBebida = true;
    bebidaAtual = bebida;

    let preco = tabelaPrecoBebida(bebida);

    p_texto.textContent = 'Esta bebida custa ' + preco + ' moedas. (Mas cuidado, aventureiro(a)! Não me venha apertar duas vezes as garrafas, ouviu?)';
    button_comprarBebida.style.display = 'block';
}
function explodirGarrafa(bebida) {
    ocultarHTMLConversa();
    mostrarHTMLConversa();

    switch (bebida) {
        case 'coca-cola':
            p_texto.textContent = 'VOCÊ QUEBROU A GARRAFA DE ' + bebida.toUpperCase() + '!! CÉUS, ISSO VAI SAIR CARO!'
            break;
        case 'cerveja':
            p_texto.textContent = 'POR TODAS AS DIVINDADES! VOCÊ QUEBROU A GARRAFA DE ' + bebida.toUpperCase() + '!! SABE QUANTO CUSTA ESSA RARIDADE?!'
            break;
        case 'bebida-misteriosa':
            p_texto.textContent = 'PELOS DEUSES ANTIGOS! A GARRAFA DE ' + bebida.toUpperCase() + ' FOI DESTRUÍDA!! MALDIÇÃO AVENTUREIRO, ISSO CUSTARÁ CARO!';
    }

    garrafasQuebradas++;

    if (garrafasQuebradas == garrafas.length) {
        garconete.src = 'images/garconete-brava.png';
        button_avancar.style.display = 'none';
        setTimeout(() => {
            p_texto.textContent = 'OLHA A BAGUNÇA QUE VOCÊ VEZ!!'
        }, 2000);

        setTimeout(() => {
            alert('Parabéns, aventureiro(a)! Conseguiu o impossível: ser expulso da Taberna DIW por não obedecer às regras... só havia uma, e mesmo assim conseguiu quebrá-la!');
            window.location.href = "../index.html";
        }, 3500);
    }
}
function comprarBebida() {
    let preco = tabelaPrecoBebida(bebidaAtual);
    eConversaBebida = true;

    if (!removerMoeda(preco)) {
        button_comprarBebida.style.display = 'none';
        p_texto.textContent = 'Heh... parece que suas moedas fugiram da bolsa, hein? Converse comigo depois — posso ter um serviço pra quem não teme trabalho (nem ratos).'
        return;
    }

    button_comprarBebida.style.display = 'none';

    switch (bebidaAtual) {
        case 'coca-cola':
            p_texto.textContent = 'Ah, a lendária Coca-Cola! Dizem que até os guerreiros mais sedentos encontram alívio nela nos dias de sol escaldante.'
            break;
        case 'cerveja':
            p_texto.textContent = 'Ora, ora! Vejo que a nossa cerveja artesanal conquistou mais um fã! Cuidado, aventureiro(a)... ela é forte o bastante pra derrubar um ogro!'
            break;
        case 'bebida-misteriosa':
            p_texto.textContent = 'EI! TENHA CALMA! NÃO BEBA ESSA BEBIDA MISTERIOSA DE UMA VEZ SÓ! NEM EU SEI O QUE TEM AÍ DENTRO!'
            setTimeout(() => {
                alert('Você sente uma forte dor de barriga e precisa se retirar da Taberna DIW para ir a um certo lugar... em busca de... alívio. Melhor correr antes que seja tarde demais!');

                window.location.href = "../index.html";
            }, 4000);
    }
}

for (let i = 0; i < garrafas.length; i++) {
    garrafas[i].addEventListener('click', () => conversaComprarBebida(garrafas[i].id));
    garrafas[i].addEventListener('dblclick', () => explodirGarrafa(garrafas[i].id));
}
button_comprarBebida.addEventListener('click', () => comprarBebida());



// Cachorro

let countCarinho = 0;
const cachorro = document.querySelector('#cachorro');
const coracoes = document.querySelector('#coracoes');

function fazerCarinho() {
    if (++countCarinho % 100 == 0) {
        countCarinho = 0;
        coracoes.classList.add('mostrar');

        setTimeout(() => {
            coracoes.classList.remove('mostrar')
        }, 4000);
    }
}
function toggle_mouseOverCachorro(toggleStatus) {
    if (toggleStatus) {
        ocultarHTMLConversa();
        p_texto.style.display = 'block';
        p_texto.textContent = 'O Rex adora gestos de afeto. Um carinho, e ele será seu amigo para sempre.';
    } else {
        p_texto.style.display = 'none';
    }
}

cachorro.addEventListener('mousemove', () => fazerCarinho());
cachorro.addEventListener('mouseover', () => toggle_mouseOverCachorro(true));
cachorro.addEventListener('mouseout', () => toggle_mouseOverCachorro(false));