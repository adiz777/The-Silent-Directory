import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Idle — ready.");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setStatus("Initializing secure channel...");
    await wait(1000 + Math.random() * 500);

    setStatus("Authenticating node...");
    await wait(1000);

    // always accept
    localStorage.setItem("tsd_user", username || "Agent");
    setStatus("Access granted. Routing to directory…");
    await wait(800);

    navigate("/dashboard");
  };

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#0ff",
        fontFamily: "Courier New, monospace",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.65)",
          padding: "30px",
          borderRadius: "10px",
          border: "1px solid rgba(0,255,255,0.1)",
          boxShadow: "0 0 20px rgba(0,255,255,0.1)",
          width: "320px",
        }}
      >
        <h2
          className="glitch"
          data-text="THE SILENT DIRECTORY"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          THE SILENT DIRECTORY
        </h2>

        <form onSubmit={handleLogin}>
          <label style={{ fontSize: "13px" }}>Codename / Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", marginBottom: "12px" }}
            required
          />

          <label style={{ fontSize: "13px" }}>Access Key</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: "12px" }}
          />

          <button type="submit" className="btn" style={{ width: "100%" }}>
            Enter Network
          </button>
        </form>

        <div style={{ fontSize: "12px", color: "#888", marginTop: "14px" }}>
          Status: {status}
        </div>
      </div>
    </div>
  );
}
