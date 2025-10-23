import { produtos as produtos_informatica } from './produtos-informatica.js';
import { produtos as produtos_casual } from './produtos-casual.js';

// ========================================================================
// Criar produtos
// ========================================================================

const produtos_section = document.querySelector('#produtos');
const cesto_section = document.querySelector('#cesto');
const quantProdutos_p = document.querySelector('#quantProdutos');
const escolherProdutos = document.querySelector('#escolherProdutos');
let quantProduto = 0;

mostrarProdutosInformatica();
mostrarProdutosCasuais();

escolherProdutos.addEventListener('change', function() {
    quantProduto = 0;

    switch(escolherProdutos.value) {
        case 'todos':
            produtos_section.innerHTML ='';
            mostrarProdutosInformatica();
            mostrarProdutosCasuais();
            break;
        case 'informatica':
            produtos_section.innerHTML ='';
            mostrarProdutosInformatica();
            break;
        case 'casuais':
            produtos_section.innerHTML ='';
            mostrarProdutosCasuais();
            break;
    }
});

function mostrarProdutosInformatica() {
    produtos_informatica.forEach(function(produto) {
        produtos_section.append(criarElementosHMTML('produtos', produto.title, produto.image, produto.category, produto.price, produto.description, produto.rating.rate, produto.rating.count));

        quantProdutos_p.textContent = ++quantProduto;
    });
}

function mostrarProdutosCasuais() {
    produtos_casual.forEach(function(produto) {
        produtos_section.append(criarElementosHMTML('produtos', produto.title, produto.image, produto.category, produto.price, produto.description, produto.rating.rate, produto.rating.count));

        quantProdutos_p.textContent = ++quantProduto;
    });
}

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
    let figure = document.createElement('figure');

    img.setAttribute('src', image);
    img.setAttribute('alt', category);
    figure.append(img);

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
    if (noPai == 'produtos') {
        p_3.textContent = '+';
        button.addEventListener('click', () => {
            adionarNoCesto(article);
        });
    }
    button.classList.add('adicionarCesto');
    button.append(span_2, p_3);

    article.classList.add('produto');
    article.append(figure, span_3, h3, p_2, p, button);

    return article;
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

if (!localStorage.getItem('produtosNoCarrinho')) {
    localStorage.setItem('produtosNoCarrinho', '[]');
}


function verificarEstadoCesto(produtosNoCarrinho) {
    let custoTotal = 0;
    cesto_section.innerHTML = '';

    produtosNoCarrinho.forEach((produto, index) => {
        const article = criarElementosHMTML(null, produto.title, produto.image, produto.category, produto.price, produto.description, produto.rate, produto.ratingCount);

        const p = article.querySelector('.adicionarCesto p');
        const button = article.querySelector('.adicionarCesto');

        p.textContent = '-';
        button.onclick = () => removerNoCesto(index);
       
        custoTotal += parseFloat(produto.price);

        cesto_section.append(article);
    });
   
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

    quantCesto_p.textContent = produtosNoCarrinho.length;
}

function adionarNoCesto(article) {
    const produto = {
        title: article.querySelector('h3').textContent,
        image: article.querySelector('img').src,
        category: article.querySelector('img').alt,
        price: article.querySelector('.preco').textContent.slice(0, -2),
        description: article.querySelector('.descricao').textContent,
        rate: article.querySelector('.avaliacao').textContent.slice(-3),
        ratingCount: article.querySelector('.contAvaliacao').textContent
    }

    let produtosNoCarrinho = JSON.parse(localStorage.getItem('produtosNoCarrinho')) || [];

    produtosNoCarrinho = [...produtosNoCarrinho, produto];

    localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtosNoCarrinho));

    verificarEstadoCesto(produtosNoCarrinho);
}

function removerNoCesto(index) {
    let produtosNoCarrinho = JSON.parse(localStorage.getItem('produtosNoCarrinho', '[]'));

    produtosNoCarrinho.splice(index, 1);

    localStorage.setItem('produtosNoCarrinho', JSON.stringify(produtosNoCarrinho));

    verificarEstadoCesto(produtosNoCarrinho);
}










// ========================================================================
// Inicialização da aplicação
// ========================================================================

if (!localStorage.getItem('produtosNoCarrinho')) 
    localStorage.setItem('produtosNoCarrinho','[]');

let produtosNoCarrinho = JSON.parse(localStorage.getItem('produtosNoCarrinho'));
verificarEstadoCesto(produtosNoCarrinho);