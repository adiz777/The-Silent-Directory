import React, { useEffect, useMemo, useState } from "react";
import { generateAll } from "../utils/generator.js";

export default function Missions() {
  const [world, setWorld] = useState(null);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [priority, setPriority] = useState("All");

  useEffect(() => {
    const snapshot = generateAll();
    setWorld(snapshot);
  }, []);

  const difficulties = ["All", "Low", "Medium", "High", "Extreme"];
  const priorities = ["All", "Routine", "Time-Sensitive", "Urgent", "Non-Negotiable"];

  const filtered = useMemo(() => {
    if (!world) return [];
    const missions = world.missions || [];
    const q = query.toLowerCase();

    return missions.filter((m) => {
      const matchesSearch =
        !q ||
        m.location.toLowerCase().includes(q) ||
        m.target.toLowerCase().includes(q) ||
        m.type.toLowerCase().includes(q);

      const matchesDifficulty =
        difficulty === "All" ? true : m.difficulty === difficulty;

      const matchesPriority =
        priority === "All" ? true : m.priority === priority;

      return matchesSearch && matchesDifficulty && matchesPriority;
    });
  }, [world, query, difficulty, priority]);

  if (!world) {
    return (
      <div className="w-full h-full p-6">
        <p>Loading mission board…</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <h1 className="text-xl mb-4">Mission Board</h1>
      <p className="text-sm mb-4">
        Fictional contracts for visualisation. This board is generated entirely from synthetic data.
      </p>

      <div className="mb-4 flex gap-4 flex-wrap">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by location, type, or target…"
          className="px-3 py-2 flex-1 min-w-[200px]"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-3 py-2"
        >
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2"
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th>Type</th>
            <th>Difficulty</th>
            <th>Priority</th>
            <th>Location</th>
            <th>Target</th>
            <th>Reward</th>
            <th>Window</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((m) => (
            <tr key={m.id}>
              <td>{m.type}</td>
              <td>{m.difficulty}</td>
              <td>{m.priority}</td>
              <td>{m.location}</td>
              <td>{m.target}</td>
              <td>{m.reward}</td>
              <td>{new Date(m.window).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="mt-4 text-sm opacity-70">
          No missions match your current filters.
        </p>
      )}
    </div>
  );
}
