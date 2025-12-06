import React from "react";

export default function Manual() {
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
          DIRECTORY OPERATOR MANUAL
        </h1>
        <p style={{ fontSize: "11px", opacity: 0.7 }}>
          Placeholder manual view. This will become the in-universe documentation:
          access levels, rules, sanctions and usage protocols for the Silent
          Directory.
        </p>
    </div>
  );
}
