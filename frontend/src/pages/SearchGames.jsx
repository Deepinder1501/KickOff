// src/Pages/SearchGames.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SearchGames() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ sport: "", gender: "", city: "" });
  const [sortBy, setSortBy] = useState("");
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Fetch all events
  useEffect(() => {
    fetch("/api/events/all", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, [token]);

  // Join game
  const handleJoinGame = async (eventId) => {
    if (!user.email) {
      toast.error("⚠️ You must be logged in to join games");
      return;
    }

    try {
      const response = await fetch(
        `/api/events/${eventId}/join?userEmail=${user.email}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update the joined event in state
        setEvents((prev) =>
          prev.map((ev) => (ev.id === data.event.id ? data.event : ev))
        );
        toast.success(data.notification); // ✅ show notification
      } else {
        toast.error(data.error || "Failed to join game");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Server error while joining game");
    }
  };

  // Filter + Sort logic
  const filteredEvents = events.filter((event) => {
    const values = [
      event.eventName,
      event.city,
      event.state,
      event.address,
      event.sportType,
      event.preferredGender,
      event.date,
      event.time,
    ].join(" ").toLowerCase();

    const matchesSearch = values.includes(searchTerm.toLowerCase());
    const matchesSport = filters.sport ? event.sportType === filters.sport : true;
    const matchesGender = filters.gender ? event.preferredGender === filters.gender : true;
    const matchesCity = filters.city ? event.city.toLowerCase() === filters.city.toLowerCase() : true;

    return matchesSearch && matchesSport && matchesGender && matchesCity;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "name") return a.eventName.localeCompare(b.eventName);
    if (sortBy === "date") return new Date(a.date) - new Date(b.date);
    if (sortBy === "players") return a.playersRequired - b.playersRequired;
    return 0;
  });

  const inputStyle = { backgroundColor: "#2c2c2c", color: "#fff", border: "none" };

  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", padding: "40px" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h1 className="text-center mb-5">Search & Join Games 🎮</h1>
      <div className="container">
        {/* Search & Sort Bar */}
        <div className="p-4 mb-4 d-flex align-items-center justify-content-between" style={{ backgroundColor: "#1e1e1e", borderRadius: "10px" }}>
          <div className="row g-3 w-100">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search by any field..."
                style={inputStyle}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select className="form-control" style={inputStyle} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="date">Date</option>
                <option value="players">Players Required</option>
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-outline-light w-100" onClick={() => setShowModal(true)}>⚙️ Filters</button>
            </div>
          </div>
        </div>

        {/* Event Cards */}
        <div className="row">
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => (
              <div key={event.id} className="col-md-4 mb-4">
                <div className="card h-100" style={{ backgroundColor: "#1e1e1e", color: "#fff", border: "none" }}>
                  <div className="card-body">
                    <h5 className="card-title">{event.eventName}</h5>
                    <p className="card-text">
                      <strong>📍 Location:</strong> {event.address}, {event.city}, {event.state}<br/>
                      <strong>🏅 Sport:</strong> {event.sportType}<br/>
                      <strong>👥 Players Needed:</strong> {event.playersRequired}<br/>
                      <strong>⚧ Gender:</strong> {event.preferredGender}<br/>
                      <strong>📅 Date:</strong> {event.date}<br/>
                      <strong>⏰ Time:</strong> {event.time}<br/>
                      <strong>📝 Description:</strong> {event.description}
                    </p>
                    <button
                      className="btn btn-light w-100"
                      onClick={() => handleJoinGame(event.id)}
                      disabled={event.playersRequired <= 0}
                    >
                      {event.playersRequired > 0 ? "Join Game" : "Full"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No games found. Try a different search.</p>
          )}
        </div>
      </div>

      {/* Filters Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: "#1e1e1e", color: "#fff" }}>
          <Modal.Title>Filter Games</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#121212", color: "#fff" }}>
          <div className="mb-3">
            <label>Sport</label>
            <select
              className="form-control"
              value={filters.sport}
              onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
              style={inputStyle}
            >
              <option value="">All</option>
              <option>Football</option>
              <option>Basketball</option>
              <option>Cricket</option>
              <option>Badminton</option>
              <option>Tennis</option>
              <option>Table Tennis</option>
            </select>
          </div>
          <div className="mb-3">
            <label>Gender</label>
            <select
              className="form-control"
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              style={inputStyle}
            >
              <option value="">All</option>
              <option>Any</option>
              <option>Male</option>
              <option>Female</option>
              <option>Mixed</option>
            </select>
          </div>
          <div className="mb-3">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              style={inputStyle}
              placeholder="Enter city name"
            />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#1e1e1e" }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="light" onClick={() => setShowModal(false)}>Apply Filters</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SearchGames;
