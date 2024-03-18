//The exercise simulates a library management system, allowing you to add books, search for books by author, 
//and display the list of books in the library. Correct the name of the functions, remove comments, add indentation 
//as you think necessary.

//Your GitHub repository must be public - this will allow us to look at it and verify the accuracy of your code. 
//Once you complete this project, you will need to send over the link of the project to me (axel.chavez@fulltimeforce.com).

class Book {
    constructor(title, author, numPages) {
        // Initialize the properties of the book.
        this.title = title;
        this.author = author;
        this.numPages = numPages;
    }

    // Method to get the book information in string format.
    getInfo() {
        return "Title: " + this.title + ", Author: " + this.author + ", Pages: " + this.numPages;
    }
}


class Library {
    constructor() {
        // Initialize the list of books.
        this.booksList = [];
    }

    addBook(book) {
        this.booksList.push(book);
    }

    getBooksByAuthor(author) {
        var booksByAuthor = [];
        
        for (var i = 0; i < this.booksList.length; i++) {
            // Check if the author of the book matches the searched author.
            if (this.booksList[i].author === author) {
                booksByAuthor.push(this.booksList[i]);
            }
        }
        
        return booksByAuthor;
    }

    displayBooks() {
        console.log("List of books in the library:");
        for (var i = 0; i < this.booksList.length; i++) {
            console.log(this.booksList[i].getInfo());
        }
    }
}

// Main function to test the library management system.
function mainLibrary() {
    var mainLibrary = new Library();

    mainLibrary.addBook(new Book("One Hundred Years of Solitude", "Gabriel García Márquez", 432));
    mainLibrary.addBook(new Book("The Little Prince", "Antoine de Saint-Exupéry", 96));
    mainLibrary.addBook(new Book("1984", "George Orwell", 328));
    mainLibrary.addBook(new Book("Don Quixote", "Miguel de Cervantes", 863));

    mainLibrary.displayBooks();

    // Search for books by author.
    var author = "Gabriel García Márquez";
    var booksByAuthorFound = mainLibrary.getBooksByAuthor(author);
    console.log("Books written by " + author + ":");
    
    for (var i = 0; i < booksByAuthorFound.length; i++) {
        console.log(booksByAuthorFound[i].getInfo());
    }
}

// Call the main function to start the program.
mainLibrary();