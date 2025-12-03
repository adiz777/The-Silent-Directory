import React, { useEffect, useState } from "react";
import classifiedProfiles from "../data/classified.json";
import weapons from "../data/weapons.json";
import blacklist from "../data/blacklist.json";
import missions from "../data/missions.json";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { generateAgents } from "../utlis/generator.js"; // fixed typo 'utlis' → 'utils'

export default function Dashboard() {
  const [status, setStatus] = useState("Idle — ready.");
  const [theme, setTheme] = useState(localStorage.getItem("tsd_theme") || "shadow");

  useEffect(() => {
    const themes = {
      continental: { accent: "#f5d76e", bg: "#050301", border: "#f5d76e" },
      high: { accent: "#ff5555", bg: "#150000", border: "#ff5555" },
      shadow: { accent: "var(--accent-color)", bg: "#000010", border: "var(--accent-color)" },
    };
    const t = themes[theme] || themes.shadow;
    document.documentElement.style.setProperty("--accent-color", t.accent);
    document.documentElement.style.setProperty("--bg-color", t.bg);
    document.documentElement.style.setProperty("--border-color", t.border);
    localStorage.setItem("tsd_theme", theme);
  }, [theme]);

  const [query, setQuery] = useState("");
  const [agents, setAgents] = useState([]);
  const [map, setMap] = useState(null);
  const [heatLayer, setHeatLayer] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [heatMode, setHeatMode] = useState(false);


  const [pulse, setPulse] = useState({
    network: "ONLINE",
    activeNodes: 7,
    lastPingMs: 320,
    encryption: "AES-4096"
  });

  const [deadDropInput, setDeadDropInput] = useState("");
  const [deadDropLog, setDeadDropLog] = useState([]);

  const [terminalLines, setTerminalLines] = useState([
    "[ACCESS GRANTED]",
    "Routing through safe nodes...",
    "Directory sync complete."
  ]);

  const pageSize = 10;
  const [classifiedPage, setClassifiedPage] = useState(0);
  const [weaponsPage, setWeaponsPage] = useState(0);
  const [blacklistPage, setBlacklistPage] = useState(0);
  const [missionsPage, setMissionsPage] = useState(0);
  const [filterAgency, setFilterAgency] = useState("ALL");
  const [filterNationality, setFilterNationality] = useState("ALL");
  const [excommunicado, setExcommunicado] = useState(false);




  const safehouses = [
    { city: "London", status: "ACTIVE", rating: "Clean" },
    { city: "Berlin", status: "COLD", rating: "Compromised once" },
    { city: "Osaka", status: "UNKNOWN", rating: "No recent traffic" },
  ];


  const username = localStorage.getItem("tsd_user") || "Agent";
  const navigate = useNavigate();
  useEffect(() => {
    function handleKey(e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "h") {
        e.preventDefault();
        navigate("/high-table");
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "x") {
        e.preventDefault();
        setExcommunicado((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  useEffect(() => {
    const pulseTimer = setInterval(() => {
      setPulse((prev) => ({
        network: Math.random() < 0.05 ? "DEGRADED" : "ONLINE",
        activeNodes: 5 + Math.floor(Math.random() * 6),
        lastPingMs: 200 + Math.floor(Math.random() * 400),
        encryption: Math.random() < 0.3 ? "AES-4096" : "QUANTUM-LATTICE"
      }));

      setTerminalLines((prev) => {
        const next = [
          `[${new Date().toLocaleTimeString()}] Node ping OK`,
          "Safe route confirmed.",
          "Low-noise traffic detected.",
          "Tracer sweep completed.",
        ];
        const picked = next[Math.floor(Math.random() * next.length)];
        const updated = [...prev, picked];
        return updated.slice(-6);
      });
    }, 4000);

    return () => clearInterval(pulseTimer);
  }, []);


  useEffect(() => {
    const m = L.map("map", {
      center: [20, 0],
      zoom: 2,
      worldCopyJump: true,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(m);

    setMap(m);
    return () => m.remove();
  }, []);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function handleSearch() {
    if (!query) return;

    // simulate random connection loss (5% chance)
    if (Math.random() < 0.05) {
      await typeStatus("⚠ Connection lost. Re-routing through safe node...");
      await sleep(2000 + Math.random() * 1000);
      await typeStatus("Secure channel restored. Continuing search...");
      await sleep(800);
    }

    await typeStatus(`Scanning directory for "${query}"...`);

    const result = await generateAgents(query, 12);
    setAgents([]);

    // clear old map layers
    markers.forEach((m) => m.remove());
    if (heatLayer) heatLayer.remove();

    let newMarkers = [];
    let coords = [];

    for (let i = 0; i < result.length; i++) {
      await sleep(200 + Math.random() * 200);
      setAgents((prev) => [...prev, result[i]]);
      await typeStatus(`Decrypted profile ${i + 1} / ${result.length}...`);

      if (map && result[i].lat && result[i].lng) {
        const marker = L.circleMarker([result[i].lat, result[i].lng], {
          radius: 6,
          color: "#00ffe0",
          fillColor: "#00f0ef",
          fillOpacity: 0.9,
        }).addTo(map);
        newMarkers.push(marker);
        coords.push([result[i].lat, result[i].lng, 0.8]);
      }
    }

    setMarkers(newMarkers);

    if (coords.length && map) {
      map.fitBounds(coords.map((c) => [c[0], c[1]]), { padding: [50, 50] });

      // tracer lines to London hub
      const hub = { lat: 51.5072, lng: -0.1276 };
      coords.forEach(([lat, lng]) => {
        const line = L.polyline([[hub.lat, hub.lng], [lat, lng]], {
          color: "#00ffe0",
          weight: 2,
          opacity: 0.6,
          dashArray: "6 8",
        }).addTo(map);
        newMarkers.push(line);
      });
    }

    if (heatMode && coords.length && map) {
      if (L.heatLayer) {
        const heat = L.heatLayer(coords, {
          radius: 25,
          blur: 15,
          gradient: { 0.4: "var(--accent-color)", 0.65: "#f0f", 1: "#fff" },
        }).addTo(map);
        setHeatLayer(heat);
      }
    }

    await typeStatus("Search complete.");
  }

  async function typeStatus(text) {
    setStatus("");
    for (let i = 0; i < text.length; i++) {
      setStatus((prev) => prev + text[i]);
      await sleep(15 + Math.random() * 20);
    }
  }

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", background: excommunicado ? "#200" : "#000" }}>
      {/* Map fills background */}
      <div id="map" style={{ height: "100%", width: "100%", zIndex: 0 }}></div>

      {/* Overlay UI */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: "320px",
          background: "rgba(0,0,0,0.8)",
          border: "1px solid #0ff",
          borderRadius: "8px",
          padding: "15px",
          zIndex: 1000,
        }}
      >
        <h2 style={{ color: "var(--accent-color)", fontWeight: "bold", marginBottom: "6px" }}>
          Welcome {username} — THE SILENT DIRECTORY
        </h2>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px", marginBottom: "6px" }}>
          <button
            className="btn ghost"
            style={{ fontSize: "11px", padding: "4px 8px" }}
            onClick={() => navigate("/high-table")}
          >
            HIGH TABLE CONSOLE
          </button>
          <div style={{ fontSize: "11px" }}>
            <span style={{ marginRight: "4px" }}>Agency:</span>
            <select
              value={filterAgency}
              onChange={(e) => setFilterAgency(e.target.value)}
              style={{ background: "#000", color: "var(--accent-color)", border: "1px solid #0ff", fontSize: "11px" }}
            >
              <option value="ALL">ALL</option>
              <option value="HANDLER">Handlers</option>
              <option value="TECH">Techs</option>
              <option value="MYTHIC">Mythics</option>
            </select>
            <span style={{ marginLeft: "8px", marginRight: "4px" }}>Nation:</span>
            <select
              value={filterNationality}
              onChange={(e) => setFilterNationality(e.target.value)}
              style={{ background: "#000", color: "var(--accent-color)", border: "1px solid #0ff", fontSize: "11px" }}
            >
              <option value="ALL">ALL</option>
              <option value="UK">UK</option>
              <option value="US">US</option>
              <option value="JP">JP</option>
              <option value="DE">DE</option>
            </select>
          </div>
          <div style={{ fontSize: "11px", marginLeft: "12px" }}>
            Theme:
            <button
              className="btn ghost"
              style={{ marginLeft: "4px", fontSize: "10px" }}
              onClick={() => setTheme("continental")}
            >
              Continental
            </button>
            <button
              className="btn ghost"
              style={{ marginLeft: "4px", fontSize: "10px" }}
              onClick={() => setTheme("high")}
            >
              High Table
            </button>
            <button
              className="btn ghost"
              style={{ marginLeft: "4px", fontSize: "10px" }}
              onClick={() => setTheme("shadow")}
            >
              Shadow
            </button>
          </div>

        </div>

        <div style={{ fontSize: "12px", color: "var(--accent-color)", marginBottom: "10px" }}>
          <div>Network: <strong>{pulse.network}</strong> · Nodes: <strong>{pulse.activeNodes}</strong></div>
          <div>Last ping: {pulse.lastPingMs} ms · Cipher: {pulse.encryption}</div>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city or keyword..."
          style={{
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
            padding: "8px",
            background: "#111",
            border: "1px solid #0ff",
            color: "var(--accent-color)",
          }}
        />
        <button className="btn" onClick={handleSearch} style={{ width: "100%", marginBottom: "8px" }}>
          Search
        </button>
        <button
          className="btn ghost"
          onClick={() => setHeatMode(!heatMode)}
          style={{ width: "100%" }}
        >
          Toggle Heat Map
        </button>
        <div className="small" style={{ marginTop: "12px", color: "var(--accent-color)" }}>
          Status: {status}
        </div>
      </div>

      {/* Agent results overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: "40%",
          overflowY: "auto",
          background: "rgba(0,0,0,0.85)",
          borderTop: "2px solid #0ff",
          padding: "10px",
          zIndex: 999,
        }}
      >
        {/* Dead Drop Locker + Terminal */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr", gap: "10px", marginBottom: "12px", fontSize: "12px" }}>
          {/* Dead Drop */}
          <div style={{ border: "1px solid #0ff", padding: "8px", borderRadius: "6px" }}>
            <div style={{ fontWeight: "bold", color: "var(--accent-color)", marginBottom: "4px" }}>Dead Drop Locker</div>
            <textarea
              value={deadDropInput}
              onChange={(e) => setDeadDropInput(e.target.value)}
              rows={3}
              placeholder="Leave encrypted notes. Nothing here exists on paper."
              style={{
                width: "100%",
                background: "#050505",
                border: "1px solid #0ff",
                color: "var(--accent-color)",
                padding: "4px",
                fontSize: "11px",
                marginBottom: "6px",
              }}
            />
            <button
              className="btn"
              onClick={() => {
                if (!deadDropInput.trim()) return;
                setDeadDropLog((prev) => [
                  { ts: new Date().toLocaleTimeString(), text: deadDropInput.trim() },
                  ...prev,
                ].slice(0, 5));
                setDeadDropInput("");
              }}
              style={{ width: "100%", fontSize: "11px" }}
            >
              Drop & Seal
            </button>
            <div style={{ marginTop: "6px", maxHeight: "80px", overflowY: "auto" }}>
              {deadDropLog.map((entry, idx) => (
                <div key={idx} style={{ color: "var(--accent-color)", marginBottom: "2px" }}>
                  [{entry.ts}] {entry.text}
                </div>
              ))}
              {!deadDropLog.length && (
                <div style={{ color: "#666" }}>No drops recorded.</div>
              )}
            </div>
          </div>

          {/* Terminal */}
          <div style={{ border: "1px solid #0ff", padding: "8px", borderRadius: "6px", background: "#020202" }}>
            <div style={{ fontWeight: "bold", color: "var(--accent-color)", marginBottom: "4px" }}>Live Terminal</div>
            <div style={{ fontFamily: "monospace", fontSize: "11px", maxHeight: "110px", overflowY: "auto" }}>
              {terminalLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>

          {/* Time-Locked & Cipher */}
          <div style={{ border: "1px solid #0ff", padding: "8px", borderRadius: "6px" }}>
            <div style={{ fontWeight: "bold", color: "var(--accent-color)", marginBottom: "4px" }}>Midnight Protocol</div>
            {(() => {
              const now = new Date();
              const isMidnight = now.getHours() === 0;
              if (!isMidnight) {
                return (
                  <div style={{ fontSize: "11px", color: "#888" }}>
                    Locked. Window opens between 00:00–00:10 local time.
                  </div>
                );
              }
              return (
                <div style={{ fontSize: "11px", color: "var(--accent-color)" }}>
                  Protocol online. No records. No witnesses.
                </div>
              );
            })()}
            <div style={{ marginTop: "8px", fontSize: "11px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Cipher Pad</div>
              <div>Use any simple shift cipher. Nothing here is stored beyond this session.</div>
            </div>
          </div>
        </div>

        
        {/* Directory Intel — Accordions */}
        <div style={{ marginBottom: "12px", fontSize: "12px" }}>
          <details open style={{ marginBottom: "6px" }}>
            <summary style={{ cursor: "pointer", color: "var(--accent-color)", fontWeight: "bold" }}>
              Classified Profiles · {classifiedProfiles.length} records · Page {classifiedPage + 1}
            </summary>
            <div style={{ marginTop: "6px", maxHeight: "140px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Codename</th>
                    <th style={{ textAlign: "left" }}>Role</th>
                    <th style={{ textAlign: "left" }}>Class</th>
                    <th style={{ textAlign: "left" }}>Location</th>
                    <th style={{ textAlign: "left" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {classifiedProfiles
                    .slice(classifiedPage * pageSize, (classifiedPage + 1) * pageSize)
                    .map((p, idx) => (
                      <tr key={idx}>
                        <td>{p.codename}</td>
                        <td>{p.role}</td>
                        <td>{p.class}</td>
                        <td>{p.location}</td>
                        <td>{p.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div style={{ marginTop: "4px", display: "flex", justifyContent: "space-between" }}>
                <button
                  className="btn ghost"
                  disabled={classifiedPage === 0}
                  onClick={() => setClassifiedPage((p) => Math.max(0, p - 1))}
                >
                  Prev
                </button>
                <button
                  className="btn ghost"
                  disabled={(classifiedPage + 1) * pageSize >= classifiedProfiles.length}
                  onClick={() =>
                    setClassifiedPage((p) =>
                      (p + 1) * pageSize >= classifiedProfiles.length ? p : p + 1
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </details>

          <details style={{ marginBottom: "6px" }}>
            <summary style={{ cursor: "pointer", color: "var(--accent-color)", fontWeight: "bold" }}>
              Weapons Inventory · {weapons.length} records · Page {weaponsPage + 1}
            </summary>
            <div style={{ marginTop: "6px", maxHeight: "140px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Name</th>
                    <th style={{ textAlign: "left" }}>Category</th>
                    <th style={{ textAlign: "left" }}>Status</th>
                    <th style={{ textAlign: "left" }}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {weapons
                    .slice(weaponsPage * pageSize, (weaponsPage + 1) * pageSize)
                    .map((w, idx) => (
                      <tr key={idx}>
                        <td>{w.name}</td>
                        <td>{w.category}</td>
                        <td>{w.status}</td>
                        <td>{w.note}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div style={{ marginTop: "4px", display: "flex", justifyContent: "space-between" }}>
                <button
                  className="btn ghost"
                  disabled={weaponsPage === 0}
                  onClick={() => setWeaponsPage((p) => Math.max(0, p - 1))}
                >
                  Prev
                </button>
                <button
                  className="btn ghost"
                  disabled={(weaponsPage + 1) * pageSize >= weapons.length}
                  onClick={() =>
                    setWeaponsPage((p) =>
                      (p + 1) * pageSize >= weapons.length ? p : p + 1
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </details>

          <details style={{ marginBottom: "6px" }}>
            <summary style={{ cursor: "pointer", color: "var(--accent-color)", fontWeight: "bold" }}>
              Blacklist · {blacklist.length} records · Page {blacklistPage + 1}
            </summary>
            <div style={{ marginTop: "6px", maxHeight: "140px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Codename</th>
                    <th style={{ textAlign: "left" }}>Threat</th>
                    <th style={{ textAlign: "left" }}>Last Seen</th>
                    <th style={{ textAlign: "left" }}>Status</th>
                    <th style={{ textAlign: "left" }}>Tag</th>
                  </tr>
                </thead>
                <tbody>
                  {blacklist
                    .slice(blacklistPage * pageSize, (blacklistPage + 1) * pageSize)
                    .map((b, idx) => (
                      <tr key={idx}>
                        <td>{b.codename}</td>
                        <td>{b.threat}</td>
                        <td>{b.lastSeen}</td>
                        <td>{b.status}</td>
                        <td>{b.tag}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div style={{ marginTop: "4px", display: "flex", justifyContent: "space-between" }}>
                <button
                  className="btn ghost"
                  disabled={blacklistPage === 0}
                  onClick={() => setBlacklistPage((p) => Math.max(0, p - 1))}
                >
                  Prev
                </button>
                <button
                  className="btn ghost"
                  disabled={(blacklistPage + 1) * pageSize >= blacklist.length}
                  onClick={() =>
                    setBlacklistPage((p) =>
                      (p + 1) * pageSize >= blacklist.length ? p : p + 1
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </details>

          <details>
            <summary style={{ cursor: "pointer", color: "var(--accent-color)", fontWeight: "bold" }}>
              Mission Board · {missions.length} records · Page {missionsPage + 1}
            </summary>
            <div style={{ marginTop: "6px", maxHeight: "140px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Mission</th>
                    <th style={{ textAlign: "left" }}>Level</th>
                    <th style={{ textAlign: "left" }}>Reward</th>
                    <th style={{ textAlign: "left" }}>Status</th>
                    <th style={{ textAlign: "left" }}>Region</th>
                  </tr>
                </thead>
                <tbody>
                  {missions
                    .slice(missionsPage * pageSize, (missionsPage + 1) * pageSize)
                    .map((m, idx) => (
                      <tr key={idx}>
                        <td>{m.id}</td>
                        <td>{m.level}</td>
                        <td>{m.reward}</td>
                        <td>{m.status}</td>
                        <td>{m.region}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div style={{ marginTop: "4px", display: "flex", justifyContent: "space-between" }}>
                <button
                  className="btn ghost"
                  disabled={missionsPage === 0}
                  onClick={() => setMissionsPage((p) => Math.max(0, p - 1))}
                >
                  Prev
                </button>
                <button
                  className="btn ghost"
                  disabled={(missionsPage + 1) * pageSize >= missions.length}
                  onClick={() =>
                    setMissionsPage((p) =>
                      (p + 1) * pageSize >= missions.length ? p : p + 1
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </details>
        </div>

        <table style={{ width: "100%", color: "#fff", borderCollapse: "collapse" }}>
          <thead style={{ color: "var(--accent-color)" }}>
            <tr>
              <th>Codename</th>
              <th>Full Name</th>
              <th>Profession</th>
              <th>Nationality</th>
              <th>City</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Agency</th>
            </tr>
          </thead>
          <tbody>
            {agents.filter((a) => {
              if (filterNationality !== "ALL") {
                if (!a.nationality || !a.nationality.includes(filterNationality)) return false;
              }
              return true;
            }).map((a, i) => (
              <tr key={i}>
                <td
                  style={{ cursor: "pointer", color: "var(--accent-color)", textDecoration: "underline" }}
                  onClick={() => navigate("/profile", { state: a })}
                >
                  {a.codename}
                </td>
                <td>{a.fullName}</td>
                <td>{a.profession}</td>
                <td>{a.nationality}</td>
                <td>{a.city}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>{a.agency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
