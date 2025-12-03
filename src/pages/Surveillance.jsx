import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameState } from "../hooks/useGameState.js";

const CAMERAS = [
  "CAM-01 // ROOFTOP ACCESS",
  "CAM-12 // LOBBY VESTIBULE",
  "CAM-24 // SERVICE CORRIDOR",
  "CAM-33 // PARKING LEVEL -2",
  "CAM-41 // FREIGHT ELEVATOR",
  "CAM-56 // SIDE ENTRANCE",
];

const FEED_LINES = [
  "Silhouette detected — no open contracts.",
  "Thermal spike near delivery bay, dismissed as engine heat.",
  "Facial match: guest on file, marker-neutral.",
  "Interference on external channel, origin unknown.",
  "Unscheduled movement in staff-only hallway.",
  "Camera desync for 0.8s — logged for review.",
];

export default function Surveillance() {
  const navigate = useNavigate();
  const { coins, credibility, rank, award } = useGameState();
  const [camera, setCamera] = useState(CAMERAS[0]);
  const [lines, setLines] = useState([]);
  const [signalLost, setSignalLost] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCamera(CAMERAS[Math.floor(Math.random() * CAMERAS.length)]);
      setLines((prev) => {
        const next = FEED_LINES[Math.floor(Math.random() * FEED_LINES.length)];
        const merged = [...prev, next];
        return merged.slice(-6);
      });
      setSignalLost(Math.random() < 0.15);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  function handleAcknowledge() {
    award({ coins: 1, cred: 1 });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "radial-gradient(circle at top, #02040a, #000)",
        color: "#0ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        fontFamily: "Courier New, monospace",
      }}
    >
      <div
        style={{
          maxWidth: "840px",
          width: "100%",
          border: "1px solid #0ff",
          borderRadius: "8px",
          padding: "16px",
          background: "rgba(0,0,0,0.9)",
        }}
      >
        <div style={{ fontSize: "11px", letterSpacing: "0.25em", marginBottom: "8px" }}>
          PASSIVE SURVEILLANCE GRID
        </div>
        <h1 style={{ fontSize: "1.4rem", marginBottom: "10px" }}>CCTV MIRROR FEED</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "12px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              border: "1px solid #0ff",
              borderRadius: "6px",
              padding: "10px",
              background:
                "repeating-linear-gradient(0deg, #020711 0, #020711 2px, #01030a 2px, #01030a 4px)",
            }}
          >
            <div style={{ fontSize: "11px", marginBottom: "6px", color: "#0ff" }}>{camera}</div>
            <div
              style={{
                height: "200px",
                borderRadius: "6px",
                border: "1px solid #0ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                background: signalLost ? "#200" : "rgba(0,0,0,0.8)",
              }}
            >
              {signalLost ? "SIGNAL LOST // WAITING FOR RETURN FEED" : "LIVE FEED SIMULATION — NO REAL VIDEO"}
            </div>
          </div>

          <div
            style={{
              border: "1px solid #0ff",
              borderRadius: "6px",
              padding: "10px",
              background: "#020202",
              fontSize: "11px",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Events Log</div>
            <div style={{ maxHeight: "190px", overflowY: "auto" }}>
              {lines.map((ln, idx) => (
                <div key={idx}>• {ln}</div>
              ))}
            </div>
            <button
              className="btn"
              onClick={handleAcknowledge}
              style={{ width: "100%", marginTop: "8px", fontSize: "11px" }}
            >
              Acknowledge Feed & Continue
            </button>
          </div>
        </div>

        <div style={{ fontSize: "11px", marginBottom: "8px" }}>
          Standing — Coins: {coins} | Credibility: {credibility} | Rank: {rank}
        </div>

        <button
          className="btn ghost"
          onClick={() => navigate("/dashboard")}
          style={{ width: "100%", fontSize: "12px" }}
        >
          ← Return to Directory
        </button>
      </div>
    </div>
  );
}
