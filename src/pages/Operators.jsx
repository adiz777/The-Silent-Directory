import React, { useEffect, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

function generateOperators(count = 120) {
  const tiers = ["Associate", "Retainer", "Trusted", "Inner Circle"];
  const specialties = [
    "Acquisitions",
    "Disposals",
    "Logistics",
    "Recon",
    "Countersurveillance",
    "Financial",
    "Cyber",
  ];

  const ops = [];
  for (let i = 0; i < count; i++) {
    ops.push({
      id: "OP-" + (i + 1),
      name: faker.person.fullName(),
      codename: faker.word.adjective().toUpperCase() + " " + faker.animal.type().toUpperCase(),
      tier: faker.helpers.arrayElement(tiers),
      specialty: faker.helpers.arrayElement(specialties),
      region: faker.location.country(),
      contact: faker.internet.email(),
    });
  }
  return ops;
}

export default function Operators() {
  const [operators, setOperators] = useState([]);
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("All");

  useEffect(() => {
    setOperators(generateOperators(200));
  }, []);

  const tiers = ["All", "Associate", "Retainer", "Trusted", "Inner Circle"];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return operators.filter((o) => {
      const matchesSearch =
        !q ||
        o.name.toLowerCase().includes(q) ||
        o.codename.toLowerCase().includes(q) ||
        o.region.toLowerCase().includes(q) ||
        o.specialty.toLowerCase().includes(q);

      const matchesTier = tierFilter === "All" ? true : o.tier === tierFilter;

      return matchesSearch && matchesTier;
    });
  }, [operators, query, tierFilter]);

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <h1 className="text-xl mb-4">Operators Network</h1>
      <p className="text-sm mb-4">
        A fictional directory of global operators, with tiers and specialties generated for UI demonstration.
      </p>

      <div className="mb-4 flex gap-4 flex-wrap">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, codename, specialty, or region…"
          className="px-3 py-2 flex-1 min-w-[200px]"
        />
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="px-3 py-2"
        >
          {tiers.map((t) => (
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
            <th>Tier</th>
            <th>Specialty</th>
            <th>Region</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((o) => (
            <tr key={o.id}>
              <td>{o.name}</td>
              <td>{o.codename}</td>
              <td>{o.tier}</td>
              <td>{o.specialty}</td>
              <td>{o.region}</td>
              <td>{o.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="mt-4 text-sm opacity-70">
          No operators match your current filters.
        </p>
      )}
    </div>
  );
}
