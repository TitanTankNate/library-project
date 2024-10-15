// GLOBAL VARIABLES
const userLibrary = [];
let counter = 1;



// GLOBAL QUERY SELECTORS
let contentContainer = document.querySelector(".content-layout-container");



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
    addBookToLibrary();
});

let deleteBookButton = document.querySelector(".card-delete-button");
deleteBookButton.addEventListener("click", () => {
    alert("Deleted book.");
});



// GLOBAL METHODS------GLOBAL METHODS------GLOBAL METHODS------GLOBALM

// FUNCTION: addBookToLibrary
// DESCRIPTION: This function pops up a modal dialog requesting book 
// information from the user.  Once submitted, that data is used to 
// instantiate a new "Book" instance, and visually update the page.
function addBookToLibrary() {
    // Pop up modal dialog requesting information
    createModalDialog();

    let newBook = new Book(counter, `sample${counter}`, `sample${counter}`, 123, false, false);

    userLibrary.push(newBook);
    console.log(userLibrary);

    updateBookCards();
    counter++;
};

// FUNCTION:
// DESCRIPTION: 
function createModalDialog() {
    console.log("Creating modal dialog.");
};

// FUNCTION: updateBookCards
// DESCRIPTION:  This function iterates across the userLibrary array 
// and dynamically creates DOM content cards for each "entry".
function updateBookCards() {
    userLibrary.forEach(refBook => {
        // Only execute creation of "new books"
        if (!refBook.isDisplayed) {
            // console.log(`${refBook.title} by ${refBook.author}, ${refBook.pageCount} pages, isRead: ${refBook.isRead}`);  
    
            // Create card div
            let newCardDiv = document.createElement("div");
            newCardDiv.classList.add("content-card");
    
            // // Create title h3
            let newCardTitle = document.createElement("h3");
            newCardTitle.classList.add("card-title");
            newCardTitle.textContent = refBook.title;
    
            // // Create author h4
            let newCardAuthor = document.createElement("h4");
            newCardAuthor.classList.add("card-author");
            newCardAuthor.textContent = refBook.author;
    
            // // Create pages p 
            let newCardPages = document.createElement("p");
            newCardPages.classList.add("card-pagecount");
            newCardPages.textContent = `${refBook.pageCount} pages`;
    
            // // Create "Is read" status p
            let newCardIsRead = document.createElement("p");
            newCardIsRead.classList.add("card-is-book-read");
            if (refBook.isRead) {
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
            refBook.isDisplayed = true;    
        }
    });
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