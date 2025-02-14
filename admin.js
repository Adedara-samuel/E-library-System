function toggleUploadFields() {
  const type = document.getElementById("type").value;
  document.getElementById("videoFields").style.display =
    type === "video" ? "block" : "none";
}

document
  .getElementById("uploadForm")
  .addEventListener("sub2345678opmit", function (event) {
    event.preventDefault();
    // Add your form submission logic here
    alert("Form submitted!");
  });

// Edit-books and video section
function fetchDetails() {
  const uniqueKey = document.getElementById("uniqueKey").value;
  if (uniqueKey) {
    // Simulate fetching details from a database
    // Here you would make an AJAX request to your server to get the details
    // For now, we will just simulate the details for demonstration purposes
    const details = {
      type: "book", // or 'video'
      title: "Sample Title",
      description: "Sample Description",
      duration: "01:23:45", // only for video
    };

    document.getElementById("type").value = details.type;
    document.getElementById("title").value = details.title;
    document.getElementById("description").value = details.description;

    if (details.type === "video") {
      document.getElementById("duration").value = details.duration;
      document.getElementById("videoFields").style.display = "block";
    } else {
      document.getElementById("videoFields").style.display = "none";
    }

    document.getElementById("editFields").style.display = "block";
  } else {
    alert("Please enter a unique key.");
  }
}

document.getElementById("type").addEventListener("change", function () {
  const type = this.value;
  document.getElementById("videoFields").style.display =
    type === "video" ? "block" : "none";
});

document
  .getElementById("editForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Add your form submission logic here
    alert("Form submitted!");
  });

// delete-books and videos Selection
document
  .getElementById("deleteForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const uniqueKey = document.getElementById("uniqueKey").value;
    const type = document.getElementById("type").value;

    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      // Simulate deletion process
      // Here you would make an AJAX request to your server to delete the item
      // For now, we will just alert the success message for demonstration purposes
      alert(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } with key ${uniqueKey} has been successfully deleted.`
      );
    }
  });

// JavaScript to handle the admin sidebar toggle
const adminDropdown = document.querySelector(".admin-dropdown");
const adminSidebar = document.querySelector(".admin-sidebar");
const closeBtn = document.querySelector(".close-btn");

adminDropdown.addEventListener("click", () => {
  adminSidebar.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  adminSidebar.style.display = "none";
});

// JavaScript to handle the favorite sidebar toggle
const favSidebar = document.querySelector(".fav-sidebar");
const favCloseBtn = document.querySelector(".fav-sidebar .close-btn");
const favIcon = document.querySelector(".icons .fa-heart");

favIcon.addEventListener("click", () => {
  favSidebar.style.display = "block";
});

favCloseBtn.addEventListener("click", () => {
  favSidebar.style.display = "none";
});

// JavaScript to handle the side-bar toggle
const sideBar = document.querySelector(".side-bar");
const toggleBtn = document.querySelector(".toggle-btn");

toggleBtn.addEventListener("click", () => {
  if (sideBar.style.left === "0px") {
    sideBar.style.left = "-250px";
  } else {
    sideBar.style.left = "0px";
  }
});
