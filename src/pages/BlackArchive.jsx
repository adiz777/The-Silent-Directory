import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameState } from "../hooks/useGameState.js";

const PASSPHRASES = {
  "FORTIS FORTUNA ADIUVAT": "Legion Archive",
  "EX DEO VICTORIA": "Sanctum Vault",
  "CRESCENTUM UMBRA": "Ghost Index",
};

export default function BlackArchive() {
  const navigate = useNavigate();
  const { coins, credibility, rank, award } = useGameState();
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(null);

  function handleUnlock(e) {
    e.preventDefault();
    const key = input.trim().toUpperCase();
    if (PASSPHRASES[key]) {
      setUnlocked(PASSPHRASES[key]);
      award({ coins: 3, cred: 8 });
    } else {
      setUnlocked("denied");
    }
    setInput("");
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "radial-gradient(circle at top, #111, #000)",
        color: "#0ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Courier New, monospace",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          width: "90%",
          border: "1px solid #0ff",
          borderRadius: "8px",
          padding: "16px",
          background: "rgba(0,0,0,0.9)",
        }}
      >
        <div style={{ fontSize: "11px", letterSpacing: "0.25em", marginBottom: "8px" }}>
          BLACK ARCHIVE // PASS-PHRASE GATE
        </div>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>CLASS OMEGA ARCHIVE</h1>

        <p style={{ fontSize: "12px", marginBottom: "12px" }}>
          Access to sealed dossiers requires a recognised oath. No menus. No reset.
          Either you know the words, or you don't belong here.
        </p>

        <form onSubmit={handleUnlock} style={{ marginBottom: "12px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter passphrase..."
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              background: "#000",
              border: "1px solid #0ff",
              color: "#0ff",
              borderRadius: "4px",
              fontFamily: "inherit",
              fontSize: "12px",
            }}
          />
          <button className="btn" type="submit" style={{ width: "100%", fontSize: "12px" }}>
            Attempt Access
          </button>
        </form>

        {unlocked && unlocked !== "denied" && (
          <div
            style={{
              border: "1px solid #0ff",
              borderRadius: "6px",
              padding: "10px",
              fontSize: "11px",
              background: "#020202",
              marginBottom: "10px",
            }}
          >
            <div style={{ color: "#0ff", marginBottom: "6px" }}>ACCESS GRANTED // {unlocked}</div>
            <p>
              Redacted dossiers unlocked. Reference layers:
              <br />
              – Ghost-level operators with no civilian footprint.
              <br />
              – Contracts that never hit the main ledger.
              <br />
              – Assets flagged "CLASS OMEGA" by the High Table.
            </p>
            <p style={{ marginTop: "6px" }}>
              You earned a quiet nod from the system. Coins and credibility have been updated.
            </p>
          </div>
        )}

        {unlocked === "denied" && (
          <div
            style={{
              border: "1px solid #f00",
              borderRadius: "6px",
              padding: "8px",
              fontSize: "11px",
              background: "#200",
              marginBottom: "10px",
            }}
          >
            ACCESS DENIED // The system does not recognise your words.
          </div>
        )}

        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Your Standing</div>
          <div style={{ fontSize: "11px" }}>
            Coins: {coins} | Credibility: {credibility} | Rank: {rank}
          </div>
        </div>

        <button
          className="btn ghost"
          onClick={() => navigate("/dashboard")}
          style={{ fontSize: "12px", width: "100%" }}
        >
          ← Return to Directory
        </button>
      </div>
    </div>
  );
}
