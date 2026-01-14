const bookInput = document.getElementById('book');
const addBook = document.getElementById('add-book');
const divBooks = document.getElementById('list-books');
const card = document.querySelectorAll('.card');
const titleBook = document.querySelectorAll('.tilte-book');
const autorBook = document.querySelectorAll('.autor-book');

addBook.addEventListener("click", () => {
    let book = bookInput.value;

    // criar o card
    const newCard = document.createElement('div');
    newCard.className = 'card';


    // newCard.classList.add('title-book', 'autor-book');
    
    // newCard.innerHTML= `<h2 .title-book>${book}<h2>`;
});