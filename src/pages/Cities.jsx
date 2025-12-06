import React, { useEffect, useState } from "react";
import DirectoryLayout from "../components/DirectoryLayout";
import SafePage from "../components/SafePage";
import { generateAgents } from "../utils/generator";
import { resolveCity } from "../utils/cityResolver";

export default function Cities() {
  const [query, setQuery] = useState("");
  const [agents, setAgents] = useState([]);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runSearch() {
    setError("");
    setLoading(true);
    setAgents([]);
    setCity(null);

    try {
      const resolved = await resolveCity(query);

      if (!resolved) {
        setError("City not found in High Table records.");
        setLoading(false);
        return;
      }

      setCity(resolved);

      const generated = await generateAgents(resolved.name, 12);
      setAgents(generated);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Search failed.");
      setLoading(false);
    }
  }

  return (
    <DirectoryLayout title="Cities Intelligence">
      <SafePage loading={false}>
        {/* SEARCH */}
        <div className="sd-panel sd-panel-wide">
          <div className="sd-search-row">
            <input
              placeholder="Enter city name (e.g. London, Tokyo, Rome)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="sd-btn" onClick={runSearch}>
              Scan
            </button>
          </div>

          {error && <div className="sd-muted">{error}</div>}
        </div>

        {/* MAP + AGENTS */}
        <SafePage loading={loading}>
          {city && (
            <div className="sd-panel sd-panel-map">
              <div className="sd-map-grid">
                {/* MAP PLACEHOLDER (safe – no Leaflet crash) */}
                <div className="sd-map-shell">
                  <div className="sd-map">
                    <div className="sd-map-overlay">
                      {city.name}, {city.country}
                    </div>
                  </div>
                </div>

                {/* AGENTS */}
                <div className="sd-agents-list">
                  <h3>Active Agents</h3>

                  {agents.map((a, i) => (
                    <div key={i} className="sd-agent">
                      <div className="sd-strong">{a.fullName}</div>
                      <div className="meta">
                        {a.codename} • {a.profession}
                      </div>
                      <div className="risk">
                        {a.city}, {a.nationality}
                      </div>
                    </div>
                  ))}

                  {agents.length === 0 && (
                    <div className="sd-hint">
                      No agents detected in this sector.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </SafePage>
      </SafePage>
    </DirectoryLayout>
  );
}
