import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // Default restaurant-style assets (replace later)
  const videoSrc =
    "background1.mp4"; // free HD stock loop
  const fallbackImage =
    "https://images.unsplash.com/photo-1543357480-?auto=format&fit=crop&w=1500&q=80";

  const styles = {
    hero: {
      position: "relative",
      width: "100%",
      minHeight: "75vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      color: "#fff",
      fontFamily: "Inter, Poppins, sans-serif"
    },
    video: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: "translate(-50%, -50%)",
      zIndex: 0,
      filter: "brightness(0.55) contrast(1.05) saturate(1.1)"
    },
    fallback: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
      filter: "brightness(0.55) contrast(1.05) saturate(1.1)"
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      zIndex: 1
    },
    contentWrap: {
      position: "relative",
      zIndex: 2,
      padding: "40px 20px",
      maxWidth: 900,
      textAlign: "center",
      animation: "fadeIn 1s ease-out"
    },
    cardBox: {
      background: "rgba(255,255,255,0.06)",
      padding: 24,
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.15)",
      backdropFilter: "blur(8px)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.35)"
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: 800,
      marginBottom: 12,
      textShadow: "0 4px 20px rgba(0,0,0,0.5)"
    },
    lead: {
      fontSize: "1.15rem",
      marginBottom: 26,
      color: "rgba(255,255,255,0.95)"
    },
    btnGroup: {
      display: "flex",
      justifyContent: "center",
      gap: 14,
      flexWrap: "wrap"
    }
  };

  return (
    <div style={styles.hero} aria-label="Premium Restaurant Banner">
      {/* Background Video */}
      <video
        style={styles.video}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <img src={fallbackImage} style={styles.fallback} alt="" aria-hidden="true" />
      </video>

      {/* Overlay */}
      <div style={styles.overlay} aria-hidden="true" />

      {/* Foreground Content */}
      <div style={styles.contentWrap}>
        <div style={styles.cardBox}>
          <h1 style={styles.heading}>Welcome to Food Menu</h1>
          <p style={styles.lead}>
            Explore delicious Veg, Non-Veg, and Milk products crafted with love.
          </p>

          <div style={styles.btnGroup}>
            <Link to="/veg" className="btn btn-lg btn-outline-light">
              Veg Items
            </Link>
            <Link to="/nonveg" className="btn btn-lg btn-outline-light">
              Non-Veg
            </Link>
            <Link to="/milk" className="btn btn-lg btn-outline-light">
              Milk Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
