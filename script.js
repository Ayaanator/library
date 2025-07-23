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

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    let book = new Book(title, author, pages, read, generateRandomId("book"));

    addBookToLibrary(book);
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

function generateRandomId(prefix = "id") {
  return prefix + "_" + Math.random().toString(36).substr(2, 9);
}

function addBookToLibrary(book) {
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
        read_button.style.backgroundColor = "lightgreen";
    } else {
        read_button.textContent = "Not Read";
        read_button.style.backgroundColor = "#f28b82";
    }

    const remove_button = document.createElement("button");
    remove_button.textContent = "Remove";

    read_button.addEventListener("click", () => {
        if(read_button.textContent == "Read") {
            read_button.textContent = "Not Read";
            read_button.style.backgroundColor = "#f28b82";
        } else {
            read_button.textContent = "Read";
            read_button.style.backgroundColor = "lightgreen";
        }
    })

    remove_button.addEventListener("click", () => {
        grid.removeChild(div);

        const index = myLibrary.findIndex(b => b.id === book.id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        }
    })

    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(read_button);
    div.appendChild(remove_button);

    grid.appendChild(div);
}

const book1 = new Book("The Lightning Thief", "Rick Riordan", 315, "no");
const book2 = new Book("The Alchemyst", "Paulo Cohelo", 394, "yes");
const book3 = new Book("Kensuke's Kingdom", "Michael Morpurgo", 176, "no");
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);