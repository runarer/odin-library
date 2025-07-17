let myLibrary = [];

function Book(title,author,pages,completed) {
    if(!new.target) {
        throw Error("Use the 'new' operator!");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.completed = completed;    
}

Book.prototype.completed = function(completed) {
    this.completed = completed;
};
    
function addBookToLibrary(title,author,pages,completed) {
    myLibrary.push(new Book(title,author, pages, completed));
}

function removeBookFromLibrary(id) {
    const index = myLibrary.findIndex((book) => book.id == id);    
    myLibrary.splice(index,1);    
}

function removeBook(id) {    
    const bookTable = document.getElementById("book-table-content")
    const bookRow = document.getElementById(id);
    removeBookFromLibrary(id);
    bookTable.removeChild(bookRow);
}

function toggleBookComplete(id) {
    const index = myLibrary.findIndex((book) => book.id == id);
    myLibrary[index].completed = !myLibrary[index].completed;
}

function addBook() {    
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");
    const readInput = document.getElementById("read");

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;

    if(title !== "" && author !== "" && pages !== undefined && pages > 0) {        
        const newBook = new Book(title,author,pages,read);
        myLibrary.push(newBook);
        addBookToTable(newBook);

        // Reset
        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        readInput.checked = false;
    }
}

// Get table
const tableContent = document.getElementById("book-table-content");

function addBookToTable(book) {
    const newRow = document.createElement("tr");
    newRow.setAttribute("id",book.id);

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
    bookPages.setAttribute("class","book-pages");
    newRow.appendChild(bookPages);

    //Book completed?
    const bookCompletedTd= document.createElement("td");
    bookCompletedTd.setAttribute("class","book-completed");
    
    const bookCompleted = document.createElement("input");    
    bookCompleted.setAttribute("type","checkbox")
    bookCompleted.addEventListener("click",() => toggleBookComplete(book.id));
    bookCompleted.checked = book.completed
    
    bookCompletedTd.appendChild(bookCompleted);    
    newRow.appendChild(bookCompletedTd);

    //Delete button
    const deleteBook = document.createElement("button");
    deleteBook.textContent = "\u{274C}";
    deleteBook.addEventListener("click", () => removeBook(book.id));

    newRow.appendChild(deleteBook);
    
    //Add Row
    tableContent.appendChild(newRow);
}

//Add book
const addButton = document.getElementById("add");
addButton.addEventListener("click", () => addBook())

// TEST
addBookToLibrary("Piranesi","Susanna Clarke", 272, false);
addBookToLibrary("Gardens of the moon","Steven Erikson", 712, false);
addBookToLibrary("Deadhouse gates","Steven Erikson", 943, false);
addBookToLibrary("Crooked Kingdom","Leigh Bardugo",536,true)

myLibrary.map(addBookToTable);