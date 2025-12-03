import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameState } from "../hooks/useGameState.js";

const CITIES = ["New York", "Osaka", "Casablanca", "Berlin", "Rome", "Marrakesh", "London", "Dubai"];
const ROOM_TYPES = ["Standard Floor", "Continental Suite", "High Table Level", "Sub-Basement Safe Room"];

export default function ContinentalCheckIn() {
  const navigate = useNavigate();
  const { coins, credibility, rank, award } = useGameState();
  const [alias, setAlias] = useState("");
  const [city, setCity] = useState(CITIES[0]);
  const [room, setRoom] = useState(ROOM_TYPES[0]);
  const [slip, setSlip] = useState(null);

  function handleCheckIn(e) {
    e.preventDefault();
    if (!alias.trim()) return;
    const ref = "CT-" + Math.floor(100000 + Math.random() * 899999);
    const concierge = [
      "Your room is ready. No business on Continental grounds.",
      "Welcome back. The usual arrangements have been preserved.",
      "We trust your stay will be… uneventful.",
      "Your marker history has been quietly noted, but not discussed.",
    ][Math.floor(Math.random() * 4)];

    const payload = { alias: alias.trim(), city, room, ref, concierge, ts: new Date().toLocaleString() };
    setSlip(payload);
    award({ coins: 2, cred: 4 });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(to bottom, #050505, #000)",
        color: "#f5d76e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          width: "100%",
          border: "1px solid #f5d76e",
          borderRadius: "10px",
          padding: "18px",
          background: "rgba(0,0,0,0.9)",
        }}
      >
        <div style={{ fontSize: "11px", letterSpacing: "0.3em", marginBottom: "10px" }}>
          THE CONTINENTAL // CHECK-IN REGISTRY
        </div>
        <h1 style={{ fontSize: "1.6rem", marginBottom: "12px" }}>GUEST ADMISSION LOG</h1>

        <form onSubmit={handleCheckIn} style={{ marginBottom: "12px", fontSize: "12px" }}>
          <div style={{ marginBottom: "8px" }}>
            <label>Operating alias</label>
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Name you use when the lights go low..."
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                background: "#000",
                border: "1px solid #f5d76e",
                color: "#f5d76e",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label>Continental branch</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                background: "#000",
                border: "1px solid #f5d76e",
                color: "#f5d76e",
                borderRadius: "4px",
              }}
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label>Room classification</label>
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                background: "#000",
                border: "1px solid #f5d76e",
                color: "#f5d76e",
                borderRadius: "4px",
              }}
            >
              {ROOM_TYPES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <button className="btn" type="submit" style={{ width: "100%", marginTop: "4px", fontSize: "12px" }}>
            Register Stay
          </button>
        </form>

        {slip && (
          <div
            style={{
              border: "1px dashed #f5d76e",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "12px",
              background: "rgba(10,10,5,0.9)",
              marginBottom: "10px",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>CONTINENTAL CONFIRMATION SLIP</div>
            <div>Guest: {slip.alias}</div>
            <div>Branch: {slip.city}</div>
            <div>Room: {slip.room}</div>
            <div>Ref: {slip.ref}</div>
            <div>Timestamp: {slip.ts}</div>
            <div style={{ marginTop: "6px", fontStyle: "italic" }}>"{slip.concierge}"</div>
          </div>
        )}

        <div style={{ fontSize: "11px", marginBottom: "10px" }}>
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
