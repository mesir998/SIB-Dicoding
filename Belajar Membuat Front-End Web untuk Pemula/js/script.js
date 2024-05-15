const inputBooks = [];
const RENDER_BOOK_SUBMIT_EVENT = "render-book-submit-event";
const SAVED_BOOK_EVENT = "save-book-submit-event";
const STORAGE_BOOK_KEY = "BOOKSHELF-APPS";

function inputBook() {
  const inputBookTitle = document.getElementById("inputBookTitle").value;
  const inputBookAuthor = document.getElementById("inputBookAuthor").value;
  const inputBookYear = Number(document.getElementById("inputBookYear").value);
  const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;
  const generatedIDBook = generateIDBook();
  const inputBookObject = generateinputBookObject(generatedIDBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
  inputBooks.push(inputBookObject);
  document.dispatchEvent(new Event(RENDER_BOOK_SUBMIT_EVENT));
  saveBook();
}

function generateIDBook() {
  return +new Date();
}
function generateinputBookObject(generatedIDBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete) {
  return {
    generatedIDBook,
    inputBookTitle,
    inputBookAuthor,
    inputBookYear,
    inputBookIsComplete,
  };
}
function makeBook(inputBookObject) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = "Judul:" + inputBookObject.inputBookTitle;
  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = "Penulis: " + inputBookObject.inputBookAuthor;
  const bookYear = document.createElement("p");
  bookYear.innerText = "Tahun: " + inputBookObject.inputBookYear;
  const bookItem = document.createElement("article");

  bookItem.classList.add("book_item");
  bookItem.append(bookTitle, bookAuthor, bookYear);
  bookItem.setAttribute("generatedIDBook", `${inputBookObject.generatedIDBook}`);
  const completedButton = document.createElement("button");
  completedButton.classList.add("green");
  if (inputBookObject.inputBookIsComplete) {
    completedButton.innerText = "Belum Selesai Dibaca";
    completedButton.addEventListener("click", function () {
      undoBookFromCompleted(inputBookObject.generatedIDBook);
    });
  } else {
    completedButton.innerText = "Selesai Dibaca";
    completedButton.addEventListener("click", function () {
      addBookToCompleted(inputBookObject.generatedIDBook);
    });
  }

  const eraseButton = document.createElement("button");
  eraseButton.classList.add("red");
  eraseButton.innerText = "Hapus";
  eraseButton.addEventListener("click", function () {
    eraseBookFromCompleted(inputBookObject.generatedIDBook);
    return alert("Buku telah terhapus!");
  });
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("action");
  buttonContainer.append(completedButton, eraseButton);
  bookItem.append(buttonContainer);
  return bookItem;
}
function findBooks(bookId) {
  for (const booksItem of inputBooks) {
    if (booksItem.generatedIDBook === bookId) {
      return booksItem;
    }
  }
}
function addBookToCompleted(bookId) {
  const bookTarget = findBooks(bookId);
  if (bookTarget == null) return;
  bookTarget.inputBookIsComplete = true;
  document.dispatchEvent(new Event(RENDER_BOOK_SUBMIT_EVENT));
  saveBook();
}
function undoBookFromCompleted(bookId) {
  const bookTarget = findBooks(bookId);
  if (bookTarget == null) return;
  bookTarget.inputBookIsComplete = false;
  document.dispatchEvent(new Event(RENDER_BOOK_SUBMIT_EVENT));
  saveBook();
}
function eraseBookFromCompleted(bookId) {
  const bookTarget = findBooks(bookId);
  if (bookTarget === -1) return;
  inputBooks.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_BOOK_SUBMIT_EVENT));
  saveBook();
}

document.addEventListener("DOMContentLoaded", function () {
  const submitInputBook = document.getElementById("inputBook");
  submitInputBook.addEventListener("submit", function (event) {
    event.preventDefault();
    inputBook();
  });
  const searchBooks = document.getElementById("searchBook");

  searchBooks.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });
  if (bookStorageExist()) {
    loadBookFromStorage();
  }
});

document.addEventListener(RENDER_BOOK_SUBMIT_EVENT, function () {
  const incompletedBookshelfList = document.getElementById("incompleteBookshelfList");
  incompleteBookshelfList.innerHTML = "";
  const completedBookshelfList = document.getElementById("completeBookshelfList");
  completeBookshelfList.innerHTML = "";
  for (const bookItem of inputBooks) {
    const bookElement = makeBook(bookItem); // Cukup gunakan salah satu dan panggil makeBook()
    if (!bookItem.inputBookIsComplete) incompletedBookshelfList.append(bookElement);
    else completedBookshelfList.append(bookElement);
  }
});

function saveBook() {
  if (bookStorageExist()) {
    const parsed = JSON.stringify(inputBooks);
    localStorage.setItem(STORAGE_BOOK_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_BOOK_EVENT));
  }
}

function bookStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

document.addEventListener(SAVED_BOOK_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_BOOK_KEY));
});

function loadBookFromStorage() {
  const bookData = localStorage.getItem(STORAGE_BOOK_KEY);
  let data = JSON.parse(bookData);

  if (data !== null) {
    for (const book of data) {
      inputBooks.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_BOOK_SUBMIT_EVENT));
}
function searchBook() {
  const inputSearch = document.getElementById("searchBookTitle").value.toLowerCase();
  const moveBook = document.querySelectorAll(".book_item");

  moveBook.forEach(function (book) {
    const bookTitle = book.querySelector("h3").innerText.toLowerCase();
    if (bookTitle.includes(inputSearch)) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }
  });
}
