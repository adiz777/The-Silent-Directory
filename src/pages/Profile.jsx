import React, { useEffect, useMemo, useState } from "react";
import DirectoryLayout from "../components/DirectoryLayout";
import { generateAll } from "../utils/generator";

export default function Profiles() {
  const [world, setWorld] = useState(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);

  useEffect(() => {
    setWorld(generateAll());
  }, []);

  const dossiers = useMemo(() => {
    if (!world) return [];
    const q = query.toLowerCase();
    return world.dossiers.filter(d =>
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.codename.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q)
    );
  }, [world, query]);

  const downloadPDF = () => window.print();

  if (!world) return null;

  return (
    <DirectoryLayout title="Classified Profiles">
      {/* SEARCH */}
      <div className="sd-panel sd-panel-wide">
        <input
          className="sd-search"
          placeholder="Search by name, codename, or city…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* PROFILES GRID */}
      <div className="sd-grid">
        {dossiers.map(d => (
          <div
            key={d.id}
            className={`sd-panel sd-card ${active === d.id ? "active" : ""}`}
            onClick={() => setActive(active === d.id ? null : d.id)}
          >
            <div className="sd-panel-header">
              <h2>{d.codename}</h2>
              <span className={`sd-tag sd-tag-${d.risk.toLowerCase()}`}>
                {d.risk}
              </span>
            </div>

            <div className="sd-muted">
              {d.name} • {d.city}, {d.nationality}
            </div>

            {/* EXPANDED DOSSIER */}
            {active === d.id && (
              <div className="sd-dossier">
                <div className="sd-row">
                  <strong>Specialty:</strong> {d.specialty}
                </div>
                <div className="sd-row">
                  <strong>Notes:</strong> {d.notes}
                </div>

                <div className="sd-actions">
                  <button className="sd-btn" onClick={downloadPDF}>
                    Download Dossier
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </DirectoryLayout>
  );
}
