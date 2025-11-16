const books = document.querySelector(".books");

const library = [];

function Book(cover, title, author, pages, year, description, status) {
    this.id = crypto.randomUUID();
    this.cover = cover;
    this.title = title;
    this.author = 'By ' + author;
    this.pages = pages + " pages";
    this.year = "Published in " + year;
    this.description = description;
    if(status === true){
        this.status = 'Finished';
    }
    else{
        this.status = 'Reading';
    }
}

function addBook(cover, title, author, pages, year, description, status) {
    const newBook = new Book(cover, title, author, pages, year, description, status);
    library.push(newBook);
}

Book.prototype.toggle = function() {
    if(this.status === 'Finished'){
        this.status = 'Reading';
    }
    else{
        this.status = 'Finished';
    }
    return this.status;
}

function showInfo(target){
    const dialog = document.createElement("dialog");
    dialog.classList.add("infoDialog");
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("infoContainer");
    const closeBtn = document.createElement("i");
    closeBtn.classList.add("mdi", "mdi-close-box-outline", "infoClose");
    infoContainer.appendChild(closeBtn);
    closeBtn.addEventListener("click", () => {
        dialog.close();
    })

    const header = document.createElement("div");
    header.classList.add("infoHeader");
    const title = document.createElement("h1");
    title.innerText = target.title;
    header.appendChild(title);
    const author = document.createElement("p");
    const year = document.createElement("p");
    const row2 = document.createElement("div");
    row2.classList.add("row2Header");
    author.innerText = target.author;
    year.innerText = target.year;
    row2.appendChild(author);
    row2.appendChild(year);
    header.appendChild(row2);
    infoContainer.appendChild(header);

    const descriptContainer = document.createElement("div");
    descriptContainer.classList.add("descriptContainer");
    const descriptTitle = document.createElement("h2");
    descriptTitle.innerText = "Description";
    descriptContainer.appendChild(descriptTitle);
    const descriptInfo = document.createElement("p");
    descriptInfo.innerText = target.description;
    descriptContainer.appendChild(descriptInfo);
    infoContainer.appendChild(descriptContainer);

    const footer = document.createElement("div");
    footer.classList.add("footerInfo");
    const pageCount = document.createElement("p");
    pageCount.innerText = target.pages;
    footer.appendChild(pageCount);
    infoContainer.appendChild(footer);
    dialog.appendChild(infoContainer);
    document.body.appendChild(dialog);
    dialog.showModal();

}

function displayBooks(library){
    for (const book of library){
        const newBook = document.createElement("div");
        newBook.classList.add("book"); 
        const cover = document.createElement("img");
        cover.src = book.cover;
        cover.classList.add("cover");
        newBook.appendChild(cover);
        newBook.dataset.id = book.id;

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
        const statusIcon = document.createElement("i");
        statusIcon.classList.add("mdi", "mdi-checkbox-outline", "finishedBtn")
        const statusIcon2 = document.createElement("i");
        statusIcon2.classList.add("mdi", "mdi-progress-clock", "progressBtn")
        const status = document.createElement("button");
        const trash = document.createElement("i");
        trash.classList.add("mdi", "mdi-trash-can-outline", "delete");
        trash.addEventListener("click", (e) => {
            const card = e.target.closest(".book");
            library = library.filter(book => book.id !== card.dataset.id);
            books.innerHTML = "";
            displayBooks(library);
        })
        if(book.status === 'Finished' || book.status === true){
            status.innerText = book.status;
            status.classList.add("status");
            status.appendChild(statusIcon);
        }
        else {
            status.innerText = book.status;
            status.classList.add("status");
            status.appendChild(statusIcon2);
        }
        status.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = e.target.closest(".book");
            const statusBtn = card.querySelector(".status");
            const target = library.find(book => book.id === card.dataset.id);
            if(target.toggle() === 'Finished'){
                status.innerText = target.status;
                status.classList.add("status");
                status.appendChild(statusIcon);
            }
            else {
                status.innerText = target.status;
                status.classList.add("status");
                status.appendChild(statusIcon2);
            }
        })

        newBook.addEventListener("click", () => {
            const target = library.find(book => book.id === newBook.dataset.id)
            showInfo(target);
        })

        row2.appendChild(status);
        row2.appendChild(trash);
        info.appendChild(row2);
        newBook.appendChild(info);
        books.appendChild(newBook);
    }
}

