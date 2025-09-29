import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // ✅ store token and user as JSON
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // notify Navbar
        window.dispatchEvent(new Event("userChanged"));

        alert("✅ Login successful");
        navigate("/");
      } else {
        const errorText = await response.text();
        alert("❌ Login failed: " + errorText);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const inputStyle = { backgroundColor: "#2c2c2c", color: "#fff", border: "1px solid #444" };
  const labelStyle = { color: "#bbb", marginBottom: "5px", fontSize: "14px" };

  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", padding: "40px" }}>
      <h1 className="text-center mb-5">Login</h1>
      <div className="container d-flex justify-content-center">
        <div
          className="p-4"
          style={{ backgroundColor: "#1e1e1e", borderRadius: "10px", width: "100%", maxWidth: "400px" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                style={inputStyle}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                style={inputStyle}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-light w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-3 text-center" style={{ color: "#aaa" }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "#fff" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
