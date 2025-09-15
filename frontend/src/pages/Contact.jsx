import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.text();
    alert(result);
  };

  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", padding: "40px" }}>
      <h1 className="text-center mb-5">Contact Us</h1>
      <div className="container">
        <div className="row">
          {/* Left Side */}
          <div className="col-md-7">
            <form onSubmit={handleSubmit} style={{ backgroundColor: "#1e1e1e", padding: "30px", borderRadius: "10px" }}>
              <div className="row mb-3">
                <div className="col">
                  <input type="text" name="firstName" value={form.firstName} onChange={handleChange}
                    className="form-control custom-input" placeholder="First Name" />
                </div>
                <div className="col">
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange}
                    className="form-control custom-input" placeholder="Last Name" />
                </div>
              </div>
              <div className="mb-3">
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  className="form-control custom-input" placeholder="Email" />
              </div>
              <div className="mb-3">
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  className="form-control custom-input" placeholder="Phone Number" />
              </div>
              <div className="mb-3">
                <textarea name="message" value={form.message} onChange={handleChange}
                  className="form-control custom-input" rows="4" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="btn btn-light w-100">Send Message</button>
            </form>
          </div>

          {/* */}
          <div className="col-md-5 d-flex flex-column justify-content-center">
            <div style={{ padding: "20px" }}>
              <h3>Our Info</h3>
              <p>📍 City: Rajpura, India</p>
              <p>📞 Phone: +91 9501679224</p>
              <p>✉️ Email: contact@kickoff.com</p>
              <p> KickOff is your go-to platform to discover, join, and organize local games and events. We’re here to help you connect with players and communities around you. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
