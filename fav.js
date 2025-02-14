document.addEventListener('DOMContentLoaded', function () {
  const favSidebar = document.querySelector('.fav-sidebar');
  const favoriteBtn = document.querySelector('.fas.fa-heart');
  const closeBtn = document.querySelector('.fav-sidebar .close-btn');
  const sidebarContent = document.querySelector('.fav-sidebar .sidebar-content');

  // Mock data for favorite items (replace with actual data if needed)
  const favorites = [
    { title: 'Course 1', description: 'Description of Course 1' },
    { title: 'Course 2', description: 'Description of Course 2' },
    { title: 'Course 3', description: 'Description of Course 3' }
    // Add more favorite items as needed
  ];

  // Function to toggle sidebar
  function toggleFavSidebar() {
    favSidebar.classList.toggle('open');
  }

  // Function to populate sidebar with favorite items
  function populateSidebar() {
    sidebarContent.innerHTML = favorites.map(item => `
        <div class="sidebar-item">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      `).join('');
  }

  // Event listener for favorite button click
  favoriteBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    toggleFavSidebar();
    populateSidebar();
  });

  // Event listener for close button click
  closeBtn.addEventListener('click', function () {
    toggleFavSidebar();
  });
});
