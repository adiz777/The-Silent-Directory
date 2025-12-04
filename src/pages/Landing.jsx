import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const variant = useMemo(() => {
    const options = ["continental", "high", "shadow"];
    return options[Math.floor(Math.random() * options.length)];
  }, []);

  useEffect(() => {
    const themes = {
      continental: { accent: "#f5d76e", bg: "#050301", border: "#f5d76e" },
      high: { accent: "#ff5555", bg: "#150000", border: "#ff5555" },
      shadow: { accent: "#0ff", bg: "#000010", border: "#0ff" },
    };
    const t = themes[variant] || themes.shadow;
    document.documentElement.style.setProperty("--accent-color", t.accent);
    document.documentElement.style.setProperty("--bg-color", t.bg);
    document.documentElement.style.setProperty("--border-color", t.border);
  }, [variant]);

  function enter() {
    navigate("/login");
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "radial-gradient(circle at top, rgba(255,255,255,0.03), #000)",
        color: "var(--accent-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Courier New, monospace",
        padding: "16px",
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") enter();
      }}
      tabIndex={0}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          textAlign: "center",
          padding: "24px",
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          background: "rgba(0,0,0,0.9)",
          boxShadow: "0 0 30px rgba(0,0,0,0.7)",
        }}
      >
        <div style={{ fontSize: "11px", letterSpacing: "0.25em", marginBottom: "10px", opacity: 0.8 }}>
          SILENT DIRECTORY // ACCESS GATE
        </div>
        <h1
          style={{
            fontSize: "1.8rem",
            marginBottom: "10px",
            textShadow: "0 0 8px rgba(0,0,0,0.8)",
          }}
        >
          THE SILENT DIRECTORY
        </h1>
        <p style={{ fontSize: "12px", marginBottom: "10px", opacity: 0.85 }}>
          Off-ledger contacts. Unlisted operators. No official affiliation.
          <br />
          If you&apos;re seeing this, you were never meant to… and yet, here we are.
        </p>
        <p style={{ fontSize: "11px", marginBottom: "16px", opacity: 0.7 }}>
          Variant loaded: <strong>{variant.toUpperCase()}</strong> // Palette seeded for this session.
        </p>
        <button
          onClick={enter}
          className="btn"
          style={{ padding: "10px 22px", fontSize: "12px" }}
        >
          ENTER DIRECTORY
        </button>
        <p style={{ fontSize: "10px", marginTop: "10px", opacity: 0.7 }}>
          Press ENTER to continue. No markers required… this time.
        </p>
      </div>
    </div>
  );
}
