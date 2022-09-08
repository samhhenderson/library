//SETUP
//query selector variables
const bookContainer = document.querySelector(`.book-container`);
const addBookButton = document.querySelector(`#add-book`);
const formContainer = document.querySelector(`.form-container`);
const submitBookButton = document.querySelector(`#submit-book`);
const submittedTitle = document.querySelector(`#submitted-title`);
const submittedAuthor = document.querySelector(`#submitted-author`);
const submittedPages = document.querySelector(`#submitted-pages`);
const submittedReadStatus = document.querySelector(`#submitted-read-status`);

const textInputs = document.querySelectorAll(`input`);

let myLibrary = [];

//start book submit button as disabled
submitBookButton.disabled = true;

//FUNCTIONS AND METHODS
function bookMaker(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

function showBookForm() {
    formContainer.style.display = `grid`;
}

function cardMaker() {
    //preemptively delete all book cards so they can be recreated
    document.querySelectorAll(".book-card").forEach(bookCard => 
            bookCard.remove());

    myLibrary.forEach((book, index) => {

        console.log(book);

        let bookCard = document.createElement(`div`);
        bookCard.setAttribute(`class`, `book-card`);
        bookCard.setAttribute(`id`, index);
        bookCard.style.backgroundColor = `white`;
        bookCard.style.border = `2px solid red`;
        bookCard.style.borderRadius = `10px`;
        bookCard.style.width = `200px`;
        bookCard.style.height = `200px`;
        bookCard.style.display = `grid`

        bookContainer.appendChild(bookCard);

        let bookTitle = document.createElement(`div`);
        bookTitle.innerHTML = book.title;
        bookCard.appendChild(bookTitle);

        let bookAuthor = document.createElement(`div`);
        bookAuthor.innerHTML = book.author;
        bookCard.appendChild(bookAuthor);

        let bookPages = document.createElement(`div`);
        bookPages.innerHTML = book.pages;
        bookCard.appendChild(bookPages);

        //DO NEXT: use template creation to add new books

    });
}

function addBookToList() {
    myLibrary.push(new bookMaker(
        submittedTitle.value,
        submittedAuthor.value,
        submittedPages.value,
        submittedReadStatus.value
    ));
    cardMaker();
}


//check if fields have values before enabling submit button
function enableSubmitButton() {
    submitBookButton.disabled = !(submittedTitle.value && 
            submittedAuthor.value && submittedPages.value && 
            submittedReadStatus.value);
}

//EVENT LISTENERS - Nothing happens until things get clicked
addBookButton.addEventListener('click', showBookForm);
submitBookButton.addEventListener('click', addBookToList);
textInputs.forEach(textInput => {
    textInput.addEventListener(`input`, enableSubmitButton);
});
