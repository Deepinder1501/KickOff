import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function SearchGames() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    sport: "",
    gender: "",
    city: "",
  });
  const [sortBy, setSortBy] = useState("");
  const [showModal, setShowModal] = useState(false);

  //  Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/events/all")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Handle Join Game
  const handleJoinGame = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/${eventId}/join`, {
        method: "POST",
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        // update local state with updated event
        setEvents((prevEvents) =>
          prevEvents.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
        );
        alert("✅ You joined the game!");
      } else {
        alert("❌ Failed to join game. Try again.");
      }
    } catch (error) {
      console.error("Error joining game:", error);
      alert("⚠️ Server error while joining game");
    }
  };

  // Filter + Search
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
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = values.includes(searchTerm.toLowerCase());
    const matchesSport = filters.sport ? event.sportType === filters.sport : true;
    const matchesGender = filters.gender ? event.preferredGender === filters.gender : true;
    const matchesCity = filters.city
      ? event.city.toLowerCase() === filters.city.toLowerCase()
      : true;

    return matchesSearch && matchesSport && matchesGender && matchesCity;
  });

  // Sorting
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "name") return a.eventName.localeCompare(b.eventName);
    if (sortBy === "date") return new Date(a.date) - new Date(b.date);
    if (sortBy === "players") return a.playersRequired - b.playersRequired;
    return 0;
  });

  // Shared input style
  const inputStyle = {
    backgroundColor: "#2c2c2c",
    color: "#fff",
    border: "none",
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
      <h1 className="text-center mb-5">Search & Join Games 🎮</h1>
      <div className="container">
        {/* Search Bar + Filter Button */}
        <div
          className="p-4 mb-4 d-flex align-items-center justify-content-between"
          style={{ backgroundColor: "#1e1e1e", borderRadius: "10px" }}
        >
          <div className="row g-3 w-100">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search by any field (city, sport, name...)"
                style={inputStyle}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-control"
                style={inputStyle}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="date">Date</option>
                <option value="players">Players Required</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-light w-100"
                onClick={() => setShowModal(true)}
              >
                ⚙️ Filters
              </button>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="row">
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => (
              <div key={event.id} className="col-md-4 mb-4">
                <div
                  className="card h-100"
                  style={{ backgroundColor: "#1e1e1e", color: "#fff", border: "none" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{event.eventName}</h5>
                    <p className="card-text">
                      <strong>📍 Location:</strong> {event.address}, {event.city}, {event.state}
                      <br />
                      <strong>🏅 Sport:</strong> {event.sportType}
                      <br />
                      <strong>👥 Players Needed:</strong> {event.playersRequired}
                      <br />
                      <strong>⚧ Gender:</strong> {event.preferredGender}
                      <br />
                      <strong>📅 Date:</strong> {event.date}
                      <br />
                      <strong>⏰ Time:</strong> {event.time}
                      <br />
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

      {/* Filter  */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: "#1e1e1e", color: "#fff" }}>
          <Modal.Title>Filter Games     </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#121212", color: "#fff" }}>
          <div className="mb-3">
            <label className="form-label">Sport</label>
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
            <label className="form-label">Gender</label>
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
            <label className="form-label">City</label>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="light" onClick={() => setShowModal(false)}>
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SearchGames;
