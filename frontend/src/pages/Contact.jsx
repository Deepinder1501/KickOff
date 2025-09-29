// src/Pages/Contact.jsx
import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // JWT token (optional)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!form.firstName || !form.email || !form.message) {
      alert("Please fill in at least First Name, Email, and Message.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}), // optional JWT
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.text();
      alert(result || "✅ Message sent successfully!");

      // ✅ Clear form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (err) {
      console.error("Error sending message:", err);
      alert("❌ Error sending message. Please try again later.");
    } finally {
      setLoading(false);
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
      <h1 className="text-center mb-5">Contact Us</h1>
      <div className="container">
        <div className="row">
          {/* Left Side - Contact Form */}
          <div className="col-md-7">
            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: "#1e1e1e",
                padding: "30px",
                borderRadius: "10px",
              }}
            >
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="form-control custom-input"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="form-control custom-input"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control custom-input"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="form-control custom-input"
                  placeholder="Phone Number"
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="form-control custom-input"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-light w-100"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right Side - Info */}
          <div className="col-md-5 d-flex flex-column justify-content-center">
            <div style={{ padding: "20px" }}>
              <h3>Our Info</h3>
              <p>📍 City: Rajpura, India</p>
              <p>📞 Phone: +91 9501679224</p>
              <p>✉️ Email: contact@kickoff.com</p>
              <p>
                KickOff is your go-to platform to discover, join, and organize
                local games and events. Connect with players and communities
                around you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
