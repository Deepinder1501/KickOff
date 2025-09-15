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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/events/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        alert("Failed to add event ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server ❌");
    }
  };

  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", padding: "40px" }}>
      <h1 className="text-center mb-5">Add New Event/Game 🏟</h1>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          style={{ backgroundColor: "#1e1e1e", padding: "30px", borderRadius: "10px" }}
        >
          {/* Event Name */}
          <div className="mb-3">
            <label className="form-label">Event/Game Name</label>
            <input
              type="text"
              className="form-control"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="e.g. Football Sunday Match"
              style={{ backgroundColor: "#2c2c2c", color: "#fff", border: "none" }}
              required
            />
          </div>

          {/* City & State */}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                style={{ backgroundColor: "#2c2c2c", color: "#fff", border: "none" }}
                required
              />
            </div>
            <div className="col">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                style={{ backgroundColor: "#2c2c2c", color: "#fff", border: "none" }}
                required
              />
            </div>
          </div>

          {/* Local Address */}
          <div className="mb-3">
            <label className="form-label">Local Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street, Area, Landmark"
              style={{ backgroundColor: "#2c2c2c", color: "#fff", border: "none" }}
              required
            />
          </div>

          {/* Sport & Players */}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Type of Sport</label>
              <select
                className="form-control"
                name="sportType"
                value={formData.sportType}
                onChange={handleChange}
                style={{ backgroundColor: "#2c2c2c", color: "#fff", border: "none" }}
              >
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
              <input
                type="number"
                className="form-control"
                name="playersRequired"
                value={formData.playersRequired}
                onChange={handleChange}
                placeholder="e.g. 10"
                style={{ backgroundColor: "#2c2c2c", color: "#fff", border: "none" }}
                required
              />
            </div>
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Preferred Gender</label>
            <select
              className="form-control"
              name="preferredGender"
              value={formData.preferredGender}
              onChange={handleChange}
              style={{ backgroundColor: "#2c2c2c", color: "#fff", border: "none" }}
            >
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
              <input
                type="date"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{ backgroundColor: "#2c2c2c", color: "#fff", border: "none" }}
                required
              />
            </div>
            <div className="col">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={{ backgroundColor: "#2c2c2c", color: "#fff", border: "none" }}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Additional Info / Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Write something about the event..."
              style={{ backgroundColor: "#2c2c2c", color: "#fff", border: "none" }}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-light w-100">
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
