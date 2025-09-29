// src/Pages/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [showUsers, setShowUsers] = useState(true);
  const token = localStorage.getItem("token");

  const BASE_URL = "http://localhost:8080/api";

  // Generic fetch wrapper to handle auth errors
  const fetchWithAuth = async (url, options = {}) => {
    options.headers = {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    const res = await fetch(url, options);

    if (res.status === 401 || res.status === 403) {
      toast.error("Unauthorized or Forbidden. Please login again.");
      throw new Error(`Unauthorized or Forbidden: ${res.status}`);
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server error ${res.status}: ${text}`);
    }

    return res.json();
  };

  const fetchUsers = async () => {
    try {
      const data = await fetchWithAuth(`${BASE_URL}/users`);
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to fetch users");
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await fetchWithAuth(`${BASE_URL}/events/all`);
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const data = await fetchWithAuth(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((u) => u.id !== id));
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Cannot delete user. Admins only.");
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const data = await fetchWithAuth(`${BASE_URL}/events/${id}`, {
        method: "DELETE",
      });
      setEvents(events.filter((e) => e.id !== id));
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Cannot delete event. Admins only.");
    }
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
      <ToastContainer position="top-right" autoClose={5000} />
      <h1 className="text-center mb-5">Admin Panel ⚙️</h1>

      <div className="d-flex justify-content-center mb-4">
        <Button
          variant={showUsers ? "light" : "outline-light"}
          onClick={() => setShowUsers(true)}
          className="me-2"
        >
          Users
        </Button>
        <Button
          variant={!showUsers ? "light" : "outline-light"}
          onClick={() => setShowUsers(false)}
        >
          Events
        </Button>
      </div>

      {showUsers ? (
        <div className="row">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="col-md-4 mb-4">
                <div
                  className="card p-3"
                  style={{ backgroundColor: "#1e1e1e", color: "#fff" }}
                >
                  <h5>{user.name || `${user.firstname} ${user.lastname}`}</h5>
                  <p>{user.email}</p>
                  <Button
                    variant="danger"
                    onClick={() => deleteUser(user.id)}
                    className="w-100"
                  >
                    Delete User
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No users found</p>
          )}
        </div>
      ) : (
        <div className="row">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="col-md-4 mb-4">
                <div
                  className="card p-3"
                  style={{ backgroundColor: "#1e1e1e", color: "#fff" }}
                >
                  <h5>{event.eventName}</h5>
                  <p>
                    {event.city}, {event.state}
                  </p>
                  <Button
                    variant="danger"
                    onClick={() => deleteEvent(event.id)}
                    className="w-100"
                  >
                    Delete Event
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No events found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
