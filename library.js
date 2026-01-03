const Library = [];

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.uid = crypto.randomUUID();
}

function Addbook(title, author) {
    const newBook = new Book(title, author);
    Library.push(newBook);
}

// Actually call the function to add books (with quotes!)
Addbook("Law of Human Nature", "Robert Greene");
Addbook("Think and Grow Rich", "Napoleon Hill");
Addbook("Rich Dad Poor Dad", "Robert Kiyosaki");

// Loop through and log them
for (let i = 0; i < Library.length; i++) {
    const book = Library[i];
    console.log(book);
}