// src/Pages/Signup.jsx
import React, { useState } from "react";

function Signup() {
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
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        mode: "cors",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Saved User:", data);
        alert("Signup successful ✅");
         navigate("/login");
      } else {
        // Capture backend error text
        const errorText = await response.text();
        console.error(" Signup failed. Backend says:", errorText);
        alert("Signup failed : " + errorText);
      }
    } catch (error) {
      console.error(" Network/Server Error:", error);
      alert("Error connecting to server ");
    }
  };

  // Shared styles
  const inputStyle = {
    backgroundColor: "#2c2c2c",
    color: "#fff",
    border: "1px solid #444",
  };

  const labelStyle = {
    color: "#bbb",
    marginBottom: "5px",
    fontSize: "14px",
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1 className="text-center mb-5">Sign Up </h1>
      <div className="container d-flex justify-content-center">
        <div
          className="p-4"
          style={{
            backgroundColor: "#1e1e1e",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* First and Last Name */}
            <div className="row mb-3">
              <div className="col">
                <label style={labelStyle}>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  style={inputStyle}
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label style={labelStyle}>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  style={inputStyle}
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Age & Gender */}
            <div className="row mb-3">
              <div className="col">
                <label style={labelStyle}>Age</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  style={inputStyle}
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label style={labelStyle}>Gender</label>
                <select
                  className="form-control"
                  name="gender"
                  style={inputStyle}
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

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

            {/* Confirm Password */}
            <div className="mb-3">
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                style={inputStyle}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-light w-100">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
