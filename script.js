const bookInput = document.getElementById('book');
const addBook = document.getElementById('add-book');
const divBooks = document.getElementById('list-books');
const card = document.querySelectorAll('.card');

let storedBooks = [];

addBook.addEventListener("click", () => {
    let book = bookInput.value;

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

    storedBooks.forEach(book => {
        // criar o card
        const newCard = document.createElement('div');
        newCard.className = 'card';

        // criar h2
        const titleBook = document.createElement('h2');
        titleBook.className = 'title-book';
        titleBook.textContent = book.title;

        // coloca o h2 dentro do card
        newCard.appendChild(titleBook);

        // coloca o card dentro da div
        divBooks.appendChild(newCard);
    });
};