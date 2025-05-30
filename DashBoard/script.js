// // Signup Handler
// function handleSignup(event) {
//   event.preventDefault();

//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const confirmPassword = document.getElementById("confirm-password").value.trim();

//   if (password !== confirmPassword) {
//     alert("Passwords do not match!");
//     return;
//   }

//   const signupData = { name, email, password };

//   fetch('http://localhost:5000/api/auth/signup', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(signupData)
//   })
//     .then(res => res.json())
//     .then(data => {
//       console.log('Signup response:', data);

//       if (data.token) {
//         alert("Signup successful!");

//         localStorage.setItem('token', data.token);
//         localStorage.setItem('name', data.user?.name || name);  // Use 'name' key always
//         localStorage.setItem('role', data.user?.role || 'user');

//         window.location.href = 'login.html';
//       } else {
//         alert(data.message || 'Signup failed');
//       }
//     })
//     .catch(err => {
//       console.error('Signup Error:', err);
//       alert('Signup error. Check console for details.');
//     });
// }

// // Login Handler
// function handleLogin(event) {
//   event.preventDefault();

//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();

//   const loginData = { email, password };

//   fetch('http://localhost:5000/api/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(loginData)
//   })
//     .then(res => res.json())
//     .then(data => {
//       console.log('Login response:', data);

//       if (data.token) {
//         alert("Login successful!");

//         localStorage.setItem('token', data.token);
//         localStorage.setItem('name', data.user?.name || 'User'); 
//         localStorage.setItem('role', data.user?.role || 'user');
//         window.location.href = 'index.html';
//       } else {
//         alert(data.message || 'Login failed');
//       }
//     })
//     .catch(err => {
//       console.error('Login Error:', err);
//       alert('Login error. Check console for details.');
//     });
// }



function handleSignup(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const signupData = { name, email, password };

  fetch('https://smart-task-tracker.onrender.com/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupData)
  })
    .then(res => res.json())
    .then(data => {
      console.log('Signup response:', data);

      if (data.token) {
        alert("Signup successful!");
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.user?.name || name);
        localStorage.setItem('image', assests / images / prfille_picture - removebg - preview.png); // Set default image always

        window.location.href = 'login.html';
      } else {
        alert(data.message || 'Signup failed');
      }
    })
    .catch(err => {
      console.error('Signup Error:', err);
      alert('Signup error. Check console for details.');
    });
}

function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const loginData = { email, password };

  fetch('https://smart-task-tracker.onrender.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData)
  })
    .then(res => res.json())
    .then(data => {
      console.log('Login response:', data);

      if (data.token) {
        alert("Login successful!");
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.user?.name || 'User');
        localStorage.setItem('image', 'assests/images/prfille_picture-removebg-preview.png'); // Set default image always

        window.location.href = 'index.html';
      } else {
        alert(data.message || 'Login failed');
      }
    })
    .catch(err => {
      console.error('Login Error:', err);
      alert('Login error. Check console for details.');
    });
}
