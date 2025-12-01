const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const libraryGrid = document.getElementById('libraryGrid');
    const emptyMessage = document.getElementById('emptyMessage');

    libraryGrid.innerHTML = '';

    if (myLibrary.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.setAttribute('data-book-id', book.id);

        bookCard.innerHTML = `
          <h3>${book.title}</h3>
          <p class="author">by ${book.author}</p>
          <p>${book.pages} pages</p>
          <span class="read-status ${book.read ? 'read' : 'not-read'}">
            ${book.read ? 'Read ✓' : 'Not Read'}
          </span>
          <div class="book-actions">
            <button class="btn toggle-read-btn ${book.read ? '' : 'not-read'}" data-book-id="${book.id}">
              ${book.read ? 'Mark Unread' : 'Mark Read'}
            </button>
            <button class="btn remove-btn" data-book-id="${book.id}">Remove</button>
          </div>
        `;

        libraryGrid.appendChild(bookCard);
    });

    attachEventListeners();
}

function attachEventListeners() {
    const toggleButtons = document.querySelectorAll('.toggle-read-btn');
    const removeButtons = document.querySelectorAll('.remove-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const bookId = e.target.getAttribute('data-book-id');
            toggleReadStatus(bookId);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const bookId = e.target.getAttribute('data-book-id');
            removeBook(bookId);
        });
    });
}

function toggleReadStatus(bookId) {
    const book = myLibrary.find(b => b.id === bookId);
    if (book) {
        book.toggleRead();
        displayBooks();
    }
}

function removeBook(bookId) {
    const index = myLibrary.findIndex(b => b.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

// Dialog and Form handling
const dialog = document.getElementById('bookDialog');
const addBookBtn = document.getElementById('addBookBtn');
const cancelBtn = document.getElementById('cancelBtn');
const bookForm = document.getElementById('bookForm');

addBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
    dialog.close();
    bookForm.reset();
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    dialog.close();
    bookForm.reset();
});

// Add some sample books for demonstration
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);