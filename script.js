const bookInput = document.getElementById('book');
const addBook = document.getElementById('add-book');
const divBooks = document.getElementById('list-books');
const card = document.querySelectorAll('.card');


addBook.addEventListener("click", () => {
    let book = bookInput.value;

    // criar o card
    const newCard = document.createElement('div');
    newCard.className = 'card';

    // criar h2
    const titleBook = document.createElement('h2');
    titleBook.className = 'title-book';
    titleBook.textContent = book;

    // coloca o h2 dentro do card
    newCard.appendChild(titleBook);

    // coloca o card dentro da div
    divBooks.appendChild(newCard);
});