import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1e1e1e",
        color: "#fff",
        padding: "40px 20px",
        marginTop: "0px",
      }}
    >
      {/* Social Links (external, so <a>) */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#fff", fontSize: "20px" }}>
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#fff", fontSize: "20px" }}>
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#fff", fontSize: "20px" }}>
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#fff", fontSize: "20px" }}>
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#fff", fontSize: "20px" }}>
          <i className="fab fa-github"></i>
        </a>
      </div>

      {/* Newsletter */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <p style={{ marginBottom: "10px", fontWeight: "500" }}>Sign up for our newsletter</p>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #555",
            backgroundColor: "#121212",
            color: "#fff",
            marginRight: "10px",
          }}
        />
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff4500",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Subscribe
        </button>
      </div>

      {/* Quick Links */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <div>
          <h5 style={{ color: "#ff4500" }}>Quick Links</h5>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link></li>
            <li><Link to="/searchgames" style={{ color: "#fff", textDecoration: "none" }}>Games</Link></li>
            <li><Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>About</Link></li>
            <li><Link to="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5 style={{ color: "#ff4500" }}>Support</h5>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/help" style={{ color: "#fff", textDecoration: "none" }}>Help</Link></li>
            <li><Link to="/faq" style={{ color: "#fff", textDecoration: "none" }}>FAQ</Link></li>
            <li><Link to="/privacy" style={{ color: "#fff", textDecoration: "none" }}>Privacy Policy</Link></li>
            <li><Link to="/terms" style={{ color: "#fff", textDecoration: "none" }}>Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ textAlign: "center", borderTop: "1px solid #333", paddingTop: "15px" }}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} KickOff. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
