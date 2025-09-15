// src/Pages/Profile.jsx
import React, { useState, useEffect } from "react";

function Profile() {
  const [formData, setFormData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    email: "",
    password: "",
  });

  // Load user from localStorage on page load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      fetch(`http://localhost:8080/api/users/${storedUser.id}`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save profile updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/users/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser)); // update localStorage
        alert("Profile updated ✅");
      } else {
        alert("Failed to update profile ❌");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Server error ❌");
    }
  };

  const inputStyle = { backgroundColor: "#2c2c2c", color: "#fff", border: "1px solid #444" };
  const labelStyle = { color: "#bbb", marginBottom: "5px", fontSize: "14px" };

  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", padding: "40px" }}>
      <h1 className="text-center mb-5">My Profile 👤</h1>
      <div className="container d-flex justify-content-center">
        <div className="p-4" style={{ backgroundColor: "#1e1e1e", borderRadius: "10px", width: "100%", maxWidth: "600px" }}>
          <form onSubmit={handleSubmit}>
            {/* First & Last Name */}
            <div className="row mb-3">
              <div className="col">
                <label style={labelStyle}>First Name</label>
                <input type="text" className="form-control" name="firstname" style={inputStyle} value={formData.firstname} onChange={handleChange} required />
              </div>
              <div className="col">
                <label style={labelStyle}>Last Name</label>
                <input type="text" className="form-control" name="lastname" style={inputStyle} value={formData.lastname} onChange={handleChange} required />
              </div>
            </div>

            {/* Age & Gender */}
            <div className="row mb-3">
              <div className="col">
                <label style={labelStyle}>Age</label>
                <input type="number" className="form-control" name="age" style={inputStyle} value={formData.age} onChange={handleChange} required />
              </div>
              <div className="col">
                <label style={labelStyle}>Gender</label>
                <select className="form-control" name="gender" style={inputStyle} value={formData.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label style={labelStyle}>Email</label>
              <input type="email" className="form-control" name="email" style={inputStyle} value={formData.email} onChange={handleChange} required />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label style={labelStyle}>Password</label>
              <input type="password" className="form-control" name="password" style={inputStyle} value={formData.password} onChange={handleChange} placeholder="Leave blank to keep old password" />
            </div>

            <button type="submit" className="btn btn-light w-100">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
