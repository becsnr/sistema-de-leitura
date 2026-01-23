const bookInput = document.getElementById('book');
const addBook = document.getElementById('add-book');
const divBooks = document.getElementById('list-books');

let storedBooks = JSON.parse(localStorage.getItem("dados")) || [];
renderizar();

addBook.addEventListener("click", () => {
    let book = bookInput.value;
    bookInput.value = "";

    const dadosBook = {
        title: book, 
        autor: '',
        capa: '',
        read: false
    };

    fetch(`https://openlibrary.org/search.json?q=${book}`)
        .then(res => res.json())
        .then(dados => {
            const bookAPI = dados.docs?.[0];

            dadosBook.autor = bookAPI?.author_name?.[0] || "Autor desconhecido";

            dadosBook.capa = bookAPI?.cover_i ? `https://covers.openlibrary.org/b/id/${bookAPI.cover_i}-M.jpg` : null;

            storedBooks.push(dadosBook);
            localStorage.setItem("dados", JSON.stringify(storedBooks));

            renderizar();
            console.log(storedBooks);
        });
});

function criarCards(book, indice) {
    // criar o card
    const newCard = document.createElement('div');
    newCard.className = 'card';

    // criar h2
    const titleBook = document.createElement('h2');
    titleBook.className = 'title-book';
    titleBook.textContent = book.title;

    // autor
    const autorBook = document.createElement('p');
    autorBook.className = 'autor-book';
    autorBook.textContent = book.autor;

    // capa
    const capaBook = document.createElement('img');
    capaBook.className = 'capa';

    if (book.capa) {
        capaBook.src = book.capa;
        capaBook.alt = `Capa do livro ${book.title}`;
    } else {
        capaBook.alt = "Capa indisponível";
    }
    
    // botoes
    const concluirBtn = document.createElement('button');
    concluirBtn.className = 'button-card finish';
    concluirBtn.textContent = 'Concluir Leitura';

    concluirBtn.addEventListener("click", () => {
        storedBooks[indice].read = true;
        localStorage.setItem("dados", JSON.stringify(storedBooks));
        renderizar();
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'button-card remove';
    removeBtn.textContent = 'Remover';

    removeBtn.addEventListener("click", () => {
        storedBooks.splice(indice, 1);
        localStorage.setItem("dados", JSON.stringify(storedBooks));
        renderizar();
    });

    if (book.read) {
        newCard.style.background = '#d5f2d9a8';

        concluirBtn.style.display = 'none';
        removeBtn.style.display = 'none';
    };

    // coloca os novos elementos dentro do card
    newCard.appendChild(capaBook);
    newCard.appendChild(titleBook);
    newCard.appendChild(autorBook);
    newCard.appendChild(concluirBtn);
    newCard.appendChild(removeBtn);

    // coloca o card dentro da div
    divBooks.appendChild(newCard);
};

function renderizar() {
    divBooks.innerHTML = "";

    storedBooks.forEach((book, indice) => {
        criarCards(book, indice);
    });
};