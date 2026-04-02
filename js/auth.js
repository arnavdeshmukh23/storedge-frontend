const API_URL = "https://storedge-backend.onrender.com";

// 🔐 SIGNUP
async function signup() {
  const inputs = document.querySelectorAll("input");

  const name = inputs[0].value + " " + inputs[1].value;
  const email = inputs[2].value;
  const password = inputs[3].value;

  if (!email || !password) {
    alert("All fields required");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful ✅");
      window.location = "login.html";
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}

// 🔐 LOGIN
async function login() {
  const inputs = document.querySelectorAll("input");

  const email = inputs[0].value;
  const password = inputs[1].value;

  if (!email || !password) {
    alert("All fields required");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful 🚀");
      window.location = "dashboard.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}

// 🔐 CHECK AUTH
function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Unauthorized 🚫");
    window.location = "login.html";
  }
}

// 🔓 LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location = "index.html";
}
