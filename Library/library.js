const Library = [];

function Book(title, author, pages, genre, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre || 'General';
    this.isRead = isRead;
    this.uid = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, genre, isRead) {
    const newBook = new Book(title, author, pages, genre, isRead);
    Library.push(newBook);
    displayBooks();
    return newBook;
}

function removeBook(uid) {
    const index = Library.findIndex(book => book.uid === uid);
    if (index !== -1) {
        Library.splice(index, 1);
        displayBooks();
    }
}

function toggleBookRead(uid) {
    const book = Library.find(book => book.uid === uid);
    if (book) {
        book.toggleRead();
        displayBooks();
    }
}

function displayBooks() {
    const bookGrid = document.getElementById('bookGrid');
    
    if (Library.length === 0) {
        bookGrid.innerHTML = `
            <div class="empty-state">
                <h2>📚 Your library is empty</h2>
                <p>Click the "New Book" button to add your first book!</p>
            </div>
        `;
        return;
    }
    
    bookGrid.innerHTML = Library.map(book => `
        <div class="book-card">
            <h3>${escapeHtml(book.title)}</h3>
            <p class="author">by ${escapeHtml(book.author)}</p>
            <div class="book-info">
                <span class="info-badge">📄 ${book.pages} pages</span>
                <span class="info-badge">📚 ${escapeHtml(book.genre)}</span>
            </div>
            <div class="read-status ${book.isRead ? 'read' : 'unread'}">
                ${book.isRead ? '✓ Read' : '○ Not Read'}
            </div>
            <div class="book-actions">
                <button class="btn-small btn-toggle" onclick="toggleBookRead('${book.uid}')">
                    ${book.isRead ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button class="btn-small btn-delete" onclick="removeBook('${book.uid}')">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Modal functionality
const modal = document.getElementById('bookModal');
const newBookBtn = document.getElementById('newBookBtn');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelBtn');
const bookForm = document.getElementById('bookForm');

newBookBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    bookForm.reset();
});

cancelBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    bookForm.reset();
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        bookForm.reset();
    }
});

// Handle form submission
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = parseInt(document.getElementById('pages').value);
    const genre = document.getElementById('genre').value.trim();
    const isRead = document.getElementById('isRead').checked;
    
    if (title && author && pages > 0) {
        addBookToLibrary(title, author, pages, genre, isRead);
        modal.classList.remove('show');
        bookForm.reset();
    }
});

// Add some initial books
addBookToLibrary("Law of Human Nature", "Robert Greene", 528, "Psychology", true);
addBookToLibrary("Think and Grow Rich", "Napoleon Hill", 238, "Self-Help", false);
addBookToLibrary("Rich Dad Poor Dad", "Robert Kiyosaki", 336, "Finance", true);

// Initial display
displayBooks();
