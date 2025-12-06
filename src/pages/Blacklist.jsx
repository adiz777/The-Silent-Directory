import React, { useEffect, useMemo, useState } from "react";
import { generateAll } from "../utils/generator.js";

export default function Blacklist() {
  const [world, setWorld] = useState(null);
  const [query, setQuery] = useState("");
  const [threatFilter, setThreatFilter] = useState("All");

  useEffect(() => {
    const snapshot = generateAll();
    setWorld(snapshot);
  }, []);

  const threats = ["All", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

  const filtered = useMemo(() => {
    if (!world) return [];
    const blacklist = world.blacklist || [];
    const q = query.toLowerCase();

    return blacklist.filter((b) => {
      const matchesSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.codename.toLowerCase().includes(q) ||
        b.lastSeen.toLowerCase().includes(q);

      const matchesThreat =
        threatFilter === "All" ? true : b.threat === threatFilter;

      return matchesSearch && matchesThreat;
    });
  }, [world, query, threatFilter]);

  if (!world) {
    return (
      <div className="w-full h-full p-6">
        <p>Loading blacklist registry…</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <h1 className="text-xl mb-4">Blacklist Registry</h1>
      <p className="text-sm mb-4">
        Fictional high-threat registry powered only by synthetic data. No real identities.
      </p>

      <div className="mb-4 flex gap-4 flex-wrap">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, codename, or last seen…"
          className="px-3 py-2 flex-1 min-w-[200px]"
        />

        <select
          value={threatFilter}
          onChange={(e) => setThreatFilter(e.target.value)}
          className="px-3 py-2"
        >
          {threats.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Codename</th>
            <th>Threat</th>
            <th>Last Seen</th>
            <th>Background</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.codename}</td>
              <td>{b.threat}</td>
              <td>{b.lastSeen}</td>
              <td>{b.background}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="mt-4 text-sm opacity-70">
          No entries match your current filters.
        </p>
      )}
    </div>
  );
}
