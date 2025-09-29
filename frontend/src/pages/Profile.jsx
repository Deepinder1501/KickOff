// src/Pages/Profile.jsx
import React, { useState, useEffect } from "react";

function Profile() {
  const [formData, setFormData] = useState({
    id: "", firstname: "", lastname: "", age: "", gender: "", email: "", password: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      fetch(`/api/users/${storedUser.id}`, {
        headers: { "Authorization": "Bearer " + token }
      })
        .then(res => res.json())
        .then(data => setFormData(data))
        .catch(err => console.error(err));
    }
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/users/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated ✅");
      } else {
        const errorText = await response.text();
        alert("Update failed ❌: " + errorText);
      }
    } catch (err) {
      console.error(err);
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

            <div className="mb-3">
              <label style={labelStyle}>Email</label>
              <input type="email" name="email" style={inputStyle} className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label style={labelStyle}>Password</label>
              <input type="password" name="password" style={inputStyle} className="form-control" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep old password" />
            </div>

            <button type="submit" className="btn btn-light w-100">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
