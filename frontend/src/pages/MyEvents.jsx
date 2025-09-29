// src/Pages/MyEvents.jsx
import React, { useEffect, useState } from "react";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");

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

  const handleEdit = async (event) => {
    const updatedName = prompt("Edit event name:", event.eventName);
    if (!updatedName) return;

    const updatedEvent = { ...event, eventName: updatedName };

    try {
      const res = await fetch(`/api/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(updatedEvent)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      setEvents(events.map(e => e.id === data.id ? data : e));
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
              <button className="btn btn-danger me-2" onClick={() => handleDelete(event.id)}>Delete</button>
              <button className="btn btn-light" onClick={() => handleEdit(event)}>Edit</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyEvents;
