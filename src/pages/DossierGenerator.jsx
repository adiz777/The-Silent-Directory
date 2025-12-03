import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameState } from "../hooks/useGameState.js";

const FIRST_NAMES = ["Adrian", "Rhea", "Kade", "Elara", "Silas", "Nova", "Dante", "Mira", "Orion", "Lyra"];
const LAST_NAMES = ["Voss", "Kane", "Rook", "Sterling", "Cross", "Kepler", "Vale", "Stone", "Mercer", "Locke"];
const BACKGROUNDS = [
  "Former corporate security chief gone fully off-ledger.",
  "Ex-intelligence handler who never formally resigned.",
  "Smuggler who specialises in moving people, not goods.",
  "Ghost from a shuttered black program that never officially existed.",
  "Disavowed analyst who memorised too many secrets.",
  "Field medic from conflict zones who stopped asking who was paying.",
];
const SKILLS = [
  "Social engineering", "OSINT sweeps", "Close-quarters extraction", "Silent logistics", "Digital erasure", "Asset recovery",
  "Multi-city safehouse orchestration", "Signals intelligence", "Non-lethal disabling", "High-velocity negotiations",
];
const WEAPONS = [
  "Suppressed sidearms only", "No ballistic weapons — prefers distance and misdirection",
  "Compact SMG with subsonic loads", "Custom shotgun loaded with breaching rounds",
  "Fiberglass blades that do not show on scanners", "Improvised devices and contingencies only",
];
const AFFILIATIONS = [
  "Unofficially tolerated by the Continental network.",
  "Blacklisted on paper, useful in practice.",
  "Quietly registered under a different name.",
  "Recognised asset by at least one High Table house.",
  "Independent, operating on favours instead of contracts.",
];

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateDossier() {
  const fullName = randomFrom(FIRST_NAMES) + " " + randomFrom(LAST_NAMES);
  const codename = [
    "THE",
    randomFrom(["GHOST", "SPECTER", "EMBER", "LOTUS", "VIPER", "ONYX", "RAVEN", "FROST"]),
    randomFrom(["FOX", "KING", "QUEEN", "HAND", "BLADE", "RIDER", "CIPHER", "VEIL"]),
    String(Math.floor(10 + Math.random() * 89)),
  ].join(" ");
  return {
    fullName,
    codename,
    background: randomFrom(BACKGROUNDS),
    skills: Array.from({ length: 3 }, () => randomFrom(SKILLS)),
    weapons: randomFrom(WEAPONS),
    affiliation: randomFrom(AFFILIATIONS),
    lastMission: randomFrom([
      "Silent extraction from a compromised hotel floor.",
      "Erasure of paper trails across three jurisdictions.",
      "Negotiated ceasefire between crews without firing a shot.",
      "Secured exit corridor for an excommunicado asset.",
      "Recovered a ledger that should never have been digitised.",
    ]),
    rating: Math.floor(60 + Math.random() * 40),
  };
}

export default function DossierGenerator() {
  const navigate = useNavigate();
  const { coins, credibility, rank, award } = useGameState();
  const [dossier, setDossier] = useState(generateDossier);

  function handleGenerate() {
    const next = generateDossier();
    setDossier(next);
    award({ coins: 1, cred: 2 });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "radial-gradient(circle at top, #050505, #000)",
        color: "#0ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        fontFamily: "Courier New, monospace",
      }}
    >
      <div
        style={{
          maxWidth: "780px",
          width: "100%",
          border: "1px solid #0ff",
          borderRadius: "8px",
          padding: "16px",
          background: "rgba(0,0,0,0.9)",
        }}
      >
        <div style={{ fontSize: "11px", letterSpacing: "0.25em", marginBottom: "8px" }}>
          ON-DEMAND DOSSIER FABRICATION
        </div>
        <h1 style={{ fontSize: "1.4rem", marginBottom: "10px" }}>GHOST PROFILE GENERATOR</h1>

        <p style={{ fontSize: "12px", marginBottom: "10px" }}>
          Every click spins up a complete, cinematic dossier for a fictional operator:
          identity, skills, weapons, last job and informal standing with the network.
        </p>

        <div
          style={{
            border: "1px solid #0ff",
            borderRadius: "6px",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "12px",
            background: "#020202",
          }}
        >
          <div style={{ fontSize: "11px", color: "#0ff", marginBottom: "4px" }}>DOSSIER // {dossier.codename}</div>
          <div style={{ marginBottom: "6px" }}>
            <strong>Legal identity:</strong> {dossier.fullName}
          </div>
          <div style={{ marginBottom: "6px" }}>
            <strong>Background:</strong> {dossier.background}
          </div>
          <div style={{ marginBottom: "6px" }}>
            <strong>Skills:</strong>
            <ul style={{ marginLeft: "18px", marginTop: "4px" }}>
              {dossier.skills.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
          <div style={{ marginBottom: "6px" }}>
            <strong>Preferred weapons / approach:</strong> {dossier.weapons}
          </div>
          <div style={{ marginBottom: "6px" }}>
            <strong>Continental affiliation:</strong> {dossier.affiliation}
          </div>
          <div style={{ marginBottom: "6px" }}>
            <strong>Last documented mission:</strong> {dossier.lastMission}
          </div>
          <div>
            <strong>Network rating:</strong> {dossier.rating}/100
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "10px", fontSize: "11px" }}>
          <button className="btn" onClick={handleGenerate} style={{ flex: 1 }}>
            Generate New Dossier
          </button>
          <button className="btn ghost" onClick={() => navigate("/dashboard")} style={{ flex: 1 }}>
            ← Return to Directory
          </button>
        </div>

        <div style={{ fontSize: "11px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Your Standing</div>
          <div>
            Coins: {coins} | Credibility: {credibility} | Rank: {rank}
          </div>
        </div>
      </div>
    </div>
  );
}
