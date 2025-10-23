// * * * * * * * * * * * * * * * * * *
//              Índice
//
// Criar produtos
// Criar filtros
// Adicionar e remover no cesto
// Verificar no localStorage
//
// * * * * * * * * * * * * * * * * * *









// ========================================================================
// Criar produtos
// ========================================================================

const produtosAPI = await buscarProdutosAPI();
const produtos = document.querySelector('#produtos');
const quantProdutos = document.querySelector('#quantProdutos');



// Busca todos os produtos numa API
async function buscarProdutosAPI() {
    const carregamento = document.querySelector('#carregamento');

    try {
        carregamento.classList.remove('oculto');

        const resposta = await fetch('https://deisishop.pythonanywhere.com/products');
        const produtos = await resposta.json();

        return produtos;

    } catch (erro) {
        return [];

    } finally {
        carregamento.classList.add('oculto');
    }
}

// Ação botão para mostrar a descrição da peça de roupa
function mostrarDescricao(toggleStatus, button, p) {
    if (toggleStatus == 'block') {
        p.style.display = 'none';
        button.textContent = 'Ver mais';
    } else if (toggleStatus == 'none') {
        p.style.display = 'block';
        button.textContent = 'Ver menos';
    }   
}

// Criando e dando valores aos elementos HTML
function criarElementosHMTML(noPai, title, image, category, price, description, rate, ratingCount) {
    let article = document.createElement('article');
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    let h3_nome = document.createElement('h3');
    let span_preco = document.createElement('span');
    let span_iconeSacola = document.createElement('span');
    let span_avaliacao = document.createElement('span');
    let span_descricao = document.createElement('span');
    let span_textoQuantAvalicao = document.createElement('span');
    let span_quantAvaliacao = document.createElement('span');
    let p_descricao = document.createElement('p');
    let p_2 = document.createElement('p');
    let p_adicionarCesto = document.createElement('p');
    let button_adicionarCesto = document.createElement('button');
    let button_verMais = document.createElement('button');


    img.setAttribute('src', image);
    img.setAttribute('alt', category);
    figure.append(img);

    span_avaliacao.innerHTML = '<span class="material-symbols-outlined">hotel_class</span>' + rate;
    span_avaliacao.classList.add('avaliacao');

    h3_nome.textContent = title;
    
    span_preco.textContent = price + ' €';
    span_preco.classList.add('preco');
    button_verMais.textContent = 'Ver mais';
    p_2.append(span_preco, button_verMais);

    span_descricao.textContent = description;
    span_quantAvaliacao.textContent = ratingCount;
    span_quantAvaliacao.classList.add('contAvaliacao')
    span_textoQuantAvalicao.append('Avaliado por ', span_quantAvaliacao, ' pessoas');
    p_descricao.append(span_descricao, span_textoQuantAvalicao);
    p_descricao.classList.add('descricao');
    button_verMais.addEventListener('click', () => {
        mostrarDescricao(window.getComputedStyle(p_descricao).display, button_verMais, p_descricao);
    });

    span_iconeSacola.textContent = 'shopping_bag';
    span_iconeSacola.classList.add('material-symbols-outlined');
    if (noPai == 'produtos') {
        p_adicionarCesto.textContent = '+';
        button_adicionarCesto.addEventListener('click', () => {
            adionarNoCesto(article);
        });
    }
    button_adicionarCesto.classList.add('adicionarCesto');
    button_adicionarCesto.append(span_iconeSacola, p_adicionarCesto);

    article.classList.add('produto');
    article.append(figure, span_avaliacao, h3_nome, p_2, p_descricao, button_adicionarCesto);

    return article;
}

function renderizarProdutos(listaProdutos) {
    produtos.innerHTML = '';

    listaProdutos.forEach((produto) => {
        let article = document.createElement('article');

        article = criarElementosHMTML(
            'produtos',
            produto.title, 
            produto.image, 
            produto.category, 
            produto.price, 
            produto.description, 
            produto.rating.rate, 
            produto.rating.count
        );

        produtos.append(article);
    });

    quantProdutos.textContent = produtos.children.length;
}



renderizarProdutos(produtosAPI);














// ========================================================================
// Criar filtros
// ========================================================================

const filtroArtigo = document.querySelector('#filtroArtigo');
const filtroOrdenacao = document.querySelector('#filtroOrdenacao');
const filtroBusca = document.querySelector('#filtroBusca');
let produtosFiltrados = [...produtosAPI];
const artigosAPI = await buscarArtigosAPI();


