import { produtos } from './produtos.js';

// ========================================================================
// Criar produtos
// ========================================================================

const produtos_section = document.querySelector('#produtos');
const cesto_section = document.querySelector('#cesto');
const quantProdutos_p = document.querySelector('#quantProdutos');
let quantProduto = 0;

produtos.forEach(function(produto) {
    criarElementosHMTML(produtos_section, produto.title, produto.image, produto.category, produto.price, produto.description, produto.rating.rate, produto.rating.count);

    quantProdutos_p.textContent = ++quantProduto;
});

// for (let i = 0; i<10; i++) {
//     criarElementosHMTML(produtos_section, produtos[i].title, produtos[i].image, produtos[i].category, produtos[i].price, produtos[i].description);

//     quantProdutos_p.textContent = ++quantProduto;
// }



// Criando e dando valores aos elementos HTML
function criarElementosHMTML(noPai, title, image, category, price, description, rate, ratingCount) {
    let article = document.createElement('article');
    let img = document.createElement('img');
    let h3 = document.createElement('h3');
    let span = document.createElement('span');
    let span_2 = document.createElement('span');
    let span_3 = document.createElement('span');
    let span_4 = document.createElement('span');
    let span_5 = document.createElement('span');
    let span_6 = document.createElement('span');
    let p = document.createElement('p');
    let p_2 = document.createElement('p');
    let p_3 = document.createElement('p');
    let button = document.createElement('button');
    let button_2 = document.createElement('button');

    img.setAttribute('src', image);
    img.setAttribute('alt', category);

    span_3.innerHTML = '<span class="material-symbols-outlined">hotel_class</span>' + rate;
    span_3.classList.add('avaliacao');

    h3.textContent = title;
    
    span.textContent = price + ' €';
    span.classList.add('preco');
    button_2.textContent = 'Ver mais';
    p_2.append(span, button_2);

    span_4.textContent = description;
    span_6.textContent = ratingCount;
    span_6.classList.add('contAvaliacao')
    span_5.append('Avaliado por ', span_6, ' pessoas');
    p.append(span_4, span_5);
    p.classList.add('descricao');
    button_2.addEventListener('click', () => {
        mostrarDescricao(window.getComputedStyle(p).display, button_2, p);
    });

    span_2.textContent = 'shopping_bag';
    span_2.classList.add('material-symbols-outlined');
    p_3.textContent = (noPai.id == 'cesto') ? '-' : '+';
    button.classList.add('adicionarCesto');
    button.append(span_2, p_3);
    button.addEventListener('click', () => {
        adionarNoCesto(article, p_3);
    });

    article.classList.add('produto');

    criarNos(noPai, article, h3, img, p_2, p, button, span_3);
}

// Criando os nós pai e filho
function criarNos(noPai, article, h3, img, p_2, p, button, span_3) {
    article.append(img, span_3, h3, p_2, p, button);
    noPai.append(article);
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












// ========================================================================
// Adicionar no cesto
// ========================================================================

const h2_cesto = document.querySelector('#h2_cesto');
const custoTotal_p = document.querySelector('#custoTotal');
const quantCesto_p = document.querySelector('#quantCesto');
let quantCesto = 0;
let custoTotal = 0;

function adionarNoCesto(article, p) {
    if (p.textContent == '+') {
        let title = article.querySelector('h3').textContent;
        let image = article.querySelector('img').src;
        let category = article.querySelector('img').alt;
        let price = article.querySelector('.preco').textContent.slice(0, -2);
        let description = article.querySelector('.descricao').textContent;
        let rate = article.querySelector('.avaliacao').textContent.slice(-3);
        let ratingCount = article.querySelector('.contAvaliacao').textContent;

        custoTotal += (parseFloat(price));
        quantCesto++;

        criarElementosHMTML(cesto_section, title, image, category, price, description, rate, ratingCount);
    } else if (p.textContent == '-') {
        custoTotal -= article.querySelector('.preco').textContent.slice(0, -2);
        article.remove();
        quantCesto--;
    }

    quantCesto_p.textContent = quantCesto;

    if (custoTotal == 0) {
        custoTotal_p.style.display = 'none';
    } else {
        custoTotal_p.textContent = custoTotal.toFixed(2) + ' €';
        custoTotal_p.style.display = 'inline';
    }

    if (cesto_section.children.length != 0) {
        h2_cesto.style.display = 'flex';
        cesto_section.style.display = 'flex';
    } else {
        h2_cesto.style.display = 'none';
        cesto_section.style.display = 'none';
    }
}
