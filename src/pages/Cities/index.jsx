import React, { useMemo } from "react";
import { useWorld } from "../../context/WorldContext.jsx";

export default function Cities() {
  const { cities, continentals } = useWorld();

  const enriched = useMemo(() => {
    return cities
      .map((city) => {
        const hasContinental =
          continentals.filter((c) => c.cityId === city.id).length > 0;

        return {
          ...city,
          hasContinental,
        };
      })
      .sort((a, b) => b.heat - a.heat);
  }, [cities, continentals]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "16px",
        background: "#000",
        color: "var(--accent-color, #0ff)",
        fontFamily: "Courier New, monospace",
      }}
    >
      <h1 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>
        CITY GRID // HEAT & PRESENCE
      </h1>
      <p
        style={{
          fontSize: "11px",
            opacity: 0.7,
            marginBottom: "16px",
          }}
      >
        Live overview of cities tracked by the Directory. Heat reflects recent
        movement, financial noise, operator sightings, and Council attention.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "10px",
        }}
      >
        {enriched.map((city) => (
          <div
            key={city.id}
            style={{
              border: "1px solid var(--border-color, #0ff)",
              borderRadius: "8px",
              padding: "8px",
              background: "rgba(0,0,0,0.7)",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                marginBottom: "4px",
              }}
            >
              <strong>{city.name}</strong> — {city.country}
            </div>
            <div
              style={{
                fontSize: "11px",
                opacity: 0.8,
                marginBottom: "4px",
              }}
            >
              Region: {city.region}
            </div>
            <div
              style={{
                fontSize: "11px",
                marginBottom: "4px",
              }}
            >
              Heat:{" "}
              <strong>
                {city.heat}
                /100
              </strong>
            </div>
            <div
              style={{
                fontSize: "11px",
                marginBottom: "4px",
              }}
            >
              Continental:{" "}
              <strong>{city.hasContinental ? "Present" : "None"}</strong>
            </div>
            <div
              style={{
                fontSize: "11px",
                opacity: 0.75,
              }}
            >
              {city.notes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
