document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');
  const toggleLoginPassword = document.getElementById('toggle-login-password');
  const toggleSignupPassword = document.getElementById('toggle-signup-password');

  loginBtn.addEventListener('click', function () {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
  });

  signupBtn.addEventListener('click', function () {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
  });

  switchToSignup.addEventListener('click', function (e) {
    e.preventDefault();
    signupBtn.click();
  });

  switchToLogin.addEventListener('click', function (e) {
    e.preventDefault();
    loginBtn.click();
  });

  function togglePasswordVisibility(inputField, toggleIcon) {
    if (inputField.type === 'password') {
      inputField.type = 'text';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    } else {
      inputField.type = 'password';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
    }
  }

  toggleLoginPassword.addEventListener('click', function () {
    const loginPassword = document.getElementById('login-password');
    togglePasswordVisibility(loginPassword, toggleLoginPassword);
  });

  toggleSignupPassword.addEventListener('click', function () {
    const signupPassword = document.getElementById('signup-password');
    togglePasswordVisibility(signupPassword, toggleSignupPassword);
  });

  // Handle form submissions
  window.handleLogin = function (event) {
    event.preventDefault();
    const loginEmail = document.getElementById('login-email').value;
    const loginPassword = document.getElementById('login-password').value;

    if (loginEmail && loginPassword) {
      // Navigate to the index page
      window.location.href = 'dashboard.html';
    }
  };

  window.handleSignup = function (event) {
    event.preventDefault();
    const signupUsername = document.getElementById('signup-username').value;
    const signupEmail = document.getElementById('signup-email').value;
    const signupPassword = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (signupUsername && signupEmail && signupPassword && confirmPassword) {
      if (signupPassword !== confirmPassword) {
        showErrorMessage('Passwords do not match.');
        return;
      }
      if (!validatePassword(signupPassword)) {
        showErrorMessage('Password must be at least 6 characters long, contain one uppercase letter, and one number.');
        return;
      }
      // Navigate to the index page or handle signup logic here
      window.location.href = 'dashboard.html';
    } else {
      showErrorMessage('Please fill in all fields.');
    }
  };

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
    const form = document.getElementById('signup-form');
    form.appendChild(errorMessage);

    // Clear error message after a delay (optional)
    setTimeout(function () {
      errorMessage.remove();
    }, 3000); // Remove after 3 seconds
  }

  // Initialize by showing the login form
  loginBtn.click();
});
