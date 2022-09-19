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
const submitCancel = document.querySelector(`#submit-cancel`);
const pageMask = document.querySelector(`#page-mask`);

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
    formContainer.reset();
    submitBookButton.disabled = true;
    formContainer.style.display = `grid`;
    pageMask.style.display = `block`;
}

//deletes all cards and recreates with library array as currently
//constituted
function cardMaker() {
    //preemptively delete all book cards so they can be recreated
    document.querySelectorAll(".book-card").forEach(bookCard => 
            bookCard.remove());
    let bookHtml = ``;
    
    myLibrary.forEach((book, index) => {

        let checkedStatus = ``;
        if (book.readStatus == true) checkedStatus = `checked`;

        bookHtml +=
       `<div class="book-card card" id="book-${index}">
            <label for="book-title-${index}">Title:
                <h3 id="book-title-${index}">${book.title}</h3>
            </label>
            <label for="book-author-${index}">Author:
                <h4 id="book-author-${index}">${book.author}</h3>
            </label>
            <label class="horiz page-count" for="book-page-count-${index}">
                    Page Count:
                <h4 id="book-page-count-${index}">${book.pages}</h3>
            </label>
            <label class="horiz" for="submitted-read-status-${index}">READ IT?
            <input class="checkbox-input book-read-status" type="checkbox" 
                id="submitted-read-status-${index}" ${checkedStatus}>
            </label>
            <button class="book-delete light x-button" 
                id="book-delete-${index}">+</button>
        </div>`

    });
    bookContainer.innerHTML = bookHtml;

    formContainer.style.display = `none`;
    pageMask.style.display = `none`;

    //add event listeners to all new delete and READ buttons/checkboxes
    let bookDeleteButtons = document.querySelectorAll(`.book-delete`);
    bookDeleteButtons.forEach(bookDeleteButton => {
        bookDeleteButton.addEventListener(`click`, (event) => 
                deleteBook(event));
    });

    let readStatusBoxes = document.querySelectorAll(`.book-read-status`);
    readStatusBoxes.forEach(readStatusBox => {
        readStatusBox.addEventListener(`click`, (event) => 
                changeReadStatus(event));
    });
}

//add new information to book item in array
function addBookToList() {
    myLibrary.push(new bookMaker(
        submittedTitle.value,
        submittedAuthor.value,
        submittedPages.value,
        submittedReadStatus.checked
    ));
    cardMaker();
}


//check if fields have values before enabling submit button
function enableSubmitButton() {
    submitBookButton.disabled = !(submittedTitle.value && 
            submittedAuthor.value && submittedPages.value);
}

function deleteBook (event) {
    let targetIndex = event.target.getAttribute(`id`).slice(12);
    myLibrary.splice(targetIndex,1);
    cardMaker();
} 

function changeReadStatus(event) {
    let targetIndex = event.target.getAttribute(`id`).slice(22);
    myLibrary[targetIndex].readStatus = !myLibrary[targetIndex].readStatus;
}

//EVENT LISTENERS - Nothing happens until things get clicked
addBookButton.addEventListener('click', showBookForm);
submitBookButton.addEventListener('click', addBookToList);
textInputs.forEach(textInput => {
    textInput.addEventListener(`input`, enableSubmitButton);
});

//Close new book form and hide when x is clicked
submitCancel.addEventListener(`click`, () => {
    formContainer.style.display = `none`;
    pageMask.style.display = `none`;
})

