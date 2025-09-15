import React from "react";

function About() {
  const cardStyle = {
    backgroundColor: "#2a2a2a",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    flex: "1",
    margin: "10px",
    minWidth: "280px",
    minHeight:"400px"
  };

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>About KickOff</h1>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* Card 1 - Mission */}
        <div style={cardStyle}>
          <h2>Our Mission 🎯</h2>
          <p style={{ fontSize: "26px", marginTop: "20px" }}>
            We aim to make sports and games more accessible by building a
            community where people can easily find events, connect with
            like-minded players, and stay active together.
          </p>
        </div>

        {/* Card 2*/}
        <div style={cardStyle}>
          <h2>Why Choose KickOff? 💡</h2>
          <ul style={{ marginTop: "20px", fontSize: "26px", lineHeight: "1.8" }}>
            <li>Easy to find local games and events near you</li>
            <li>Connect with people who share your passion</li>
            <li>Stay fit, active, and social</li>
            <li>Completely free and community-driven</li>
          </ul>
        </div>

        {/* Card 3  */}
        <div style={cardStyle}>
          <h2>Join Us Today 🚀</h2>
          <p style={{ fontSize: "26px", marginTop: "20px" }}>
            Whether you’re a beginner or a pro, there’s always a place for you
            at KickOff. Start exploring games in your city today and be part of
            the action!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
