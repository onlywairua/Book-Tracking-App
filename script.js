const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  console.log(`Adding book: Title - ${title}, Author - ${author}, Pages - ${pages}, Read - ${read}`);
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks(books = myLibrary) {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  books.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.index = index;

    const bookDetails = `
      <p><strong>Title:</strong> ${book.title}</p>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
    `;
    bookCard.innerHTML = bookDetails;

    bookList.appendChild(bookCard);
  });
}

function displayReadBooks() {
  const readBooks = myLibrary.filter(book => book.read);
  const readBooksList = document.getElementById('readBooksList');
  readBooksList.innerHTML = '';

  readBooks.forEach(book => {
    const listItem = document.createElement('li');
    listItem.textContent = `${book.title}, ${book.author}`;
    readBooksList.appendChild(listItem);
  });

  const modalContent = document.querySelector('.modal-content ul');
  modalContent.innerHTML = ''; // Clear existing content
  readBooksList.childNodes.forEach(node => modalContent.appendChild(node.cloneNode(true))); // Copy list items to modal
  const modal = document.getElementById('readBooksModal');
  modal.style.display = 'block';
}

function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('read').checked = false;
}

document.getElementById('addBookForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  addBookToLibrary(title, author, pages, read);
  clearForm(); // Clear the form fields
});

document.getElementById('showReadBooks').addEventListener('click', function() {
  displayReadBooks();
});

// Close the modal when the user clicks on the close button
document.querySelector('.close').addEventListener('click', function() {
  const modal = document.getElementById('readBooksModal');
  modal.style.display = 'none';
});

// Close the modal when the user clicks anywhere outside of it
window.addEventListener('click', function(event) {
  const modal = document.getElementById('readBooksModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});
