const books = document.querySelector(".books");

const library = [];

function Book(cover, title, author, status) {
    this.id = crypto.randomUUID();
    this.cover = cover;
    this.title = title;
    this.author = author;
    this.status = status;
}

function addBook(Book, cover, title, author, status) {
    const newBook = new Book(cover, title, author, status);
    library.push(newBook);
}

function displayBooks(library){
    for (const book of library){
        const newBook = document.createElement("div");
        newBook.classList.add("book"); 
        const cover = document.createElement("img");
        cover.src = book.cover;
        cover.classList.add("cover");
        newBook.appendChild(cover);
        const info = document.createElement("div");
        const row1 = document.createElement("div");
        const title = document.createElement("h3");
        const author = document.createElement("p");
        row1.classList.add("row1");
        title.innerText = book.title;
        author.innerText = book.author;
        title.classList.add("title");
        author.classList.add("author");
        info.classList.add("info");
        row1.appendChild(title);
        row1.appendChild(author);
        info.appendChild(row1);
        const row2 = document.createElement("div");
        row2.classList.add("row2");
        const status = document.createElement("button");
        const trash = document.createElement("i");
        trash.classList.add("mdi", "mdi-trash-can-outline", "delete");
        status.innerText = book.status;
        status.classList.add("status");
        row2.appendChild(status);
        row2.appendChild(trash);
        info.appendChild(row2);
        newBook.appendChild(info);
        books.appendChild(newBook);
    }
}

function newBook(){
    const dialog = document.createElement("dialog");
    const form = document.createElement("form");
    const formHeader = document.createElement("h1");
    formHeader.innerText = 'Enter book info';
    formHeader.classList.add('formHeader');
    form.appendChild(formHeader);
    form.method = "dialog";
    form.classList.add("formContainer");
    const title = document.createElement("input");
    title.type = 'text';
    title.placeholder = 'Enter book title'
    title.innerText = 'Book Title*'
    title.required = true;
    form.appendChild(title);
    const author = document.createElement("input");
    author.type = 'text';
    author.placeholder = 'Enter author name';
    author.innerText = 'Author';
    author.required = true;
    form.appendChild(author);
    const status = document.createElement("input");
    status.type = 'checkbox';
    status.innerText = 'I have read this book:';
    form.appendChild(status);
    const image = document.createElement("input");
    image.type = 'url';
    image.innerText = 'Cover Image';
    image.placeholder = 'https://images/'
    title.classList.add("formInput");
    author.classList.add("formInput");
    image.classList.add("formInput");
    form.appendChild(image);
    const formFooter = document.createElement("div");
    formFooter.classList.add('formFooter');
    form.appendChild(formFooter);
    const closeBtn = document.createElement("button");
    closeBtn.innerText = 'Close';
    closeBtn.classList.add("closeBtn");
    closeBtn.addEventListener("click", () => {
        dialog.close();
    })
    formFooter.appendChild(closeBtn);
    const submitBtn = document.createElement("button");
    submitBtn.innerText = "Add to library";
    submitBtn.type = 'submit';
    submitBtn.classList.add("submitBtn");
    formFooter.appendChild(submitBtn);
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        addBook(Book, cover.value, title.value, author.value, status.value);
        displayBooks(library);
    })
    dialog.appendChild(form);
    document.body.appendChild(dialog);
    dialog.showModal();
}

addBook(Book, "./images/mockingbird.jpg", "To Kill a MockingBird", "Harper Lee", "Finished");

addBook(Book, "./images/gatsby.jpg", "The Great Gatsby", "F. Scott Fitzgerald", "Finished");

addBook(Book, "./images/fahrenheit.jpg", "Fahrenheit", "Ray Bradbury", "Finished");

displayBooks(library);

const addBtn = document.querySelector(".addBook");
addBtn.addEventListener("click", () => {
    newBook();
})

trash.addEventListener("click", () => {

})