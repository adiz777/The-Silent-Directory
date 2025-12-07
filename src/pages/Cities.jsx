import React, { useEffect, useState } from "react";
import DirectoryLayout from "../components/DirectoryLayout";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { generateAgents, generateContinentals } from "../utils/generator";
import { resolveCity } from "../utils/cityResolver";

export default function Cities() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState(null);
  const [agents, setAgents] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(false);

  async function searchCity() {
    if (!query) return;
    setLoading(true);

    const resolved = await resolveCity(query);
    if (!resolved) {
      setLoading(false);
      return;
    }

    setCity(resolved);
    setAgents(await generateAgents(resolved.name, 12));
    setHotels(generateContinentals(10));
    setSelectedHotel(null);

    setLoading(false);
  }

  function onMapClick(e) {
    if (!city) return;

    generateAgents(city.name, 8).then((a) => {
      setAgents(a.map(agent => ({
        ...agent,
        lat: e.latlng.lat + (Math.random() - 0.5) * 0.1,
        lng: e.latlng.lng + (Math.random() - 0.5) * 0.1,
      })));
    });
  }

  return (
    <DirectoryLayout title="Cities Intelligence">
      {/* SEARCH */}
      <div className="sd-panel sd-panel-wide">
        <div className="sd-city-search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city or keyword…"
          />
          <button onClick={searchCity} disabled={loading}>
            {loading ? "Locating…" : "Locate"}
          </button>
        </div>

        {city && (
          <div className="sd-muted">
            Resolved: {city.name}, {city.country} — Population {city.pop}
          </div>
        )}
      </div>

      {/* MAP + AGENTS */}
      {city && (
        <div className="sd-panel sd-panel-wide">
          <div className="sd-map-grid">
            {/* MAP */}
            <div className="sd-map-shell">
              <MapContainer
                center={[city.lat, city.lng]}
                zoom={10}
                scrollWheelZoom
                className="sd-map"
                whenReady={(map) =>
                  map.target.on("click", onMapClick)
                }
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* CITY GLOW */}
                <Circle
                  center={[city.lat, city.lng]}
                  radius={35000}
                  pathOptions={{
                    color: "var(--accent)",
                    fillColor: "var(--accent)",
                    fillOpacity: 0.15,
                  }}
                />

                {/* AGENTS */}
                {agents.map((a, i) => (
                  <Marker key={i} position={[a.lat, a.lng]}>
                    <Popup>
                      <strong>{a.codename}</strong><br />
                      {a.profession}<br />
                      {a.agency}
                    </Popup>
                  </Marker>
                ))}

                {/* CONTINENTALS */}
                {hotels.map((h) => (
                  <Circle
                    key={h.id}
                    center={[h.lat, h.lng]}
                    radius={18000}
                    eventHandlers={{
                      click: () => setSelectedHotel(h),
                    }}
                    pathOptions={{
                      color: "#d4af37",
                      fillColor: "#d4af37",
                      fillOpacity: 0.25,
                    }}
                  />
                ))}
              </MapContainer>

              <div className="sd-map-overlay">
                Click map → generate agents
              </div>
            </div>

            {/* AGENT LIST */}
            <div className="sd-agents">
              <h3>Active Agents</h3>

              {agents.length === 0 && (
                <div className="sd-hint">
                  No agents deployed.
                </div>
              )}

              {agents.map((a, i) => (
                <div key={i} className="sd-agent">
                  <strong>{a.fullName}</strong>
                  <div className="meta">{a.codename}</div>
                  <div className="meta">{a.agency}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTINENTAL BOOKING */}
      {selectedHotel && (
        <div className="sd-panel sd-panel-wide">
          <div className="sd-slip">
            <h2>{selectedHotel.name}</h2>

            <div className="sd-meta">
              City: {selectedHotel.city}<br />
              Manager: {selectedHotel.manager}<br />
              Rating: {selectedHotel.rating} ★<br />
              Rooms Available: {selectedHotel.roomsAvailable}
            </div>

            <div className="sd-coin">
              PAYMENT REQUIRED: 1 CONTINENTAL COIN
            </div>

            <button
              className="sd-btn"
              disabled={document.body.classList.contains("excommunicado")}
            >
              Book Sanctuary
            </button>

            {document.body.classList.contains("excommunicado") && (
              <div className="sd-hint">
                Access denied — Excommunicado.
              </div>
            )}
          </div>
        </div>
      )}
    </DirectoryLayout>
  );
}
