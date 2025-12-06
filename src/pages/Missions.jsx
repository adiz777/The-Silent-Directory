import React, { useEffect, useMemo, useState } from "react";
import { generateAll } from "../utils/generator";
import DirectoryLayout from "../components/DirectoryLayout";

export default function Missions() {
  const [world, setWorld] = useState(null);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    setWorld(generateAll());
  }, []);

  const filtered = useMemo(() => {
    if (!world) return [];
    return world.missions.filter((m) =>
      m.location.toLowerCase().includes(query.toLowerCase())
    );
  }, [world, query]);

  return (
    <DirectoryLayout title="Mission Board">
      <div className="sd-panel sd-panel-wide">
        <div className="sd-search-row">
          <input
            placeholder="Search city, target, or operation…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="sd-btn" onClick={() => window.print()}>
            Export PDF
          </button>
        </div>

        <ul className="sd-list">
          {filtered.map((m) => (
            <li key={m.id} className="sd-list-row">
              <div className="sd-strong">{m.type}</div>
              <div className="sd-meta">
                {m.location} • {m.difficulty} • {m.reward}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DirectoryLayout>
  );
}
