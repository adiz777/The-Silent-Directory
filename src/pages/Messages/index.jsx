import React from "react";
import { useWorld } from "../../context/WorldContext.jsx";

export default function Messages() {
  const { whispers, alias } = useWorld();

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
        SIGNAL FEED // WHISPERS & TRAFFIC
      </h1>
      <p
        style={{
          fontSize: "11px",
          opacity: 0.7,
          marginBottom: "16px",
        }}
      >
        Live intake of low-level signals, rumours, ledger notes, and quiet
        warnings. Linked to engines, not to truth.
        <br />
        Current operator: <strong>{alias}</strong>
      </p>

      {whispers.length === 0 ? (
        <p style={{ fontSize: "12px", opacity: 0.7 }}>
          No signals yet. The Directory is listening. Give it a few seconds…
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
          {whispers.map((w, idx) => (
            <div
              key={w.id ?? idx}
              style={{
                padding: "8px",
                borderBottom:
                  idx === whispers.length - 1
                    ? "none"
                    : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  opacity: 0.7,
                  marginBottom: "2px",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                }}
              >
                {w.category || "general"}
              </div>
              <div style={{ fontSize: "12px" }}>{w.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
