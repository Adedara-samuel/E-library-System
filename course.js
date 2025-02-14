document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("search-box");
  const searchResultsContainer = document.querySelector(".course-list"); // Keeps default courses
  const courses = [
    "HTML", "CSS", "JavaScript", "Python", "Java", "React", "Data Science", "Machine Learning"
  ]; // Your predefined course categories

  // Fetch Google Books API based on course category
  function fetchBooksForCourse(courseName) {
    const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(courseName)}&maxResults=5&key=AIzaSyDhPs30ugnwJsmDujXweYWyGBSUJ7Y_5Ic`;

    fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          data.items.forEach(item => {
            const book = item.volumeInfo;
            const bookElement = document.createElement("div");
            bookElement.className = "course-item";
            bookElement.innerHTML = `
              <div class="course-thumbnail">
                <img src="${book.imageLinks?.thumbnail || 'default-thumbnail.jpg'}" alt="${book.title}">
              </div>
              <div class="course-info">
                <h3>${book.title}</h3>
                <p>By ${book.authors?.join(", ") || "Unknown Author"}</p>
                <button onclick="openBookReader('${item.id}')">Read</button>
              </div>
            `;
            searchResultsContainer.appendChild(bookElement);
          });
        }
      })
      .catch(error => console.error("Error fetching books:", error));
  }

  // Load books for each predefined course
  courses.forEach(course => fetchBooksForCourse(course));

  // Real-time filtering based on search
  searchBox.addEventListener("input", () => {
    const query = searchBox.value.trim().toLowerCase();
    const courseItems = document.querySelectorAll(".course-item");

    courseItems.forEach(item => {
      const title = item.querySelector("h3").textContent.toLowerCase();
      item.style.display = title.includes(query) ? "block" : "none";
    });
  });

  // Function to open book reader (Google Books embedded)
  window.openBookReader = (bookId) => {
    const readerOverlay = document.createElement("div");
    readerOverlay.className = "reader-overlay";
    readerOverlay.innerHTML = `
      <div class="reader-content">
        <iframe src="https://books.google.com/books?id=${bookId}&printsec=frontcover&output=embed" allowfullscreen></iframe>
        <button class="close-reader" onclick="document.body.removeChild(this.parentNode.parentNode)">Close</button>
      </div>
    `;
    document.body.appendChild(readerOverlay);
  };
});
