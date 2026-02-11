// ------------------------------
// Config
// ------------------------------
const BASE_URL = "https://auth-app-1-cq6l.onrender.com/api/auth"; // Render backend

// ------------------------------
// REGISTER
// ------------------------------
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Login now.");
        window.location.href = "index.html"; // redirect to login
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  });
}

// ------------------------------
// LOGIN
// ------------------------------
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); // store JWT
        window.location.href = "dashboard.html";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  });
}

// ------------------------------
// DASHBOARD
// ------------------------------
const dashboardDiv = document.getElementById("dashboard");
if (dashboardDiv) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html"; // redirect if not logged in
  }

  const fetchDashboard = async () => {
    try {
      const res = await fetch("https://auth-app-1-cq6l.onrender.com/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        dashboardDiv.innerHTML = `<h2>${data.message}</h2>`;
      } else {
        alert(data.message || "Unauthorized");
        localStorage.removeItem("token");
        window.location.href = "index.html";
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  fetchDashboard();
}
