import React, { useEffect, useMemo, useState } from "react";
import { generateAll } from "../utils/generator.js";

export default function ClassifiedProfiles() {
  const [world, setWorld] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const snapshot = generateAll();
    setWorld(snapshot);
  }, []);

  const filtered = useMemo(() => {
    if (!world) return [];
    const dossiers = world.dossiers || [];
    const q = query.toLowerCase();
    if (!q) return dossiers;
    return dossiers.filter((d) => {
      return (
        d.name.toLowerCase().includes(q) ||
        d.codename.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.risk.toLowerCase().includes(q)
      );
    });
  }, [world, query]);

  if (!world) {
    return (
      <div className="w-full h-full p-6">
        <p>Loading classified profiles…</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <h1 className="text-xl mb-4">Classified Profiles</h1>
      <p className="text-sm mb-4">
        Synthetic dossiers generated for cinematic UI only. No real individuals or data.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, codename, specialty, or risk level…"
        className="mb-4 px-3 py-2 w-full"
      />

      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Codename</th>
            <th>Specialty</th>
            <th>Risk</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.codename}</td>
              <td>{d.specialty}</td>
              <td>{d.risk}</td>
              <td>{d.city}</td>
              <td>{d.nationality}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="mt-4 text-sm opacity-70">
          No profiles match your search.
        </p>
      )}
    </div>
  );
}
