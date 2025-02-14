document.addEventListener('DOMContentLoaded', () => {
  const fetchUserDetailsBtn = document.getElementById('fetchUserDetails');
  const userDetailsDiv = document.getElementById('userDetails');
  const toggleStatusBtn = document.getElementById('toggleStatusBtn');
  const userNameP = document.getElementById('userName');
  const userEmailP = document.getElementById('userEmail');
  const userStatusP = document.getElementById('userStatus');

  // Mock database (Replace with actual API calls)
  const users = {
    'john_doe': { name: 'John Doe', email: 'john@example.com', active: true },
    'jane_smith': { name: 'Jane Smith', email: 'jane@example.com', active: false }
  };

  fetchUserDetailsBtn.addEventListener('click', () => {
    const uniqueKey = document.getElementById('uniqueKey').value.trim();

    if (!uniqueKey) {
      alert('Please enter a unique key.');
      return;
    }

    const user = users[uniqueKey];

    if (user) {
      userNameP.textContent = `Name: ${user.name}`;
      userEmailP.textContent = `Email: ${user.email}`;
      userStatusP.textContent = `Status: ${user.active ? 'Active' : 'Inactive'}`;
      toggleStatusBtn.textContent = user.active ? 'Deactivate User' : 'Activate User';
      toggleStatusBtn.dataset.userKey = uniqueKey; // Store key for toggling
      userDetailsDiv.classList.remove('hidden');
    } else {
      alert('User not found.');
    }
  });

  toggleStatusBtn.addEventListener('click', () => {
    const uniqueKey = toggleStatusBtn.dataset.userKey;

    if (!uniqueKey || !users[uniqueKey]) {
      alert('User data not found. Please fetch user details first.');
      return;
    }

    // Toggle status
    users[uniqueKey].active = !users[uniqueKey].active;

    // Immediately update the UI
    userStatusP.textContent = `Status: ${users[uniqueKey].active ? 'Active' : 'Inactive'}`;
    toggleStatusBtn.textContent = users[uniqueKey].active ? 'Deactivate User' : 'Activate User';

    alert(`User status updated to ${users[uniqueKey].active ? 'Active' : 'Inactive'}.`);
  });
});
