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
    const titleLabel = document.createElement("label");
    const input1 = document.createElement("div");
    titleLabel.innerText = 'Book Title*';
    title.type = 'text';
    title.placeholder = 'Enter book title'
    title.required = true;
    input1.appendChild(titleLabel);
    input1.appendChild(title);
    form.appendChild(input1);

    const author = document.createElement("input");
    const authorLabel = document.createElement("label");
    const input2 = document.createElement("div");
    authorLabel.innerText = 'Enter author name*';
    author.type = 'text';
    author.placeholder = 'Enter author name';
    author.required = true;
    input2.appendChild(authorLabel);
    input2.appendChild(author);
    form.appendChild(input2);

    const status = document.createElement("input");
    const statusLabel = document.createElement("label");
    const input3 = document.createElement("div");
    statusLabel.innerText = 'I have read this book:'
    status.type = 'checkbox';
    input3.appendChild(status);
    input3.appendChild(statusLabel);
    form.appendChild(input3);

    const image = document.createElement("input");
    const imageLabel = document.createElement("label");
    const input4 = document.createElement("div");
    imageLabel.innerText = 'Cover Image';
    image.type = 'url';
    image.placeholder = 'https://images/';
    input4.appendChild(imageLabel);
    input4.appendChild(image);
    form.appendChild(input4);

    input1.classList.add("inputRow");
    input2.classList.add("inputRow");
    input3.classList.add("inputRow");
    input4.classList.add("inputRow");
    titleLabel.classList.add("formLabel");
    authorLabel.classList.add("formLabel");
    statusLabel.classList.add("formLabel");
    imageLabel.classList.add("formLabel");
    title.classList.add("formInput");
    author.classList.add("formInput");
    image.classList.add("formInput");

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