// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user on mount and listen for changes
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
        localStorage.removeItem("user"); // clean up bad data
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener("userChanged", loadUser);
    return () => {
      window.removeEventListener("userChanged", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);

    // Notify other components
    window.dispatchEvent(new Event("userChanged"));

    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#1e1e1e", padding: "10px 20px" }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand"
          style={{ color: "#ff4500", fontWeight: "bold" }}
        >
          KickOff 🏆
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ color: "#fff" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/addevent" className="nav-link" style={{ color: "#fff" }}>
                Add Game
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/searchgames" className="nav-link" style={{ color: "#fff" }}>
                Join Game
              </Link>
            </li>

            {user && (
              <li className="nav-item">
                <Link to="/my-events" className="nav-link" style={{ color: "#fff" }}>
                  My Events
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link to="/about" className="nav-link" style={{ color: "#fff" }}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" style={{ color: "#fff" }}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            {user ? (
              <>
                <span style={{ color: "#fff", marginRight: "15px" }}>
                  Hi, {user.firstname || user.name || "User"}
                </span>

                <Link to="/profile">
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#444",
                      color: "#fff",
                      border: "none",
                      marginRight: "10px",
                    }}
                  >
                    Profile
                  </button>
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn"
                  style={{
                    backgroundColor: "#ff4500",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button
                    className="btn"
                    style={{
                      color: "#fff",
                      backgroundColor: "transparent",
                      border: "1px solid #ff4500",
                      marginRight: "10px",
                    }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#ff4500",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
