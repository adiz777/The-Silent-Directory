import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { state } = useLocation(); // agent data passed via state

  if (!state) {
    return (
      <div style={{ padding: "40px", color: "#0ff", fontFamily: "Courier New" }}>
        <h2>No profile loaded</h2>
        <button className="btn" onClick={() => navigate("/dashboard")}>
          Back to Directory
        </button>
      </div>
    );
  }

  const agent = state;

  return (
    <div
      style={{
        height: "100vh",
        background: "#000",
        color: "#0ff",
        fontFamily: "Courier New, monospace",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Agent Profile — {agent.codename}</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div className="panel">
          <p><strong>Full Name:</strong> {agent.fullName}</p>
          <p><strong>Codename:</strong> {agent.codename}</p>
          <p><strong>Profession:</strong> {agent.profession}</p>
          <p><strong>Agency:</strong> {agent.agency}</p>
        </div>

        <div className="panel">
          <p><strong>Nationality:</strong> {agent.nationality}</p>
          <p><strong>City:</strong> {agent.city}</p>
          <p><strong>Address:</strong> {agent.address}</p>
        </div>

        <div className="panel">
          <p><strong>Email:</strong> {agent.email}</p>
          <p><strong>Phone:</strong> {agent.phone}</p>
        </div>
      </div>

      <button
        className="btn"
        style={{ marginTop: "30px" }}
        onClick={() => navigate("/dashboard")}
      >
        ← Return to Directory
      </button>
    </div>
  );
}
