import { produtos } from './produtos.js';

// ========================================================================
// Criar produtos
// ========================================================================

const produtos_section = document.querySelector('#produtos');
const cesto_section = document.querySelector('#cesto');
const h2_produtos = document.querySelector('#h2_produtos');
const h2_cesto = document.querySelector('#h2_cesto');

produtos.forEach(function(produto) {
    
});

for (let i = 0; i<3; i++) {
    criarElementosHMTML(produtos[i].title, produtos[i].image, produtos[i].category, produtos[i].price, produtos[i].description);
}



// Criando e dando valores aos elementos HTML
function criarElementosHMTML(title, image, category, price, description, id) {
    let article = document.createElement('article');
    let img = document.createElement('img');
    let h3 = document.createElement('h3');
    let span = document.createElement('span');
    let span_2 = document.createElement('span');
    let p = document.createElement('p');
    let p_2 = document.createElement('p');
    let p_3 = document.createElement('p');
    let button = document.createElement('button');
    let button_2 = document.createElement('button');

    img.setAttribute('src', image);
    img.setAttribute('alt', category);

    h3.textContent = title;
    
    span.textContent = price + ' €';
    span.classList.add('preco');
    button_2.textContent = 'Ver mais';
    p_2.append(span, button_2);

    p.textContent = description;
    p.classList.add('descricao');
    button_2.addEventListener('click', () => {
        mostrarDescricao(window.getComputedStyle(p).display, button_2, p);
    });

    span_2.textContent = 'shopping_bag';
    span_2.classList.add('material-symbols-outlined');
    p_3.textContent = '+';
    button.classList.add('adicionarCesto');
    button.append(span_2, p_3);
    button.addEventListener('click', () => {
        adionarNoCesto(article, p_3);
    });

    article.classList.add('produto');

    criarNos(article, h3, img, p_2, p, button);
}

// Criando os nós pai e filho
function criarNos(article, h3, img, p_2, p, button) {
    article.append(img, h3, p_2, p, button);
    produtos_section.append(article);
}










// ========================================================================
// Ação botão para mostrar a descrição da peça de roupa
// ========================================================================

function mostrarDescricao(toggleStatus, button, p) {
    if (toggleStatus == 'block') {
        p.style.display = 'none';
        button.textContent = 'Ver mais';
    } else if (toggleStatus == 'none') {
        p.style.display = 'block';
        button.textContent = 'Ver menos';
    }   
}

function adionarNoCesto(article, p) {
    if (p.textContent == '+') {
        cesto_section.append(article);
        p.textContent = '-';
    } else if (p.textContent == '-') {
        produtos_section.append(article);
        p.textContent = '+';
    }

    if (cesto_section.children.length != 0) {
        h2_cesto.style.display = 'block';
        cesto_section.style.display = 'flex';
    } else {
        h2_cesto.style.display = 'none';
        cesto_section.style.display = 'none';
    }

    if (produtos_section.children.length != 0) {
        h2_produtos.style.display = 'block';
        produtos_section.style.display = 'flex';
    } else {
        h2_produtos.style.display = 'none';
        produtos_section.style.display = 'none';
    }
}