function newBook(){
    const dialog = document.createElement("dialog");
    dialog.classList.add("newDialog")
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
    authorLabel.innerText = 'Author*';
    author.type = 'text';
    author.placeholder = 'Enter author name';
    author.required = true;
    input2.appendChild(authorLabel);
    input2.appendChild(author);
    form.appendChild(input2);

    const year = document.createElement("input");
    const yearLabel = document.createElement("label");
    const input3 = document.createElement("div");
    yearLabel.innerText = 'Year*';
    year.type = 'number';
    year.placeholder = 'Enter publication year';
    year.required = true;
    input3.appendChild(yearLabel);
    input3.appendChild(year);
    form.appendChild(input3);

    const page = document.createElement("input");
    const pageLabel = document.createElement("label");
    const input4 = document.createElement("div");
    pageLabel.innerText = 'Pages*';
    page.type = 'number';
    page.placeholder = 'Enter number of pages';
    year.required = true;
    input4.appendChild(pageLabel);
    input4.appendChild(page);
    form.appendChild(input4);

    const description = document.createElement("textarea");
    const descriptionLabel = document.createElement("label");
    const input5 = document.createElement("div");
    descriptionLabel.innerText = 'Description';
    description.placeholder = 'Enter book description';
    input5.appendChild(descriptionLabel);
    input5.appendChild(description);
    form.appendChild(input5);

    const status = document.createElement("input");
    const statusLabel = document.createElement("label");
    const input6 = document.createElement("div");
    statusLabel.innerText = 'I have read this book:'
    status.type = 'checkbox';
    input6.appendChild(statusLabel);
    input6.appendChild(status);
    form.appendChild(input6);

    const image = document.createElement("input");
    const imageLabel = document.createElement("label");
    const input7 = document.createElement("div");
    imageLabel.innerText = 'Cover Image';
    image.type = 'url';
    image.placeholder = 'https://images/';
    input7.appendChild(imageLabel);
    input7.appendChild(image);
    form.appendChild(input7);

    input1.classList.add("inputRow");
    input2.classList.add("inputRow");
    input3.classList.add("inputRow");
    input4.classList.add("inputRow");
    input5.classList.add("input5");
    input6.classList.add("input6");
    input7.classList.add("inputRow");
    titleLabel.classList.add("formLabel");
    authorLabel.classList.add("formLabel");
    statusLabel.classList.add("formLabel");
    imageLabel.classList.add("formLabel");
    pageLabel.classList.add("formLabel");
    yearLabel.classList.add("formLabel");
    descriptionLabel.classList.add("formLabel");
    title.classList.add("formInput");
    author.classList.add("formInput");
    image.classList.add("formInput");
    page.classList.add("formInput");
    description.classList.add("formInput");
    year.classList.add("formInput");

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
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addBook(image.value, title.value, author.value, status.value);
        books.innerHTML = "";
        displayBooks(library);
        dialog.close();
    })
    dialog.appendChild(form);
    document.body.appendChild(dialog);
    dialog.showModal();
}

addBook(
    "./images/mockingbird.jpg",
    "To Kill a MockingBird",
    "Harper Lee", 
    281,
    1960,
    "Harper Lee’s classic novel explores the themes of racial injustice, moral growth, and empathy in the deep American South during the 1930s. Told through the eyes of young Scout Finch, the story follows her father, Atticus Finch, as he defends an innocent Black man falsely accused of a crime. As Scout and her brother Jem learn harsh lessons about prejudice and integrity, the novel invites readers to reflect on compassion and the courage it takes to stand up for what is right.",
    true
);


addBook(
    "./images/gatsby.jpg", 
    "The Great Gatsby", 
    "F. Scott Fitzgerald", 
    180,
    1925,
    "Set in the dazzling Jazz Age of the 1920s, The Great Gatsby tells the story of mysterious millionaire Jay Gatsby and his obsessive love for Daisy Buchanan. Narrated by Nick Carraway, the novel delves into themes of wealth, class, desire, and the illusion of the American Dream. Beneath the glamorous parties and glittering lifestyles lies a powerful critique of excess, corruption, and the cost of chasing dreams that cannot be fulfilled.",
    true
);

addBook(
    "./images/fahrenheit.jpg", 
    "Fahrenheit", 
    "Ray Bradbury", 
    194,
    1953,
    "In a dystopian future where books are outlawed and critical thought is discouraged, firemen burn literature to suppress ideas and control society. Guy Montag, a dedicated fireman, begins to question his role as he encounters individuals who value knowledge and free expression. As Montag’s growing curiosity turns into rebellion, the novel explores censorship, technology’s influence on human behavior, and the importance of preserving intellectual freedom.",
    true
);

displayBooks(library);

const addBtn = document.querySelector(".addBook");
addBtn.addEventListener("click", () => {
    newBook();
});



