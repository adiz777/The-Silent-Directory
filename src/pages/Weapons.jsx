import React, { useEffect, useMemo, useState } from "react";
import { generateAll } from "../utils/generator.js";

export default function Weapons() {
  const [world, setWorld] = useState(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    const snapshot = generateAll();
    setWorld(snapshot);
  }, []);

  const types = ["All", "Handgun", "Sniper", "Rifle", "Shotgun", "SMG", "Melee", "Exotic"];

  const filtered = useMemo(() => {
    if (!world) return [];
    const weapons = world.weapons || [];
    const q = query.toLowerCase();

    return weapons.filter((w) => {
      const matchesSearch =
        !q ||
        w.name.toLowerCase().includes(q) ||
        (w.type && w.type.toLowerCase().includes(q)) ||
        (w.origin && w.origin.toLowerCase().includes(q));

      const matchesType =
        typeFilter === "All" ? true : w.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [world, query, typeFilter]);

  if (!world) {
    return (
      <div className="w-full h-full p-6">
        <p>Loading weapons inventory…</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <h1 className="text-xl mb-4">Weapons Inventory</h1>
      <p className="text-sm mb-4">
        Synthetic arsenal registry. All entries are fictional and serve only as UI/UX data.
      </p>

      <div className="mb-4 flex gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, type, or origin…"
          className="px-3 py-2 flex-1"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2"
        >
          {types.map((t) => (
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
            <th>Type</th>
            <th>Caliber</th>
            <th>Origin</th>
            <th>Weight</th>
            <th>Rarity</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((w) => (
            <tr key={w.id}>
              <td>{w.name}</td>
              <td>{w.type}</td>
              <td>{w.caliber}</td>
              <td>{w.origin}</td>
              <td>{w.weight}</td>
              <td>{w.rarity}</td>
              <td>{w.useCase}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="mt-4 text-sm opacity-70">
          No weapons match your current filters.
        </p>
      )}
    </div>
  );
}
