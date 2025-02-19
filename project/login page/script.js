function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('login-error-message');
    
    if (username === 'admin' && password === 'password') {
        alert('Login successful!');
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const errorMessage = document.getElementById('signup-error-message');
    
    if (username && email && password) {
        alert('Sign up successful!');
    } else {
        errorMessage.textContent = 'Please fill in all fields';
    }
}