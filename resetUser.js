document.addEventListener('DOMContentLoaded', () => {
  const fetchUserDetailsBtn = document.getElementById('fetchUserDetails');
  const userDetailsDiv = document.getElementById('userDetails');
  const resetPasswordBtn = document.getElementById('resetPasswordBtn');
  const userNameP = document.getElementById('userName');
  const userEmailP = document.getElementById('userEmail');

  fetchUserDetailsBtn.addEventListener('click', () => {
    const uniqueKey = document.getElementById('uniqueKey').value;

    // Mocking a user details fetch. Replace with actual fetch call.
    const user = getUserDetails(uniqueKey);

    if (user) {
      userNameP.textContent = `Name: ${user.name}`;
      userEmailP.textContent = `Email: ${user.email}`;
      userDetailsDiv.classList.remove('hidden');
    } else {
      alert('User not found.');
    }
  });

  resetPasswordBtn.addEventListener('click', () => {
    const uniqueKey = document.getElementById('uniqueKey').value;

    // Mocking a password reset. Replace with actual reset call.
    const success = resetUserPassword(uniqueKey);

    if (success) {
      alert('Password reset to default successfully.');
    } else {
      alert('Failed to reset password.');
    }
  });

  function getUserDetails(uniqueKey) {
    // Mock user details. Replace with actual API call.
    const users = {
      'john_doe': { name: 'John Doe', email: 'john@example.com' },
      'jane_smith': { name: 'Jane Smith', email: 'jane@example.com' }
    };
    return users[uniqueKey] || null;
  }

  function resetUserPassword(uniqueKey) {
    // Mock password reset. Replace with actual API call.
    const users = ['john_doe', 'jane_smith'];
    return users.includes(uniqueKey);
  }
});
