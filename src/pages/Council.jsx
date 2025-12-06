import React, { useEffect, useState } from "react";
import DirectoryLayout from "../components/DirectoryLayout";
import { generateContinentals } from "../utils/generator";

export default function Continentals() {
  const [hotels, setHotels] = useState([]);
  const [selected, setSelected] = useState(null);
  const [alias, setAlias] = useState("");
  const [nights, setNights] = useState(1);

  useEffect(() => {
    setHotels(generateContinentals(25));
  }, []);

  return (
    <DirectoryLayout title="Continental Network">
      <div className="sd-cards">
        {hotels.map((h) => (
          <button
            key={h.id}
            className={`sd-card ${selected?.id === h.id ? "active" : ""}`}
            onClick={() => setSelected(h)}
          >
            <div className="sd-card-title">{h.name}</div>
            <div className="sd-card-meta">{h.city}</div>
            <div className="sd-card-sub">
              Manager: {h.manager}<br />
              Rating: {h.rating} ★
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="sd-slip">
          <h2>Continental Check-In Slip</h2>

          <label>
            Operator Alias
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="e.g. MAJOR_ADI"
            />
          </label>

          <label>
            Nights
            <input
              type="number"
              min="1"
              value={nights}
              onChange={(e) => setNights(e.target.value)}
            />
          </label>

          <div className="sd-slip-body">
            <p><strong>Hotel:</strong> {selected.name}</p>
            <p><strong>City:</strong> {selected.city}</p>
            <p><strong>Manager:</strong> {selected.manager}</p>
            <p><strong>Duration:</strong> {nights} nights</p>
          </div>

          <div className="sd-coin">
            🪙 Continental Coin Issued
          </div>
        </div>
      )}
    </DirectoryLayout>
  );
}
