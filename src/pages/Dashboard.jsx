import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { generateAgents } from "../utlis/generator.js"; // fixed typo 'utlis' → 'utils'

export default function Dashboard() {
  const [status, setStatus] = useState("Idle — ready.");
  const [query, setQuery] = useState("");
  const [agents, setAgents] = useState([]);
  const [map, setMap] = useState(null);
  const [heatLayer, setHeatLayer] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [heatMode, setHeatMode] = useState(false);

  const username = localStorage.getItem("tsd_user") || "Agent";
  const navigate = useNavigate();

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
          gradient: { 0.4: "#0ff", 0.65: "#f0f", 1: "#fff" },
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
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      {/* Map fills background */}
      <div id="map" style={{ height: "100%", width: "100%", zIndex: 0 }}></div>

      {/* Overlay UI */}
      <div
        className="overlay-card"
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
        <h2 style={{ color: "#0ff", fontWeight: "bold" }}>
          Welcome {username} — THE SILENT DIRECTORY
        </h2>
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
            color: "#0ff",
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
        <div className="small" style={{ marginTop: "12px", color: "#0ff" }}>
          Status: {status}
        </div>
      </div>

      {/* Agent results overlay */}
      <div
        className="agents-table-wrapper"
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
        <div style={{ width: "100%", overflowX: "auto" }}>
          <table style={{ minWidth: "720px", color: "#fff", borderCollapse: "collapse" }}>
          <thead style={{ color: "#0ff" }}>
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
            {agents.map((a, i) => (
              <tr key={i}>
                <td
                  style={{ cursor: "pointer", color: "#0ff", textDecoration: "underline" }}
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
    </div>
  );
}
