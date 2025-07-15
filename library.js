const myLibrary = [];

function Book(title,author,pages,completed) {
    if(!new.target) {
        throw Error("Use the 'new' operator!");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.completed = this.completed;    
}

Book.prototype.completed = function(completed) {
    this.completed = completed;
};
    
function addBookToLibrary(title,author,pages,completed) {
    myLibrary.push(new Book(title,author, pages, completed));
}

addBookToLibrary("Piranesi","Susanna Clarke", 272, false);
addBookToLibrary("Gardens of the moon","Steven Erikson", 712, false);
addBookToLibrary("Deadhouse gates","Steven Erikson", 943, false);

// Get table
const tableContent = document.getElementById("book-table-content");
// console.log(tableContent);

myLibrary.forEach( function(book) {
    // New row
    console.log(book);

    const newRow = document.createElement("tr");

    //Book Title
    const bookTitle = document.createElement("td");
    bookTitle.textContent = book.title;
    newRow.appendChild(bookTitle);

    //Book author
    const bookAuthor = document.createElement("td");
    bookAuthor.textContent = book.author;
    newRow.appendChild(bookAuthor);

    //Book pages
    const bookPages = document.createElement("td");
    bookPages.textContent = book.pages;
    newRow.appendChild(bookPages);

    // //Book completed?
    const bookCompletedTd = document.createElement("td");
    const bookCompleted = document.createElement("input")
    bookCompleted.type = "checkbox";
    // bookCompleted.value = book.completed;
    bookCompletedTd.appendChild(bookCompleted);
    newRow.appendChild(bookCompletedTd);
    

    //Add Row
    tableContent.appendChild(newRow);
});