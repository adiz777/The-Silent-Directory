import React, { useEffect, useMemo, useState } from "react";
import DirectoryLayout from "../components/DirectoryLayout";
import { generateAll } from "../utils/generator";

export default function Weapons() {
  const [world, setWorld] = useState(null);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  useEffect(() => {
    setWorld(generateAll());
  }, []);

  const types = ["All", "Handgun", "Rifle", "SMG", "Shotgun", "Blade", "Custom"];

  const weapons = useMemo(() => {
    if (!world) return [];
    return world.weapons.filter((w) => {
      const matchesType = type === "All" || w.type === type;
      const q = query.toLowerCase();
      const matchesSearch =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.origin.toLowerCase().includes(q) ||
        w.serial.toLowerCase().includes(q);

      return matchesType && matchesSearch;
    });
  }, [world, query, type]);

  return (
    <DirectoryLayout title="Weapons Inventory">
      <div className="sd-panel sd-panel-wide">
        <div className="sd-panel-header">
          <h2>Registered Arsenal</h2>
          <span className="sd-muted">
            Controlled distribution registry
          </span>
        </div>

        <div className="sd-search-row">
          <input
            type="text"
            placeholder="Search by name, serial, or origin…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <ul className="sd-list">
          {weapons.map((w) => (
            <li key={w.id} className="sd-list-row">
              <div className="sd-strong">{w.name}</div>
              <div className="sd-meta">
                {w.type} • {w.origin} • Serial {w.serial}
              </div>
              <div className="sd-meta">
                Rarity: {w.rarity}
              </div>
            </li>
          ))}
        </ul>

        {weapons.length === 0 && (
          <p className="sd-muted">No matching weapons found.</p>
        )}
      </div>
    </DirectoryLayout>
  );
}
