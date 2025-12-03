import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
  const { state: agent } = useLocation();
  const navigate = useNavigate();

  if (!agent) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          background: "#000",
          color: "#0ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>No Agent Data</h2>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "rgba(0,0,0,0.8)",
            border: "1px solid #0ff",
            color: "#0ff",
            borderRadius: "6px",
          }}
        >
          ← Return to Directory
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#000",
        color: "#0ff",
        padding: "40px",
        fontFamily: "monospace",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "30px", borderBottom: "1px solid #0ff", paddingBottom: "10px" }}>
        Agent Profile — {agent.codename}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          flex: 1,
        }}
      >
        <div>
          <p>
            <strong>Full Name:</strong> {agent.fullName}
          </p>
          <p>
            <strong>Codename:</strong> {agent.codename}
          </p>
          <p>
            <strong>Profession:</strong> {agent.profession}
          </p>
          <p>
            <strong>Agency:</strong> {agent.agency}
          </p>
          <p>
            <strong>Email:</strong> {agent.email}
          </p>
          <p>
            <strong>Phone:</strong> {agent.phone}
          </p>
        </div>
        <div>
          <p>
            <strong>Nationality:</strong> {agent.nationality}
          </p>
          <p>
            <strong>City:</strong> {agent.city}
          </p>
          <p>
            <strong>Address:</strong> {agent.address}
          </p>
          <p>
            <strong>Coordinates:</strong> {agent.lat?.toFixed(4)}, {agent.lng?.toFixed(4)}
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: "30px",
          padding: "12px 20px",
          alignSelf: "flex-start",
          background: "rgba(0,0,0,0.8)",
          border: "1px solid #0ff",
          color: "#0ff",
          borderRadius: "6px",
          fontSize: "1rem",
        }}
      >
        ← Return to Directory
      </button>
    </div>
  );
}
