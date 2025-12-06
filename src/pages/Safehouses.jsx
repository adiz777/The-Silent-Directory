import React, { useEffect, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

function generateSafehouses(count = 80) {
  const levels = ["Low", "Moderate", "High", "Fortified"];
  const safehouses = [];
  for (let i = 0; i < count; i++) {
    safehouses.push({
      id: "SH-" + (i + 1),
      label: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
      capacity: faker.number.int({ min: 1, max: 20 }),
      security: faker.helpers.arrayElement(levels),
      notes: faker.lorem.sentence(),
    });
  }
  return safehouses;
}

export default function Safehouses() {
  const [safehouses, setSafehouses] = useState([]);
  const [query, setQuery] = useState("");
  const [securityFilter, setSecurityFilter] = useState("All");

  useEffect(() => {
    setSafehouses(generateSafehouses(120));
  }, []);

  const levels = ["All", "Low", "Moderate", "High", "Fortified"];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return safehouses.filter((s) => {
      const matchesSearch =
        !q ||
        s.label.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q);

      const matchesSecurity =
        securityFilter === "All" ? true : s.security === securityFilter;

      return matchesSearch && matchesSecurity;
    });
  }, [safehouses, query, securityFilter]);

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <h1 className="text-xl mb-4">Safehouses</h1>
      <p className="text-sm mb-4">
        Fictional global network of safe locations. Capacity, security level and notes are all synthetic.
      </p>

      <div className="mb-4 flex gap-4 flex-wrap">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by label, city, or country…"
          className="px-3 py-2 flex-1 min-w-[200px]"
        />
        <select
          value={securityFilter}
          onChange={(e) => setSecurityFilter(e.target.value)}
          className="px-3 py-2"
        >
          {levels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th>Label</th>
            <th>City</th>
            <th>Country</th>
            <th>Capacity</th>
            <th>Security</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id}>
              <td>{s.label}</td>
              <td>{s.city}</td>
              <td>{s.country}</td>
              <td>{s.capacity}</td>
              <td>{s.security}</td>
              <td>{s.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="mt-4 text-sm opacity-70">
          No safehouses match your current filters.
        </p>
      )}
    </div>
  );
}
