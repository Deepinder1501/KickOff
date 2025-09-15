// src/Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        if (user && user.id) {
          console.log("Logged in User:", user);

          //Save in localStorage
          localStorage.setItem("user", JSON.stringify(user));

          // Trigger event so Navbar updates immediately
          window.dispatchEvent(new Event("userChanged"));

          alert("Login successful ✅");
          navigate("/");
        } else {
          alert("Invalid email or password ❌");
        }
      } else {
        alert("Login failed ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server ❌");
    }
  };

  const inputStyle = { backgroundColor: "#2c2c2c", color: "#fff", border: "1px solid #444" };
  const labelStyle = { color: "#bbb", marginBottom: "5px", fontSize: "14px" };

  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", padding: "40px" }}>
      <h1 className="text-center mb-5">Login </h1>
      <div className="container d-flex justify-content-center">
        <div className="p-4" style={{ backgroundColor: "#1e1e1e", borderRadius: "10px", width: "100%", maxWidth: "400px" }}>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label style={labelStyle}>Email ID</label>
              <input
                type="email"
                className="form-control"
                name="email"
                style={inputStyle}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                style={inputStyle}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-light w-100">Login</button>
          </form>

          {/* Signup Redirect */}
          <p className="mt-3 text-center" style={{ color: "#aaa" }}>
            Don’t have an account? <a href="/signup" style={{ color: "#fff" }}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
