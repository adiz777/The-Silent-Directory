import React from "react";
import { useWorld } from "../../context/WorldContext.jsx";

export default function Anomalies() {
  const { anomalies } = useWorld();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "16px",
        background: "#000",
        color: "var(--accent-color, #0ff)",
        fontFamily: "Courier New, monospace",
      }}
    >
      <h1 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>
        ANOMALY GRID // RED-FLAG EVENTS
      </h1>
      <p
        style={{
          fontSize: "11px",
          opacity: 0.7,
          marginBottom: "16px",
        }}
      >
        High-impact irregularities: identity collisions, ledger mismatches,
        safehouse wipes, city lockdowns, and deep-red signals.
      </p>

      {anomalies.length === 0 ? (
        <p style={{ fontSize: "12px", opacity: 0.7 }}>
          No anomalies registered yet. Either the world is calm or the sensors
          are lying.
        </p>
      ) : (
        <div
          style={{
            border: "1px solid var(--border-color, #0ff)",
            borderRadius: "8px",
            padding: "8px",
            maxHeight: "70vh",
            overflowY: "auto",
            background: "rgba(0,0,0,0.7)",
          }}
        >
          {anomalies.map((a, idx) => (
            <div
              key={a.id ?? idx}
              style={{
                padding: "8px",
                borderBottom:
                  idx === anomalies.length - 1
                    ? "none"
                    : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    opacity: 0.8,
                  }}
                >
                  {a.type || "unknown"}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    opacity: 0.8,
                  }}
                >
                  Severity:{" "}
                  <strong>{a.severity || "Unclassified"}</strong>
                </span>
              </div>
              <div style={{ fontSize: "12px" }}>
                {a.description || "No description provided."}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
