import { Link } from "react-router-dom";
import { useState } from "react";

import football from "../assets/football1.jpg";
import cricket from "../assets/cricket.jpeg";
import basketball from "../assets/basketball.jpg";
import hockey from "../assets/hockey.jpg";

function Home() {
  // Carousel images
  const images = [football, cricket, basketball, hockey];

  const [current, setCurrent] = useState(0);

  // Example game cards
  const discoverGames = [
    { id: 1, name: "Street Football", location: "Delhi", date: "2025-09-12" },
    { id: 2, name: "Cricket Tournament", location: "Mumbai", date: "2025-09-15" },
    { id: 3, name: "Badminton Doubles", location: "Pune", date: "2025-09-20" },
  ];

  // Example popular sports cards
  const sports = [
    { name: "Football", img: football },
    { name: "Basketball", img: basketball },
    { name: "Cricket", img: cricket },
    { name: "Hockey", img: hockey },
  ];

  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Welcome to KickOff 🏆</h1>
      <p style={{ textAlign: "center", fontSize: "18px", marginBottom: "30px" }}>
        Find and join local games near you!
      </p>

      {/* Carousel */}
      <div
        style={{
          position: "relative",
          width: "100%",
          margin: "0 auto 50px",
          overflow: "hidden",
        }}
      >
        <img
          src={images[current]}
          alt="carousel"
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
          }}
        />

        {/* Left Arrow */}
        <button
          onClick={() => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          style={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "2rem",
            cursor: "pointer",
          }}
        >

        </button>


        <button
          onClick={() => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "2rem",
            cursor: "pointer",
          }}
        >
          ›
        </button>
      </div>


      <h2 style={{ marginBottom: "20px" }}>Discover Games 🎮</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {discoverGames.map((game) => (
          <div
            key={game.id}
            style={{
              backgroundColor: "#1e1e1e",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3>{game.name}</h3>
            <p>{game.location}</p>
            <p style={{ color: "#ff4500" }}>{game.date}</p>
            <Link
              to={`/SearchGames`}
              style={{
                textDecoration: "none",
                backgroundColor: "#ff4500",
                padding: "10px 15px",
                borderRadius: "6px",
                color: "#fff",
                display: "inline-block",
                marginTop: "10px",
              }}
            >
              Join Now
            </Link>
          </div>
        ))}
      </div>

      {/* Popular Sports */}
      <h2 style={{ marginTop: "50px", marginBottom: "20px" }}>Popular Sports 🏀</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {sports.map((sport, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: "12px",
              overflow: "hidden",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={sport.img}
              alt={sport.name}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <h3 style={{ padding: "15px 0" }}>{sport.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
