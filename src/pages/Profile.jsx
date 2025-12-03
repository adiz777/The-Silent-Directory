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
          fontFamily: "monospace",
        }}
      >
        <h2>NO DOSSIER LOADED</h2>
        <p style={{ marginTop: "8px", marginBottom: "16px", color: "#888" }}>
          Access this screen only via an active agent profile.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "rgba(0,0,0,0.8)",
            border: "1px solid #0ff",
            color: "#0ff",
            borderRadius: "6px",
            cursor: "pointer",
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
        padding: "32px",
        fontFamily: "monospace",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          borderBottom: "1px solid #0ff",
          paddingBottom: "8px",
        }}
      >
        <div>
          <div style={{ fontSize: "11px", color: "#888", letterSpacing: "0.15em" }}>
            CONTINENTAL // DOSSIER
          </div>
          <h1 style={{ fontSize: "1.6rem", margin: 0 }}>
            {agent.codename || "UNREGISTERED AGENT"}
          </h1>
        </div>
        <div style={{ textAlign: "right", fontSize: "11px", color: "#aaa" }}>
          <div>AGENCY: {agent.agency || "UNMAPPED"}</div>
          <div>STATUS: ACTIVE</div>
          <div>ID: {agent.email || "NO-ID"}</div>
        </div>
      </div>

      {/* Main dossier layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "20px",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Left column: identity & contacts */}
        <div
          style={{
            border: "1px solid #0ff",
            borderRadius: "8px",
            padding: "16px",
            background:
              "radial-gradient(circle at top left, rgba(0,255,255,0.06), rgba(0,0,0,0.9))",
          }}
        >
          <div
            style={{
              marginBottom: "16px",
              paddingBottom: "8px",
              borderBottom: "1px dashed #0ff",
            }}
          >
            <div style={{ fontSize: "11px", color: "#888" }}>LEGAL IDENTITY</div>
            <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              {agent.fullName || "Name scrubbed"}
            </div>
            <div style={{ fontSize: "11px", color: "#aaa", marginTop: "4px" }}>
              {agent.profession || "Role obfuscated"}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#888" }}>NATIONALITY</div>
              <div>{agent.nationality || "Unknown"}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#888" }}>CITY</div>
              <div>{agent.city || "Unknown"}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#888" }}>LOCATION</div>
              <div>{agent.address || "Unlisted"}</div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#888" }}>COORDINATES</div>
              <div>
                {agent.lat?.toFixed
                  ? `${agent.lat.toFixed(4)}, ${agent.lng.toFixed(4)}`
                  : "No GPS trace"}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "16px",
              paddingTop: "8px",
              borderTop: "1px dashed #0ff",
              fontSize: "11px",
            }}
          >
            <div style={{ marginBottom: "4px", color: "#888" }}>CONTACT CHANNELS</div>
            <div>Email: {agent.email || "Route closed"}</div>
            <div>Phone: {agent.phone || "Scrubbed"}</div>
          </div>
        </div>

        {/* Right column: meta, tags, notes */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto auto 1fr",
            gap: "10px",
            minHeight: 0,
          }}
        >
          {/* Operational meta */}
          <div
            style={{
              border: "1px solid #0ff",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "11px",
              background: "rgba(0,0,0,0.9)",
            }}
          >
            <div style={{ color: "#888", marginBottom: "4px" }}>OPERATIONAL META</div>
            <div>Last known city: {agent.city || "Unknown"}</div>
            <div>Agency: {agent.agency || "Unaligned"}</div>
            <div>Access tier: GUEST HANDLER</div>
            <div>Noise profile: LOW</div>
          </div>

          {/* Tags / classifications */}
          <div
            style={{
              border: "1px solid #0ff",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "11px",
              background: "rgba(0,0,0,0.9)",
            }}
          >
            <div style={{ color: "#888", marginBottom: "4px" }}>TAGS & CLASSIFICATION</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              <span
                style={{
                  border: "1px solid #0ff",
                  borderRadius: "999px",
                  padding: "2px 8px",
                }}
              >
                FIELD OPERATIVE
              </span>
              <span
                style={{
                  border: "1px solid #0ff",
                  borderRadius: "999px",
                  padding: "2px 8px",
                }}
              >
                VERIFIED NODE
              </span>
              <span
                style={{
                  border: "1px solid #0ff",
                  borderRadius: "999px",
                  padding: "2px 8px",
                }}
              >
                CLEAN ROUTES
              </span>
              <span
                style={{
                  border: "1px solid #0ff",
                  borderRadius: "999px",
                  padding: "2px 8px",
                }}
              >
                LOW NOISE
              </span>
            </div>
          </div>

          {/* Notes window */}
          <div
            style={{
              border: "1px solid #0ff",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "11px",
              background:
                "radial-gradient(circle at bottom right, rgba(0,255,255,0.12), rgba(0,0,0,1))",
              overflowY: "auto",
            }}
          >
            <div style={{ color: "#888", marginBottom: "4px" }}>FIELD NOTES</div>
            <p style={{ lineHeight: 1.4 }}>
              This dossier reflects currently available records within the Silent Directory.
              Some routes, identities, and affiliations may be intentionally obscured.
              Cross-reference with live map traces and recent contracts before engagement.
            </p>
            <p style={{ lineHeight: 1.4 }}>
              Use of this information is governed by Continental protocol. Breach of
              confidentiality revokes all protections and markers associated with this profile.
            </p>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "11px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: "10px 18px",
              background: "rgba(0,0,0,0.9)",
              border: "1px solid #0ff",
              color: "#0ff",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Export Dossier (Print/PDF)
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "10px 18px",
              background: "rgba(0,0,0,0.9)",
              border: "1px solid #0ff",
              color: "#0ff",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ← Return to Directory
          </button>
        </div>
        <div style={{ color: "#555" }}>CONTINENTAL // EYES ONLY</div>
      </div>
    </div>
  );
}
