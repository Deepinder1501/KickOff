// src/Pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Signup successful ✅");
        navigate("/login");
      } else {
        const errorText = await response.text();
        alert("Signup failed: " + errorText);
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  const inputStyle = { backgroundColor: "#2c2c2c", color: "#fff", border: "1px solid #444" };
  const labelStyle = { color: "#bbb", marginBottom: "5px", fontSize: "14px" };

  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", padding: "40px" }}>
      <h1 className="text-center mb-5">Sign Up</h1>
      <div className="container d-flex justify-content-center">
        <div className="p-4" style={{ backgroundColor: "#1e1e1e", borderRadius: "10px", width: "100%", maxWidth: "600px" }}>
          <form onSubmit={handleSubmit}>
            {/* First & Last Name */}
            <div className="row mb-3">
              <div className="col">
                <label style={labelStyle}>First Name</label>
                <input type="text" name="firstname" style={inputStyle} className="form-control" value={formData.firstname} onChange={handleChange} required />
              </div>
              <div className="col">
                <label style={labelStyle}>Last Name</label>
                <input type="text" name="lastname" style={inputStyle} className="form-control" value={formData.lastname} onChange={handleChange} required />
              </div>
            </div>

            {/* Age & Gender */}
            <div className="row mb-3">
              <div className="col">
                <label style={labelStyle}>Age</label>
                <input type="number" name="age" style={inputStyle} className="form-control" value={formData.age} onChange={handleChange} required />
              </div>
              <div className="col">
                <label style={labelStyle}>Gender</label>
                <select name="gender" style={inputStyle} className="form-control" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Email & Password */}
            <div className="mb-3">
              <label style={labelStyle}>Email</label>
              <input type="email" name="email" style={inputStyle} className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label style={labelStyle}>Password</label>
              <input type="password" name="password" style={inputStyle} className="form-control" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label style={labelStyle}>Confirm Password</label>
              <input type="password" name="confirmPassword" style={inputStyle} className="form-control" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn btn-light w-100">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
