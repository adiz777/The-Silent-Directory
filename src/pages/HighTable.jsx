import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HighTable() {
  const [logLines, setLogLines] = useState([
    "[BOOT] HIGH TABLE CONSOLE INITIALIZED.",
    "[AUTH] Continental network key accepted.",
    "[STATUS] All houses reporting in..."
  ]);
  const [contractText, setContractText] = useState("");
  const [coinBalance, setCoinBalance] = useState(7);
  const [markerCount, setMarkerCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setLogLines(prev => {
        const pool = [
          "[PING] Osaka Continental: line secure.",
          "[NOTICE] Adjudicator docket updated.",
          "[TRACE] New traffic detected through Berlin.",
          "[LEDGER] Marker registry synchronized.",
          "[COUNCIL] Vote called on open contract."
        ];
        const next = pool[Math.floor(Math.random() * pool.length)];
        const updated = [...prev, next];
        return updated.slice(-10);
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const sampleMembers = [
    { house: "New York Continental", status: "ACTIVE", head: "WINSTON", territory: "North America" },
    { house: "Osaka Continental", status: "ACTIVE", head: "SHIMAZU", territory: "Japan" },
    { house: "Morocco Continental", status: "ACTIVE", head: "SOPHIA", territory: "North Africa" },
    { house: "Berlin Continental", status: "ACTIVE", head: "KILLA", territory: "Germany" },
  ];

  const markerLedger = [
    { holder: "JOHN WICK", state: "FULFILLED", comment: "Blood marker closed." },
    { holder: "SOPHIA", state: "OUTSTANDING", comment: "Owed for desert extraction." },
    { holder: "UNKNOWN HAND", state: "DORMANT", comment: "No record in last decade." },
  ];

  const adjudications = [
    { subject: "EXCOMMUNICADO — UNSPECIFIED", status: "ENFORCED", note: "All services revoked." },
    { subject: "HOUSE BERLIN", status: "SANCTIONED", note: "Probationary oversight active." },
    { subject: "INDEPENDENT FIXERS", status: "MONITORED", note: "High noise operations." },
  ];

  const randomContracts = [
    "Silent extraction from compromised safehouse in Prague.",
    "Discreet retrieval of ledger from high-security vault in Zurich.",
    "Sweep operation on unsanctioned weapons cache in Marrakesh.",
    "Terminate open bounty leaking into civilian channels.",
  ];

  function generateContract() {
    const base = randomContracts[Math.floor(Math.random() * randomContracts.length)];
    const id = `${["MK","HV","GX"][Math.floor(Math.random() * 3)]}-${Math.floor(10 + Math.random() * 89)}`;
    setContractText(`CONTRACT ${id}: ${base}`);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#050000",
        color: "#f55",
        fontFamily: "monospace",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
          borderBottom: "1px solid #700",
          paddingBottom: "8px",
        }}
      >
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "0.18em" }}>THE HIGH TABLE</div>
          <h1 style={{ margin: 0, fontSize: "1.6rem" }}>COUNCIL CONSOLE</h1>
        </div>
        <div style={{ textAlign: "right", fontSize: "11px" }}>
          <div>Markers in circulation: {markerCount}</div>
          <div>Continental coins (visual): {coinBalance}</div>
          <div>Access tier: OBSERVER</div>
        </div>
      </div>

      {/* Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "16px",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Left: console + adjudications */}
        <div style={{ display: "grid", gridTemplateRows: "1.2fr 1fr", gap: "10px" }}>
          <div
            style={{
              border: "1px solid #700",
              borderRadius: "8px",
              padding: "10px",
              background: "radial-gradient(circle at top left, rgba(120,0,0,0.35), #050000)",
              overflowY: "auto",
            }}
          >
            <div style={{ fontSize: "11px", marginBottom: "4px" }}>COUNCIL FEED</div>
            {logLines.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>

          <div
            style={{
              border: "1px solid #700",
              borderRadius: "8px",
              padding: "10px",
              background: "#050000",
              fontSize: "11px",
            }}
          >
            <div style={{ fontSize: "11px", marginBottom: "4px" }}>ADJUDICATOR DOCKET</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {adjudications.map((a, idx) => (
                <li key={idx} style={{ marginBottom: "4px" }}>
                  <div>{a.subject}</div>
                  <div style={{ color: "#f77" }}>Status: {a.status}</div>
                  <div style={{ color: "#a77" }}>{a.note}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: registry + ledger + contract generator */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto auto 1fr",
            gap: "10px",
            minHeight: 0,
          }}
        >
          <div
            style={{
              border: "1px solid #700",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "11px",
              background: "#050000",
            }}
          >
            <div style={{ marginBottom: "4px" }}>CONTINENTAL REGISTRY</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>House</th>
                  <th style={{ textAlign: "left" }}>Head</th>
                  <th style={{ textAlign: "left" }}>Territory</th>
                  <th style={{ textAlign: "left" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleMembers.map((m, idx) => (
                  <tr key={idx}>
                    <td>{m.house}</td>
                    <td>{m.head}</td>
                    <td>{m.territory}</td>
                    <td>{m.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              border: "1px solid #700",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "11px",
              background: "#050000",
            }}
          >
            <div style={{ marginBottom: "4px" }}>MARKER LEDGER</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {markerLedger.map((m, idx) => (
                <li key={idx} style={{ marginBottom: "4px" }}>
                  <div>Holder: {m.holder}</div>
                  <div>State: {m.state}</div>
                  <div style={{ color: "#a77" }}>{m.comment}</div>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              border: "1px solid #700",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "11px",
              background:
                "radial-gradient(circle at bottom right, rgba(150,0,0,0.45), #050000)",
            }}
          >
            <div style={{ marginBottom: "4px" }}>CONTRACT GENERATOR</div>
            <button
              onClick={generateContract}
              style={{
                padding: "6px 10px",
                background: "#200",
                border: "1px solid #f55",
                color: "#fdd",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "8px",
              }}
            >
              Generate New Council Contract
            </button>
            <div style={{ minHeight: "40px" }}>
              {contractText || "No active contract generated."}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "11px",
          borderTop: "1px solid #700",
          paddingTop: "6px",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "8px 14px",
            background: "#050000",
            border: "1px solid #700",
            color: "#f88",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Return to Silent Directory
        </button>
        <div>HIGH TABLE OBSERVER ACCESS — VISUAL ONLY</div>
      </div>
    </div>
  );
}
