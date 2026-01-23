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

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
        .then(res => res.json())
        .then(dados => {
            const bookAPI = dados.items?.[0]?.volumeInfo;

            dadosBook.autor = bookAPI?.authors?.[0] || "Autor desconhecido";

            dadosBook.capa = bookAPI?.imageLinks?.thumbnail || null;

            storedBooks.push(dadosBook);
            localStorage.setItem("dados", JSON.stringify(storedBooks));

            renderizar();
            console.log(storedBooks);
        })
        .catch(() => {
            alert("Livro não encontrado")
        });
});

function criarCards(book, indice) {
    // criar o card
    const newCard = document.createElement('div');
    newCard.className = 'card';

    // capa
    const capa = document.createElement('div');
    capa.className = 'capa';
    const capaBook = document.createElement('img');
    capaBook.className = 'img';

    if (book.capa) {
        capaBook.src = book.capa;
        capaBook.alt = `Capa do livro ${book.title}`;
    } else {
        capaBook.alt = "Capa indisponível";
    };

    // informações do livro
    const infoBook = document.createElement('div');
    infoBook.className = 'info-book';

    // criar h2
    const titleBook = document.createElement('h2');
    titleBook.className = 'title-book';
    titleBook.textContent = book.title;

    // autor
    const autorBook = document.createElement('p');
    autorBook.className = 'autor-book';
    autorBook.textContent = book.autor;
    
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
    newCard.appendChild(capa);
    capa.appendChild(capaBook);

    newCard.appendChild(infoBook);
    infoBook.appendChild(titleBook);
    infoBook.appendChild(autorBook);
    infoBook.appendChild(concluirBtn);
    infoBook.appendChild(removeBtn);

    // coloca o card dentro da div
    divBooks.appendChild(newCard);
};

function renderizar() {
    divBooks.innerHTML = "";

    storedBooks.forEach((book, indice) => {
        criarCards(book, indice);
    });
};