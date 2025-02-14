document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const logoutBtn = document.getElementById('logout-btn');
  const settingsIcon = document.querySelector('.fas.fa-cog');
  const settingsPanel = document.getElementById('settings');
  const closeButton = document.querySelector('.close-btn');
  const body = document.querySelector('body');
  const passwordDropdown = document.getElementById('password-dropdown');
  const changePasswordForm = document.getElementById('change-password-form');
  const newPasswordInput = document.getElementById('new-password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const bottomNav = document.querySelector(".bottom-nav");
  let scrollCount = 0;
  let lastScrollTop = 0;

  // Event listeners
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      console.log('Logout button clicked');
      // Example: Perform logout functionality (clear session, etc.)
      // Redirect to index.html
      window.location.href = 'index.html';
    });
  } else {
    console.log('Logout button not found');
  }

  if (settingsIcon) {
    settingsIcon.addEventListener('click', function () {
      toggleSettingsPanel();
    });
  } else {
    console.log('Settings icon not found');
  }

  if (closeButton) {
    closeButton.addEventListener('click', function () {
      toggleSettingsPanel();
    });
  } else {
    console.log('Close button not found');
  }

  // Handle window scroll event
  window.addEventListener("scroll", function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
      // Scrolling down
      scrollCount++;
      if (scrollCount >= 3) {
        bottomNav.classList.remove("show");
      }
    } else {
      // Scrolling up
      scrollCount = 0; // Reset scroll count when scrolling up
      bottomNav.classList.add("show");
    }

    lastScrollTop = st <= 0 ? 0 : st; // For mobile or negative scrolling
  });

  // Event listener for dropdown change
  if (passwordDropdown) {
    passwordDropdown.addEventListener('change', function () {
      const selectedOption = passwordDropdown.value;
      if (selectedOption === 'change-password') {
        showChangePasswordForm();
      } else if (selectedOption === 'add-account') {
        // Redirect to loginpage
        window.location.href = 'index.html';
      } else {
        // Hide change password form if another option is selected
        changePasswordForm.classList.remove('active');
      }
    });
  } else {
    console.log('Password dropdown not found');
  }

  // Event listener for form submission
  const passwordForm = document.getElementById('password-form');
  if (passwordForm) {
    passwordForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const newPassword = newPasswordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      // Example: Validate passwords match
      if (newPassword !== confirmPassword) {
        showErrorMessage('Passwords do not match.');
        return;
      }

      // Example: Implement logic to change password (replace with actual logic)
      // Simulating a delay for demonstration purposes
      setTimeout(function () {
        if (validatePassword(newPassword)) {
          showSuccessMessage('Password changed successfully.', function () {
            toggleSettingsPanel(); // Close settings panel
          });
        } else {
          showErrorMessage('Password must be at least 6 characters and include one uppercase letter and one number.');
        }
      }, 1000); // Simulated delay of 1 second

      // Clear form inputs (for demonstration, remove in actual implementation)
      newPasswordInput.value = '';
      confirmPasswordInput.value = '';
    });
  } else {
    console.log('Password form not found');
  }

  // Function to toggle settings panel
  function toggleSettingsPanel() {
    console.log('Toggling settings panel');
    settingsPanel.classList.toggle('active');
    body.classList.toggle('no-scroll'); // Prevent scrolling background content
  }

  // Function to show change password form
  function showChangePasswordForm() {
    console.log('Showing change password form');
    changePasswordForm.classList.add('active');
  }

  // Function to validate password
  function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  }

  // Function to show error message
  function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;

    // Append error message to form
    const form = document.getElementById('password-form');
    form.appendChild(errorMessage);

    // Clear error message after a delay (optional)
    setTimeout(function () {
      errorMessage.remove();
    }, 10000); // Remove after 10 seconds
  }

  // Function to show success message and execute callback on OK
  function showSuccessMessage(message, callback) {
    // Display success message (optional)
    console.log(message);

    // Execute callback function after message shown (optional)
    if (callback && typeof callback === 'function') {
      callback();
    }
  }

});

// Toggle admin sidebar on clicking the briefcase icon
document.querySelector('.admin-dropdown').addEventListener('click', function () {
  this.classList.toggle('open');
});



