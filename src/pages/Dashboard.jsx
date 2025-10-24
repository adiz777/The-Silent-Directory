import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { generateAgents } from "../utils/generator.js";

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

    const result = await generateAgents(query, 12); // async now
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
      // auto zoom to cluster
      map.fitBounds(coords.map((c) => [c[0], c[1]]), { padding: [50, 50] });

      // tracer lines to London hub (style flourish)
      const hub = { lat: 51.5072, lng: -0.1276 }; // London coords
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
      // load heatmap dynamically
      if (!L.heatLayer) {
        console.error("Leaflet.heat not loaded. Did you include leaflet.heat.js?");
      } else {
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
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          padding: "10px 20px",
          background: "rgba(0,0,0,0.6)",
          borderBottom: "1px solid rgba(0,255,255,0.1)",
        }}
      >
        <h2 className="glitch" data-text="THE SILENT DIRECTORY">
          Welcome {username} — THE SILENT DIRECTORY
        </h2>
      </header>

      <div style={{ flex: 1, display: "flex" }}>
        {/* left panel */}
        <div style={{ width: "35%", padding: "14px", overflowY: "auto" }}>
          <div className="panel">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter city or keyword..."
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button className="btn" onClick={handleSearch} style={{ width: "100%" }}>
              Search
            </button>
            <button
              className="btn ghost"
              style={{ marginTop: "10px", width: "100%" }}
              onClick={() => setHeatMode(!heatMode)}
            >
              Toggle Heat Map
            </button>
            <div className="small" style={{ marginTop: "12px" }}>
              Status: {status}
            </div>
          </div>

          <div className="panel">
            <table className="table">
              <thead>
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
                      className="codename"
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

        {/* map */}
        <div style={{ flex: 1, position: "relative" }}>
          <div id="map" style={{ height: "100%", width: "100%" }}></div>
        </div>
      </div>
    </div>
  );
}
