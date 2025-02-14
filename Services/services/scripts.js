document.addEventListener('DOMContentLoaded', () => {
    const booksContainer = document.getElementById('books-container');

    async function fetchBooks() {
        try {
            const response = await fetch('http://localhost:3001/api/books');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const books = await response.json();
            displayBooks(books);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    function displayBooks(books) {
        booksContainer.innerHTML = books.map(book => `
            <div class="book-card">
                <img src="${book.fileUrl}" alt="${book.Title}">
                <h2>${book.Title}</h2>
                <p><strong>File Name:</strong> ${book.FileName}</p>
                <p><strong>File Type:</strong> ${book.FileType}</p>
                <p><strong>File Size:</strong> ${book.FileSize} bytes</p>
            </div>
        `).join('');
    }

    fetchBooks();
});
