import React, { useEffect, useState } from "react";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [token] = useState(localStorage.getItem("token"));

  // For modal
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetch("/api/events/my-events", { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setEvents(events.filter(e => e.id !== id));
        alert("Event deleted ✅");
      } else {
        const errorText = await res.text();
        alert("Delete failed ❌: " + errorText);
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  // Open modal with event details
  const openEditModal = (event) => {
    setSelectedEvent({ ...event });
    setShowModal(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent(prev => ({
      ...prev,
      [name]: name === "playersRequired" ? parseInt(value) : value
    }));
  };

  // Save updated event
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/events/${selectedEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(selectedEvent)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      setEvents(events.map(e => e.id === data.id ? data : e));
      setShowModal(false);
      alert("Event updated ✅");
    } catch (err) {
      console.error(err);
      alert("Update failed ❌: " + err.message);
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#121212", minHeight: "100vh", color: "#fff" }}>
      <h1 className="mb-4 text-center">My Events</h1>
      <div className="container">
        {events.length === 0 ? (
          <p>No events created yet.</p>
        ) : (
          events.map(event => (
            <div key={event.id} style={{ backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
              <h4>{event.eventName}</h4>
              <p>{event.sportType} | {event.city}, {event.state}</p>
              <p>Players Needed: {event.playersRequired} | Gender: {event.preferredGender}</p>
              <p>Date: {event.date} | Time: {event.time}</p>
              <p>{event.description}</p>
              <button
                className="btn me-2"
                style={{ backgroundColor: "#ff4500", color: "#fff", border: "none" }}
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </button>
              <button
                className="btn"
                style={{ backgroundColor: "#ff4500", color: "#fff", border: "none" }}
                onClick={() => openEditModal(event)}
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {showModal && selectedEvent && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Edit Event</h5>
                <button type="button" className="btn-close" style={{ filter: 'invert(1)' }} onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {["eventName","city","state","address","sportType","playersRequired","preferredGender","date","time","description"].map(field => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">{field.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      type={field === "playersRequired" ? "number" : "text"}
                      className="form-control"
                      name={field}
                      value={selectedEvent[field] || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#ff4500", color: "#fff", border: "none" }}
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyEvents;
