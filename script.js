const myLibrary = [];
const book_adder = document.querySelector("#book-adder");
const grid = document.querySelector("#books");
const modal = document.querySelector("#modal");
const submit_button = document.querySelector("#submit-button");
const cancel_button = document.querySelector("#cancel-button");
const book_form = document.querySelector("#book-form");

book_adder.addEventListener("click", () => {
        modal.showModal();
    }
)

book_form.addEventListener("submit", (event) => {
    event.preventDefault();  // Prevent native form submission & validation blocking

    // Check if form is valid manually if you want:
    if (!book_form.checkValidity()) {
        book_form.reportValidity();
        return;
    }

    addBookToLibrary();
    book_form.reset();
    modal.close();
});

cancel_button.addEventListener("click", () => {
        modal.close();
        book_form.reset();
    }
)

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

const book1 = new Book("The Lightning Thief", "Rick Riordan", 315);
const book2 = new Book("The Alchemyst", "Paulo Cohelo", 24);
myLibrary.push(book1);
myLibrary.push(book2);

function generateRandomId(prefix = "id") {
  return prefix + "_" + Math.random().toString(36).substr(2, 9);
}

function addBookToLibrary() {

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    let book = new Book(title, author, pages, read, generateRandomId("book"));
    myLibrary.push(book);
    printBooks();
    addBookCard(book);
}

function printBooks() {
    myLibrary.forEach( book => {
            console.log(book.title + " " + book.author + " " + book.pages + " " + book.read + " " + book.id);
        }
    )
}

function addBookCard(book) {
    const div = document.createElement("div");
    div.className = "card";

    const title = document.createElement("h1");
    title.textContent = book.title;
    
    const author = document.createElement("h2");
    author.textContent = "Author: " + book.author;

    const pages = document.createElement("h2");
    pages.textContent = "Pages: " + book.pages;

    const read_button = document.createElement("button");

    if(book.read == "yes") {
        read_button.textContent = "Read";
        read_button.style.backgroundColor = "green";
    } else {
        read_button.textContent = "Not Read";
        read_button.style.backgroundColor = "red";
    }

    const remove_button = document.createElement("button");

    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(read_button);
    div.appendChild(remove_button);

    grid.appendChild(div);
}