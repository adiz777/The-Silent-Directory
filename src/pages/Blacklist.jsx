import React, { useEffect, useMemo, useState } from "react";
import DirectoryLayout from "../components/DirectoryLayout";
import { generateAll } from "../utils/generator";

export default function Blacklist() {
  const [world, setWorld] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setWorld(generateAll());
  }, []);

  const entries = useMemo(() => {
    if (!world) return [];
    const q = query.toLowerCase();

    return world.blacklist.filter((b) => {
      return (
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.codename.toLowerCase().includes(q) ||
        b.threat.toLowerCase().includes(q)
      );
    });
  }, [world, query]);

  return (
    <DirectoryLayout title="Blacklist Registry">
      <div className="sd-panel sd-panel-wide sd-panel-danger">
        <div className="sd-panel-header">
          <h2 className="heading-danger">Excommunicado Index</h2>
          <span className="sd-muted">
            Clearance Level: FULL
          </span>
        </div>

        <div className="sd-search-row">
          <input
            type="text"
            placeholder="Search by name, codename, threat…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <ul className="sd-list">
          {entries.map((b) => (
            <li key={b.id} className="sd-list-row">
              <div className="sd-strong">{b.name}</div>
              <div className="sd-meta">
                Codename: {b.codename}
              </div>
              <div className="sd-tag sd-tag-danger">
                Threat: {b.threat}
              </div>
              <div className="sd-meta">
                Last Seen: {b.lastSeen}
              </div>
            </li>
          ))}
        </ul>

        {entries.length === 0 && (
          <p className="sd-muted">No flagged entities found.</p>
        )}
      </div>
    </DirectoryLayout>
  );
}
