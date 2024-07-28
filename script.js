const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

let row = 0;
function displayLibrary() {
    if (myLibrary.length === 0) {
        bookContainer.style.display = "none";
        return;
    }
    bookContainer.style.display = "table";
    bookshelf.innerHTML = null;
    let row = Math.ceil(myLibrary.length / 5);
    let currentIndex = 0;
    for (let i = 0; i < row; i++) {
        let newRow = bookshelf.insertRow();
        for (let j = 0; j < 5; j++) {
            let cell = newRow.insertCell(j);
            if (i * 5 + j < myLibrary.length) {
                cell.style.border = "1px solid black";
                let container = document.createElement("div");
                let title = document.createElement("div");
                container.appendChild(title);
                title.textContent = myLibrary[i * 5 + j].title;
                let author = document.createElement("div");
                container.appendChild(author);
                author.textContent = myLibrary[i * 5 + j].author;
                let pages = document.createElement("div");
                container.appendChild(pages);
                pages.textContent = myLibrary[i * 5 + j].pages + " pages";
                let hasRead = document.createElement("button");
                hasRead.style.width = "60%";
                container.appendChild(hasRead);
                hasRead.textContent = myLibrary[i * 5 + j].hasRead ? "Read" : "Not Read";
                hasRead.id = i * 5 + j;
                hasRead.addEventListener("click", () => {
                    if (hasRead.textContent === "Read") {
                        hasRead.textContent = "Not Read";
                        myLibrary[i*5+j].hasRead = false;
                    } else {
                        hasRead.textContent = "Read";
                        myLibrary[i*5+j].hasRead = true;
                    }
                });
                let removeButton = document.createElement("button");
                removeButton.textContent = "remove";
                removeButton.style.width = "50%";
                container.appendChild(removeButton);
                removeButton.id = i * 5 + j;
                removeButton.addEventListener("click", (e) => {
                    myLibrary.splice(parseInt(e.target.id), 1);
                    displayLibrary();
                });
                container.style.fontSize = "20px";
                container.style.display = "flex";
                container.style.flexDirection = "column";
                container.style.alignItems = "center";
                container.style.gap = "5px";
                cell.appendChild(container);
            }
        }
    }
}

const bookContainer = document.querySelector(".bookContainer");
const bookshelf = document.querySelector("tbody");
const tableContainer = document.querySelector(".tableContainer");
const mainContainer = document.querySelector(".mainContainer");
addBookToLibrary(new Book("Title1", "Author", 300, true));
addBookToLibrary(new Book("Title2", "Author", 300, true));
addBookToLibrary(new Book("Title3", "Author", 300, true));
addBookToLibrary(new Book("Title4", "Author", 300, true));
addBookToLibrary(new Book("Title5", "Author", 300, true));
displayLibrary();

let addBook = document.querySelector(".addBook");
addBook.addEventListener("click", () => {
    addBook.disabled = true;
    const bookFormContainer = document.createElement("div");
    const bookForm = document.createElement("form");
    bookForm.className = "bookForm";
    bookForm.style.margin = "10px";
    bookFormContainer.style.borderStyle = "solid";
    bookFormContainer.style.borderColor = "black";
    bookFormContainer.style.borderWidth = "1px";
    bookFormContainer.appendChild(bookForm);
    let input1 = addInputWithLabel("text", "title", "Enter the book's title:");
    let input2 = addInputWithLabel("text", "author", "Enter the book's author:");
    let input3 = addInputWithLabel("number", "pages", "Enter the book's total page:");
    let input4 = addRadioButtonWithOptions("Yes", "No");
    bookForm.appendChild(input1);
    bookForm.appendChild(input2);
    bookForm.appendChild(input3);
    bookForm.appendChild(input4);
    input1 = input1.querySelector("input");
    input2 = input2.querySelector("input");
    input3 = input3.querySelector("input");
    input4 = input4.querySelector("#radio0");
    console.log(input4);
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.marginRight = "10px";
    cancelButton.style.marginTop = "10px";
    cancelButton.type = "button";
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.style.marginTop = "10px";
    bookForm.appendChild(cancelButton);
    bookForm.appendChild(submitButton);
    cancelButton.addEventListener("click", (e) => {
        addBook.disabled = false;
        bookFormContainer.remove();
    });
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (input1.checkValidity() && input2.checkValidity() && input3.checkValidity() && input4.checkValidity()) {
            addBookToLibrary(new Book(input1.value, input2.value, input3.value, input4.checked));
            displayLibrary();
            bookFormContainer.remove();
            addBook.disabled = false;
        } else {
            alert("fill in all required field");
        }
    });
    mainContainer.appendChild(bookFormContainer);
});

function addInputWithLabel(inputType, id, labelName, inputCount) {
    const input = document.createElement("input");
    input.type = inputType;
    input.id = id;
    input.required = true;
    const label = document.createElement("label");
    label.style.display = "block";
    label.style.marginBottom = "3px";
    input.style.marginBottom = "10px";
    label.id = id;
    label.textContent = labelName;
    const inputContainer = document.createElement("div");
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);
    return inputContainer;
}

function addRadioButtonWithOptions(...options) {
    const radioContainer = document.createElement("div");
    const question = document.createElement("p");
    question.textContent = "Have you read this book? ";
    question.style.marginTop = 0;
    question.style.marginBottom = "3px";
    radioContainer.appendChild(question);
    for (let i = 0; i < options.length; i++) {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "hasRead";
        radio.id = "radio" + i;
        console.log(radio.id);
        radio.value = options[i];
        radio.required = true;
        const label = document.createElement("label");
        label.textContent = options[i];
        radio.style.marginRight = "20px";
        radioContainer.appendChild(label);
        radioContainer.appendChild(radio);
    }
    return radioContainer;
}


