// src/Pages/AddEvent.jsx
import React, { useState } from "react";

function AddEvent() {
  const [formData, setFormData] = useState({
    eventName: "",
    city: "",
    state: "",
    address: "",
    sportType: "Football",
    playersRequired: "",
    preferredGender: "Any",
    date: "",
    time: "",
    description: "",
  });

  const token = localStorage.getItem("token"); // JWT from localStorage

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/events/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // include JWT
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Event added successfully ✅");
        setFormData({
          eventName: "",
          city: "",
          state: "",
          address: "",
          sportType: "Football",
          playersRequired: "",
          preferredGender: "Any",
          date: "",
          time: "",
          description: "",
        });
      } else {
        const errMsg = await response.text();
        alert("Failed to add event ❌: " + errMsg);
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server ❌");
    }
  };

  const inputStyle = { backgroundColor: "#2c2c2c", color: "#fff", border: "none" };

  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", padding: "40px" }}>
      <h1 className="text-center mb-5">Add New Event/Game 🏟</h1>
      <div className="container">
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#1e1e1e", padding: "30px", borderRadius: "10px" }}>
          {/* Event Name */}
          <div className="mb-3">
            <label className="form-label">Event/Game Name</label>
            <input type="text" className="form-control" name="eventName" value={formData.eventName} onChange={handleChange} placeholder="e.g. Football Sunday Match" style={inputStyle} required />
          </div>

          {/* City & State */}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">City</label>
              <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" style={inputStyle} required />
            </div>
            <div className="col">
              <label className="form-label">State</label>
              <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} placeholder="Enter state" style={inputStyle} required />
            </div>
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Local Address</label>
            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} placeholder="Street, Area, Landmark" style={inputStyle} required />
          </div>

          {/* Sport & Players */}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Type of Sport</label>
              <select className="form-control" name="sportType" value={formData.sportType} onChange={handleChange} style={inputStyle}>
                <option>Football</option>
                <option>Basketball</option>
                <option>Cricket</option>
                <option>Badminton</option>
                <option>Tennis</option>
                <option>Table Tennis</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col">
              <label className="form-label">Players Required</label>
              <input type="number" className="form-control" name="playersRequired" value={formData.playersRequired} onChange={handleChange} placeholder="e.g. 10" style={inputStyle} required />
            </div>
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Preferred Gender</label>
            <select className="form-control" name="preferredGender" value={formData.preferredGender} onChange={handleChange} style={inputStyle}>
              <option>Any</option>
              <option>Male</option>
              <option>Female</option>
              <option>Mixed</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
            </div>
            <div className="col">
              <label className="form-label">Time</label>
              <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} style={inputStyle} required />
            </div>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Additional Info / Description</label>
            <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Write something about the event..." style={inputStyle}></textarea>
          </div>

          <button type="submit" className="btn btn-light w-100">Add Event</button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
