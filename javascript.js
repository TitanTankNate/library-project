// GLOBAL VARIABLES
const userLibrary = [];
let counter = 0;



// GLOBAL QUERY SELECTORS
const contentContainer = document.querySelector(".content-layout-container");

const dialogBox = document.getElementById("book-info-dialog");
const dialogForm = document.getElementById("dialog-form");
const titleInput = document.getElementById("title-text");
const authorInput = document.getElementById("author-text");
const pageCountInput = document.getElementById("pagecount-number");
const isReadInput = document.getElementById("is-read-checkbox");

// CONSTRUCTORS
function Book(id, title, author, pageCount, isRead, isDisplayed) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
    this.isDisplayed = isDisplayed;
};



// PROTOTYPE METHODS
Book.prototype.deleteBookFromLibrary = function() {
    // DELETE BOOK BEHAVIOR
    // // User clicks "Delete Book"
    // // Confirm with popup dialog
    // // Upon confirmation, delete book
};



// EVENT HANDLERS
let addBookButton = document.querySelector(".add-book-button");
addBookButton.addEventListener("click", () => {
    // addBookToLibrary();

    // Pop up modal dialog requesting information
    console.log("Creating modal dialog.");
    dialogBox.showModal();
});

let deleteBookButton = document.querySelector(".card-delete-button");
deleteBookButton.addEventListener("click", () => {
    alert("Deleted book.");
});

let dialogConfirmButton = document.getElementById("dialog-confirm");
dialogConfirmButton.addEventListener("click", () => {
    addBookToLibrary();
});

const cancelButton = document.getElementById("dialog-cancel");
cancelButton.addEventListener("click", () => {
    dialogBox.close();
});





// GLOBAL METHODS------GLOBAL METHODS------GLOBAL METHODS------GLOBALM

// FUNCTION: addBookToLibrary
// DESCRIPTION: This function constructs a new instance of the Book
// object, pushes that data to the library array, and forces a visual
// refresh of the webpage, while resetting the modal form.
function addBookToLibrary() {
    // Constructor
    let newBook = new Book(counter, titleInput.value, 
        authorInput.value, 
        pageCountInput.value, 
        isReadInput.value, 
        false);  
    
    // Push changes to the array
    userLibrary.push(newBook);
    console.log(userLibrary);

    // Force visual refresh
    updateBookCards(counter);
    counter++;

    // Reset modal dialog
    dialogForm.reset();
};



// FUNCTION: updateBookCards
// DESCRIPTION:  This function adds a new dynamic DOM series of 
// elements whenever a new instance of Book object is created.
function updateBookCards(index) {
    console.log("updateBookCards()");
    // Only execute creation of "new books"
    if (!userLibrary[index].isDisplayed) {
        // console.log(`${refBook.title} by ${refBook.author}, ${refBook.pageCount} pages, isRead: ${refBook.isRead}`);  

        // Create card div
        let newCardDiv = document.createElement("div");
        newCardDiv.classList.add("content-card");

        // // Create title h3
        let newCardTitle = document.createElement("h3");
        newCardTitle.classList.add("card-title");
        newCardTitle.textContent = userLibrary[index].title;

        // // Create author h4
        let newCardAuthor = document.createElement("h4");
        newCardAuthor.classList.add("card-author");
        newCardAuthor.textContent = userLibrary[index].author;

        // // Create pages p 
        let newCardPages = document.createElement("p");
        newCardPages.classList.add("card-pagecount");
        newCardPages.textContent = `${userLibrary[index].pageCount} pages`;

        // // Create "Is read" status p
        let newCardIsRead = document.createElement("p");
        newCardIsRead.classList.add("card-is-book-read");
        if (userLibrary[index].isRead) {
            newCardIsRead.textContent = "Completed";
        } else {
            newCardIsRead.textContent = "Incomplete";
        }

        // // Create delete button
        let newCardDeleteButton = document.createElement("button");
        newCardDeleteButton.classList.add("card-delete-button");
        newCardDeleteButton.textContent = "Delete This Book";

        // Append new elements
        contentContainer.appendChild(newCardDiv);
        newCardDiv.appendChild(newCardTitle);
        newCardDiv.appendChild(newCardAuthor);
        newCardDiv.appendChild(newCardPages);
        newCardDiv.appendChild(newCardIsRead);
        newCardDiv.appendChild(newCardDeleteButton);

        // Set flag to avoid card duplication
        userLibrary[index].isDisplayed = true;    
    }
};

// DESIRED BEHAVIOR
// When user loads into page, a "default" template book should be 
// displayed.  There will then be a "Add First Book" button that allows
// the user to create their first book.

// BOOK CARDS
// Each book card should have the title, in header format, author, in 
// sub-header format, number of pages, and a checkbox for whether or 
// not the book has been read.  There should also be a delete button 
// to allow the user to delete thebook.

// DISPLAYING BOOK CARDS
// The books should all display in card format with the elements listed
// above.