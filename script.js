const bookInput = document.getElementById('book');
const addBook = document.getElementById('add-book');
const divBooks = document.getElementById('list-books');

let storedBooks = [];

addBook.addEventListener("click", () => {
    let book = bookInput.value;
    bookInput.value = "";

    const dadosBook = {
        title: book, 
        read: false
    };
    storedBooks.push(dadosBook);

    criarCards();
    console.log(storedBooks);
});

function criarCards() {
    divBooks.innerHTML = "";

    storedBooks.forEach((book, indice) => {
        // criar o card
        const newCard = document.createElement('div');
        newCard.className = 'card';

        // criar h2
        const titleBook = document.createElement('h2');
        titleBook.className = 'title-book';
        titleBook.textContent = book.title;

        // botoes
        const concluirBtn = document.createElement('button');
        concluirBtn.className = 'button-card finish';
        concluirBtn.textContent = 'Concluir Leitura';

        concluirBtn.addEventListener("click", () => {
            storedBooks[indice].read = true;
            criarCards();
            
        });

        const removeBtn = document.createElement('button');
        removeBtn.className = 'button-card remove';
        removeBtn.textContent = 'Remover';

        removeBtn.addEventListener("click", () => {
            storedBooks.splice(indice, 1);
            criarCards();
        });

        if (book.read) {
            newCard.style.background = '#d5f2d9a8';

            concluirBtn.style.display = 'none';
            removeBtn.style.display = 'none';
        };

        // coloca o h2 e botoes dentro do card
        newCard.appendChild(titleBook);
        newCard.appendChild(concluirBtn);
        newCard.appendChild(removeBtn);

        // coloca o card dentro da div
        divBooks.appendChild(newCard);
    });
};