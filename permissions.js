document.addEventListener('DOMContentLoaded', function () {
  const grantPermissionsBtn = document.getElementById('grant-permissions-btn');
  const messageDiv = document.getElementById('message');

  grantPermissionsBtn.addEventListener('click', function () {
    // Collect user role
    const userRole = document.getElementById('user-role').value;

    // Collect permissions
    const permissions = {
      dashboard: document.querySelector(`#${userRole}-dashboard`).checked,
      profile: document.querySelector(`#${userRole}-profile`).checked,
      course: document.querySelector(`#${userRole}-course`).checked,
      adminBlock: document.querySelector(`#${userRole}-admin-block`).checked,
      faq: document.querySelector(`#${userRole}-faq`).checked,
    };

    // Simulate a successful form submission
    setTimeout(() => {
      // Here, you would typically send the permissions data to the server via an AJAX request.
      // For now, we'll just simulate success and show a message.

      // Display success message
      messageDiv.textContent = 'Permissions granted successfully!';
      messageDiv.className = 'message success';

      // Reload the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }, 1000);
  });
});
