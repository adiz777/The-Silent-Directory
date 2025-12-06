import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

function generateArchives(count = 60) {
  const levels = ["Public", "Restricted", "Classified", "Omega"];
  const archives = [];
  for (let i = 0; i < count; i++) {
    archives.push({
      id: "ARC-" + (i + 1),
      title: faker.lorem.words(3),
      level: faker.helpers.arrayElement(levels),
      summary: faker.lorem.sentence(),
      lastAccessed: faker.date.recent({ days: 365 }).toISOString(),
    });
  }
  return archives;
}

export default function Archives() {
  const [docs, setDocs] = useState([]);
  const [levelFilter, setLevelFilter] = useState("All");

  useEffect(() => {
    setDocs(generateArchives(80));
  }, []);

  const filtered = docs.filter((d) =>
    levelFilter === "All" ? true : d.level === levelFilter
  );

  const levels = ["All", "Public", "Restricted", "Classified", "Omega"];

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <h1 className="text-xl mb-4">Archives</h1>
      <p className="text-sm mb-4">
        Synthetic archive index of fictional documents. Levels are purely illustrative.
      </p>

      <div className="mb-4">
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
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
            <th>ID</th>
            <th>Title</th>
            <th>Level</th>
            <th>Summary</th>
            <th>Last Accessed</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.title}</td>
              <td>{d.level}</td>
              <td>{d.summary}</td>
              <td>{new Date(d.lastAccessed).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="mt-4 text-sm opacity-70">
          No documents at this level.
        </p>
      )}
    </div>
  );
}