// Adicionar categorias o filtro das categorias dos artigos
async function adicionarOpcoesFiltroArtigo() {
    filtroArtigo.innerHTML = '';
    filtroArtigo.innerHTML = '<option value="todos">Todos os artigos</option>';
    filtroArtigo.innerHTML += artigosAPI.map(artigo => `<option value="${artigo}">${artigo}</option>`);
}

// Busca todas as categorias dos produtos numa API
async function buscarArtigosAPI() {
    try {
        const resposta = await fetch('https://deisishop.pythonanywhere.com/categories');
        const categorias = await resposta.json();

        return categorias;

    } catch (erro) {
        return [];
    }
}

function filtrarPorArtigo() {
    produtosFiltrados = [];

    if (filtroArtigo.value != 'todos') {
        for (let i = 0; i < produtosAPI.length; i++) {
            if (produtosAPI[i]['category'] == filtroArtigo.value) {
                produtosFiltrados = [...produtosFiltrados, produtosAPI[i]];
            }
        }
    } else {
        produtosFiltrados = [...produtosAPI];
    }

    filtrarPorPreco();
    filtrarPorNome();
}

// a.price - b.price < 0 → a vem antes de b (ordem crescente)
// a.price - b.price > 0 → a vem depois de b
function filtrarPorPreco() {
    switch (filtroOrdenacao.value) {
        case 'crescente':
            produtosFiltrados.sort((a, b) => a.price - b.price);
            break;
        case 'decrescente':
            produtosFiltrados.sort((a, b) => b.price - a.price);
            break;
    }

    filtrarPorNome();
}

function filtrarPorNome() {
    let busca = produtosFiltrados.filter(produto => produto.title.toLowerCase().includes(filtroBusca.value.toLowerCase().trim()));

    renderizarProdutos(busca);
}



adicionarOpcoesFiltroArtigo();



filtroArtigo.addEventListener('change', () => { filtrarPorArtigo(); });

filtroOrdenacao.addEventListener('change', () => { filtrarPorPreco() });

filtroBusca.addEventListener('keyup', () => { filtrarPorNome() });















// ========================================================================
// Adicionar e remover no cesto
// ========================================================================

const cestoHTML = document.querySelector('#cesto');
const h2_cesto = document.querySelector('#h2_cesto');
const custoTotalCesto = document.querySelector('#custoTotal');
const quantCesto = document.querySelector('#quantCesto');



function renderizarCesto(produtosNoCesto) {
    let somatorio = 0;
    cestoHTML.innerHTML = '';

    produtosNoCesto.forEach((produto, index) => {
        const article = criarElementosHMTML(
            null, 
            produto.title, 
            produto.image, 
            produto.category, 
            produto.price, 
            produto.description, 
            produto.rate, 
            produto.ratingCount
        );

        const p_removerCesto = article.querySelector('.adicionarCesto p');
        const button_removerCesto = article.querySelector('.adicionarCesto');

        p_removerCesto.textContent = '-';
        button_removerCesto.onclick = () => removerNoCesto(index);
       
        somatorio += parseFloat(produto.price);
        cestoHTML.append(article);
    });

    if (custoTotalCesto != 0) {
        custoTotalCesto.style.display = 'inline';
        custoTotalCesto.textContent = somatorio.toFixed(2) + ' €';
    } else {
        custoTotalCesto.style.display = 'none';
    }

    h2_cesto.style.display = (cestoHTML.children.length != 0) ? 'flex' : 'none';
    cestoHTML.style.display = (cestoHTML.children.length != 0) ? 'flex' : 'none';

    quantCesto.textContent = produtosNoCesto.length;
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

    let produtosNoCesto = JSON.parse(localStorage.getItem('produtosNoCesto')) || [];

    produtosNoCesto = [...produtosNoCesto, produto];

    localStorage.setItem('produtosNoCesto', JSON.stringify(produtosNoCesto));

    renderizarCesto(produtosNoCesto);
}

function removerNoCesto(index) {
    let produtosNoCesto = JSON.parse(localStorage.getItem('produtosNoCesto'));

    produtosNoCesto.splice(index, 1);

    localStorage.setItem('produtosNoCesto', JSON.stringify(produtosNoCesto));

    renderizarCesto(produtosNoCesto);
}












// ========================================================================
// Verificar no localStorage
// ========================================================================

if (!localStorage.getItem('produtosNoCesto')) {
    localStorage.setItem('produtosNoCesto','[]');
}

let produtosNoCesto = JSON.parse(localStorage.getItem('produtosNoCesto'));
renderizarCesto(produtosNoCesto);