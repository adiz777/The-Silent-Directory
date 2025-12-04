import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) {
      setError("The Directory does not open for strangers. Choose a name.");
      return;
    }

    try {
      window.localStorage.setItem("tsd_user", username.trim());
    } catch (err) {
      // ignore storage issues
    }

    setError("");
    navigate("/dashboard", {
      state: { username: username.trim() },
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background:
          "radial-gradient(circle at top, rgba(255,255,255,0.05), #000)",
        color: "var(--accent-color, #0ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Courier New, monospace",
        padding: "16px",
      }}
    >
      <div
        style={{
          maxWidth: "460px",
          width: "100%",
          background: "rgba(0,0,0,0.9)",
          borderRadius: "12px",
          border: "1px solid var(--border-color, #0ff)",
          boxShadow: "0 0 40px rgba(0,0,0,0.8)",
          padding: "20px 22px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            marginBottom: "10px",
            opacity: 0.8,
          }}
        >
          IDENTITY VERIFICATION // SILENT DIRECTORY
        </div>

        <h1
          style={{
            fontSize: "1.5rem",
            marginBottom: "8px",
          }}
        >
          Enter the Directory
        </h1>

        <p
          style={{
            fontSize: "11px",
            marginBottom: "12px",
            opacity: 0.8,
          }}
        >
          No usernames are checked. No passwords are stored. This gate is purely
          ceremonial — but the system still expects you to look like you
          belong.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor="username"
              style={{ fontSize: "11px", display: "block", marginBottom: "4px" }}
            >
              Operating alias
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="The name you use off the official record…"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid var(--border-color, #0ff)",
                background: "#000",
                color: "var(--accent-color, #0ff)",
                fontSize: "12px",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor="password"
              style={{ fontSize: "11px", display: "block", marginBottom: "4px" }}
            >
              Phrase of convenience
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Anything. This field exists purely for the drama."
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid var(--border-color, #0ff)",
                background: "#000",
                color: "var(--accent-color, #0ff)",
                fontSize: "12px",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                fontSize: "11px",
                color: "#ff5555",
                marginBottom: "8px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn"
            style={{
              width: "100%",
              marginTop: "4px",
              fontSize: "12px",
            }}
          >
            AUTHORISE ACCESS
          </button>
        </form>

        <p
          style={{
            fontSize: "10px",
            marginTop: "10px",
            opacity: 0.7,
          }}
        >
          This is a fictional system. Nothing is transmitted, nothing is stored
          remotely. But the aesthetic? That part is very real.
        </p>
      </div>
    </div>
  );
}
