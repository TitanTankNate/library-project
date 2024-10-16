// GLOBAL VARIABLES
const userLibrary = [];
let counter = 0;
let idToDelete = null;



// GLOBAL QUERY SELECTORS
const contentContainer = document.querySelector(".content-layout-container");

const dialogBox = document.getElementById("book-info-dialog");
const dialogForm = document.getElementById("dialog-form");
const titleInput = document.getElementById("title-text");
const authorInput = document.getElementById("author-text");
const pageCountInput = document.getElementById("pagecount-number");
const isReadInput = document.getElementById("is-read-checkbox");
const deleteDialogBox = document.getElementById("delete-confirmation-dialog");



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
const addBookButton = document.querySelector(".add-book-button");
addBookButton.addEventListener("click", () => {
    // addBookToLibrary();

    // Pop up modal dialog requesting information
    console.log("Creating modal dialog.");
    dialogBox.showModal();
});

const dialogConfirmButton = document.getElementById("dialog-confirm");
dialogConfirmButton.addEventListener("click", () => {
    addBookToLibrary();
});

const cancelButton = document.getElementById("dialog-cancel");
cancelButton.addEventListener("click", () => {
    dialogBox.close();
});

const deleteCancelButton = document.getElementById("dialog-delete-cancel");
deleteCancelButton.addEventListener("click", () => {
    deleteDialogBox.close();
});

const deleteConfirmButton = document.getElementById("dialog-delete-confirm");
deleteConfirmButton.addEventListener("click", () => {
    deleteBook(idToDelete);
});





// GLOBAL METHODS------GLOBAL METHODS------GLOBAL METHODS------GLOBALM

// FUNCTION: addBookToLibrary
// DESCRIPTION: This function constructs a new instance of the Book
// object, pushes that data to the library array, and forces a visual
// refresh of the webpage, afterwards resetting the modal form.
function addBookToLibrary() {
    // Constructor
    let newBook = new Book(counter, titleInput.value, 
        authorInput.value, 
        pageCountInput.value, 
        isReadInput.checked, 
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
        newCardDiv.id = `card${index}`;

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
        newCardIsRead.id = `is-read-${index}`;

        // // Create card buttons div
        let newCardButtonsDiv = document.createElement("div");
        newCardButtonsDiv.classList.add("content-card-buttons-container");

        // // Create delete button
        let newCardDeleteButton = document.createElement("button");
        newCardDeleteButton.classList.add("card-delete-button");
        newCardDeleteButton.dataset.id = counter;
        newCardDeleteButton.textContent = "Delete This Book";

        // // // Add delete button event listening
        newCardDeleteButton.addEventListener("click", () => {
            confirmDeletion(newCardDeleteButton.dataset.id);
        });

        // // Create "mark as read" button
        let newCardIsReadButton = document.createElement("button");
        newCardIsReadButton.classList.add("card-is-read-button");
        newCardIsReadButton.textContent = "Mark As Read";

        // // // Add "mark as read" button event listening
        newCardIsReadButton.addEventListener("click", () => {
            markBookAsRead(index);
        });

        // Append new elements
        contentContainer.appendChild(newCardDiv);
        newCardDiv.appendChild(newCardTitle);
        newCardDiv.appendChild(newCardAuthor);
        newCardDiv.appendChild(newCardPages);
        newCardDiv.appendChild(newCardIsRead);
        newCardDiv.appendChild(newCardButtonsDiv);
        newCardButtonsDiv.appendChild(newCardDeleteButton);
        newCardButtonsDiv.appendChild(newCardIsReadButton);

        // Set flag to avoid card duplication
        userLibrary[index].isDisplayed = true;    
    }
};



// FUNCTION: confirmDeletion
// DESCRIPTION: This function pops up a custom modal dialog 
// confirmation box.
function confirmDeletion(id) {
    // Set item for deletion
    idToDelete = id;

    // Customize book title in confirmation dialog
    const deleteDialogBookTitle = document.getElementById("book-to-be-deleted");
    deleteDialogBookTitle.textContent = userLibrary[id].title;

    // Confirm deletion with user
    deleteDialogBox.showModal();
};



// FUNCTION: deleteBook
// DESCRIPTION: This function accepts an ID/index for a Book element in
// the userLibrary array, and deletes it as well as its visual 
// representation via the DOM.  DOM elements are deleted before array
// elements to avoid displaying null or blank data.
function deleteBook(id) {
    // Delete content card before deleting content it references
    let divToDelete = document.getElementById(`card${id}`);
    divToDelete.replaceChildren();  // Delete children of the element
    divToDelete.remove();           // Delete parent element

    deleteDialogBox.close();

    console.log(userLibrary);
    userLibrary.splice(id,1, null);
    console.log(userLibrary);
};



// FUNCTION: markBookAsRead
// DESCRIPTION: This function toggles a partcular Book object's isRead
// status between true ("Complete")/false ("Incomplete") states, and 
// updates both the DOM and the userLibrary array.
function markBookAsRead(id) {
    // Select div to "repaint"
    let readStatusToModify = document.getElementById(`is-read-${id}`);
    
    // Change array information and "repaint" div with updated status
    if (userLibrary[id].isRead) {
        userLibrary[id].isRead = false;
        readStatusToModify.textContent = "Incomplete";
    } else {
        userLibrary[id].isRead = true;
        readStatusToModify.textContent = "Complete";
    };
}


// W R I T E   U P

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